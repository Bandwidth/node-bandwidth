var util = require("util");
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var convert = require("xml-js");
var UnexpectedResponseError = require("../unexpectedResponseError");

function findFirstDescendant(obj, name){
	var j, k, v, r;
	for(k in obj){
	  v = obj[k];
	  if(k === name){
		return v ? (v._text || v) : null;
	  }
	  if(Array.isArray(v)){
		for(j = 0; j < v.length; j ++){
		  r = findFirstDescendant(v[j], name);
		  if(r){
			return r;
		  }
		}
	  }
	  else if(typeof v === "object"){
		r = findFirstDescendant(v, name);
		if(r){
		  return r;
		}
	  }
	}
	return null;
  }

  function findDescendants(obj, name){
	var j, k, v, r, list = [];
	for(k in obj){
	  v = obj[k];
	  if(k === name){
		list.push(v);
		continue;
	  }
	  if(Array.isArray(v)){
		for(j = 0; j < v.length; j ++){
		  r = findFirstDescendant(v[j], name);
		  if(r){
			list = list.concat(r);
		  }
		}
	  }
	  else if(typeof v === "object"){
		r = findFirstDescendant(v, name);
		if(r){
		  list = list.concat(r);
		}
	  }
	}
	return list;
  }

/**
 * SMS or MMS Message (v2)
 * @constructor
 * @param {Object} client Catapult client
 */
var Message = function (client) {
	this._createIrisRequestOptions = function (params) {
		var auth = params.auth;
		var baseUrl = "https://dashboard.bandwidth.com/v1.0";
		var accountPath = "/api/accounts/" + auth.accountId;
		var xml = null;
		var headers = {
			"User-Agent" : client.getUserAgentHeader()
		};
		if (params.body){
			headers["Content-Type"] = "application/xml";
			xml = convert.js2xml(params.body, {compact: true});
		}
		return {
			url                : baseUrl + accountPath + "/" + params.path,
			headers            : headers,
			qs                 : params.qs,
			method             : params.method || "GET",
			auth               : {
				user : auth.userName,
				pass : auth.password
			},
			json               : false,
			body               : xml,
			rejectUnauthorized : false, // for some reason this is required for bootcamp ssl
			encoding           : params.encoding || undefined
		};
	};

	this._handleResponse = function (response) {
		var body = convert.xml2js(response.body || "<Response></Response>", {compact: true, nativeType: true});
		var code = findFirstDescendant(body, "ErrorCode");
		var description = findFirstDescendant(body, "Description");
		if(!code){
			var error = findFirstDescendant(body, "Error");
			if(error){
				code = (error.Code || {})._text;
				description = (error.Description || {})._text;
			}
			else{
				var errs =  findDescendants(body, "Errors");
				if(errs.length === 0){
					code = findFirstDescendant(body, "resultCode");
					description = findFirstDescendant(body, "resultMessage");
				}
				else{
					throw new UnexpectedResponseError(errs.map(function(e){
						return (error.Code || {})._text + ": " + (error.Description || {})._text;
					}).join("\n"), res.statusCode);
				}
			}
		}
		if(code && description && code !== "0"){
			throw new UnexpectedResponseError(code + ": " + description, response.statusCode);
		}
		if (response.statusCode >= 400){
			throw new UnexpectedResponseError("Http code " + response.statusCode, response.statusCode);
		}
		return [body, response];
	};

	this._makeIrisRequest = function (params) {
		return request(this._createIrisRequestOptions(params)).then(this._handleResponse.bind(this));
	};

	this._createApplication = function (auth, data) {
		return this._makeIrisRequest({
			path       : "applications",
			method     : "POST",
			auth       : auth,
			body: {
				"Application": {
					"AppName": {_text: data.name},
					"CallbackUrl": {_text: data.callbackUrl},
					"CallBackCreds": data.callbackAuthData ? {
						"UserId": {_text: data.callbackAuthData.userName},
						"Password": {_text: data.callbackAuthData.password}
					} : null
				}
			}
		}).then(function(result){
			return findFirstDescendant(result[0], "ApplicationId");
		});
	};

	this._createLocation = function (auth, data) {
		return this._makeIrisRequest({
			path       : "sites/" + auth.subaccountId + "/sippeers",
			method     : "POST",
			auth       : auth,
			body: {
				"SipPeer": {
					"PeerName": {_text: data.locationName},
					"IsDefaultPeer": {_text: data.isDefaultLocation}
				}
			}
		}).then(function(result){
			var response = result[1];
			var location = response.headers.location;
			return location.substring(location.lastIndexOf("/") + 1);
		});
	};

	this._enableSms = function (auth, options, application) {
		if (!options || !options.enabled) {
			return Promise.resolve();
		}
		return  this._makeIrisRequest({
			path       : "sites/" + auth.subaccountId + "/sippeers/" + application.locationId + "/products/messaging/features/sms",
			method     : "POST",
			auth       : auth,
			body: {
				"SipPeerSmsFeature": {
					"SipPeerSmsFeatureSettings": {
						"TollFree": {_text: !!options.tollFreeEnabled},
						"ShortCode": {_text: !!options.shortCodeEnabled},
						"Protocol": {_text: "HTTP"},
						"Zone1": {_text: true},
						"Zone2": {_text: false},
						"Zone3": {_text: false},
						"Zone4": {_text: false},
						"Zone5": {_text: false}
					},
					"HttpSettings": {
						"ProxyPeerId": {_text: "539692"}
					}
				}
			}
		});
	};

	this._enableMms = function (auth, options, application) {
		if (!options || !options.enabled) {
			return Promise.resolve();
		}
		return  this._makeIrisRequest({
			path       : "sites/" + auth.subaccountId + "/sippeers/" + application.locationId + "/products/messaging/features/mms",
			method     : "POST",
			auth       : auth,
			body: {
				"MmsFeature": {
					"MmsSettings": {
						"protocol": {_text: "HTTP"}
					},
					"Protocols": {
						"HTTP": {
							"HttpSettings": {
								"ProxyPeerId": {_text: "539692"}
							}
						}
					}
				}
			}
		});
	};

	this._assignApplicationToLocation = function (auth, application) {
		return  this._makeIrisRequest({
			path       : "sites/" + auth.subaccountId + "/sippeers/" + application.locationId + "/products/messaging/applicationSettings",
			method     : "POST",
			auth       : auth,
			body: {
				"ApplicationsSettings": {
					"HttpMessagingV2AppId": {_text: application.applicationId}
				}
			}
		});
	};

	/**
	* Create messaging application on Bandwidth Dashboard (its id is required to send messages)
	* @param {Object} auth Bandwidth Dashboard auth data {accountId: "accountId",	userName: "userName", password: "password",	subaccountId: "subaccountId"}
	* @param {Object} data Options of new application
	* @param {String} data.name Application name
	* @param {String} data.callbackUrl callback url to receive messages events
	* @param {Object} data.callbackAuthData optional callback basic auth data ({userName: "", pasword: ""})
	* @param {String} data.locationName Location name
	* @param {Boolean} data.isDefaultLocation is location default
	* @param {Object} data.smsOptions SMS options
	* @param {Boolean} data.smsOptions.enabled are SMSes enabled
	* @param {Boolean} data.smsOptions.tollFreeEnabled can toll free numbers to be used with SMS
	* @param {Boolean} data.smsOptions.shortCodeEnabled can short numbers to be used with SMS
	* @param {Object} data.mmsOptions MMS options
	* @param {Boolean} data.mmsOptions.enabled are MMSes enabled
	* @returns {Object} Created application data {applicationId: "", locationId: ""}
	*
	* @example
	* client.v2.Message.createMessagingApplication(authData, {
	*   name: "My Messaging App",
	*   callbackUrl: "http://your/callback/handler",
	*   locationName: "Current",
	*   smsOptions: {enabled: true},
	*   mmsOptions: {enabled: true}
	* }).then(function (application) {});
	*/
	this.createMessagingApplication = function (auth, data, callback) {
		var app;
		var self = this;
		return Promise.all([self._createApplication(auth, data), self._createLocation(auth, data)])
			.then(function (result) {
				app = {
					applicationId: result[0],
					locationId: result[1]
				};
				return self._enableSms(auth, data.smsOptions, app);
			})
			.then(function () {
				return self._enableMms(auth, data.mmsOptions, app);
			})
			.then(function () {
				return self._assignApplicationToLocation(auth, app);
			})
			.then(function () {
				return app;
			})
			.asCallback(callback);
	};

	/**
	* Look for and reserve phone numbers on Bandwidth Dashboard
	* @param {Object} auth Bandwidth Dashboard auth data {accountId: "accountId",	userName: "userName", password: "password",	subaccountId: "subaccountId"}
	* @param {Object} app Application data (result of createMessagingApplication())
	* @param {AreaCodeSearchAndOrderNumbersQuery|RateCenterSearchAndOrdeNumbersQuery|NpaNxxSearchAndOrderNumbersQuery|TollFreeVanitySearchAndOrderNumbersQuery|TollFreeWildCharSearchAndOrderNumbersQuery|StateSearchAndOrderNumbersQuery|CitySearchAndOrderNumbersQuery|ZipSearchAndOrderNumbersQuery|LataSearchAndOrderNumbersQuery|CombinedSearchAndOrderNumbersQuery} query Search query
	* @returns {Array} Array of reserved phone number
	*
	* @example
	* client.v2.Message.searchAndOrderNumbers(authData, new client.AreaCodeSearchAndOrderNumbersQuery({areaCode: "910", quantity: 3})).then(function (numbers) {});
	*/
	this.searchAndOrderNumbers = function (auth, app, query, callback) {
		var self = this;
		query = query || {};
		var timeout = (query.timeout || 60) * 1000;
		var queryXml = util.isFunction(query.toXml) ? query.toXml() : query;
		queryXml["SiteId"] = {_text: auth.subaccountId};
		queryXml["PeerId"] = {_text: app.locationId};
		return self._makeIrisRequest({
			path       : "orders",
			method     : "POST",
			auth       : auth,
			body: {
				"Order": queryXml
			}
		})
		.then(function (result) {
			return findFirstDescendant(result[0], "Order").id._text;
		})
		.then(function (orderId) {
			return new Promise(function (resolve, reject) {
				var timer = null;
				var timeoutReached = false;
				var checkTimeout = function () {
					if (timeoutReached) {
						clearInterval(timer);
						reject(new UnexpectedResponseError("Timeout", 400));
					}
				};
				setTimeout(function () {
					timeoutReached = true;
				}, timeout);
				timer = setInterval(function () {
					return self._makeIrisRequest({
						path       : "orders/" + orderId,
						method     : "GET",
						auth       : auth
					})
					.then(function (result) {
						var status = findFirstDescendant(result[0], "OrderStatus");
						if (["COMPLETE", "PARTIAL"].indexOf(status) >= 0) {
							var completedNumbers = findFirstDescendant(result[0], "CompletedNumbers");
							clearInterval(timer);
							return resolve(findDescendants(completedNumbers, "FullNumber"));
						}
						if (status === "FAILED") {
							clearInterval(timer);
							return reject(new UnexpectedResponseError("Error on reserving phone numbers", 400));
						}
						checkTimeout();
					});
				}, 500);
			});
		})
		.asCallback(callback);
	};

	/**
	 * Send a new SMS or MMS message
	 * @param  {Object} params Parameters for sending a new message.
	 * @param  {String} params.text The message text to send
	 * @param  {String} params.from The message sender"s telephone number (or short code)
	 * This must be a Catapult Dashboard number that you own
	 * @param  {String|Array} params.to Message recipient telephone number (or short code)
	 * @param  {Array} [params.media] Json array containing list of media urls to be sent as content for an mms.
	 * Valid URLs are: https://api.catapult.inetwork.com/v1/users/<user-id>/media/
	 * We also support media URLs that are external to Bandwidth API, http:// or https:// format:
	 * Example: http://customer-web-site.com/file.jpg
	 * @param  {String} [params.tag] A string that will be included in the callback events of the message
	 * @param  {String} applicationId A Dashboard application Id
	 * @param  {Function} [callback] A callback for the new message object
	 * @returns {Object} A promise for the new message object
	 * @example
	 * client.v2.Message.send({
	 *   from : "+19195551212",
	 *   to   : ["+19195551213"],
	 *   text : "Thank you for susbcribing to Unicorn Enterprises!",
	 *   applicationId : "appId" // app.applicationId
	 * })
	 * .then(function(message){
	 *   console.log(message);
	 * });
	 */
	this.send = function (params, callback) {
		return client.makeRequest({
            apiBaseUrl : "https://messaging.bandwidth.com/api",
			apiVersion : "v2",
			path       : "messages",
			method     : "POST",
			body       : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Message;
