var util = require("util");
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var convert = require("xml-js");
var UnexpectedResponseError = require("unexpectedResponseError");

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
 * SMS or MMS Message
 * @constructor
 * @param {Object} client Catapult client
 */
var Message = function (client) {
	var createIrisRequestOptions = function (params) {
		var auth = params.auth;
		var baseUrl = "https://dashboard.bandwidth.com/v1.0";
		var accountPath = "/api/accounts/" + auth.accountId;
		var xml = null;
		var headers = {
			"User-Agent" : client.getUserAgentHeader()
		};
		if (params.body){
			headers["Content-Type"] = "application/xml";
			xml = convert.js2xml(params.body, {compact: true, spaces: 2});
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
			body               : params.body,
			rejectUnauthorized : false, // for some reason this is required for bootcamp ssl
			encoding           : params.encoding || undefined
		};
	};

	var handleResponse = function (response) {
		var body = convert.xml2js(response.body || "", {compact: true, alwaysArray: true, nativeType: true});
		var code = findFirstDescendant(body, "errorCode");
		var description = findFirstDescendant(body, "description");
		if(!code){
			var error = findFirstDescendant(body, "error");
			if(error){
				code = error.code;
				description = error.description;
			}
			else{
				var errs =  findDescendants(body, "errors");
				if(errs.length === 0){
					code = findFirstDescendant(body, "resultCode");
					description = findFirstDescendant(body, "resultMessage");
				}
				else{
					throw new UnexpectedResponseError(errs.map(function(e){
						return e.code + ": " + e.description;
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

	var makeIrisRequest = function (params) {
		return request(createIrisRequestOptions(params)).then(handleResponse);
	};

	var createApplication = function (auth, data) {
		return makeIrisRequest({
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

	var createLocation = function (auth, data) {
		return makeIrisRequest({
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
			message.id = location.substring(location.lastIndexOf("/") + 1);
		});
	};

	var enableSms = function (auth, options, application) {
		if (!options || !options.enabled) {
			return Promise.resolve();
		}
		return makeIrisRequest({
			path       : "sites/" + auth.subaccountId + "/sippeers/" + application.locationId + "/products/messaging/features/sms",
			method     : "POST",
			auth       : auth,
			body: {
				"SipPeerSmsFeature": {
					"SipPeerSmsFeatureSettings": {
						"TollFree": {_text: options.tollFreeEnabled},
						"ShortCode": {_text: options.shortCodeEnabled},
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

	var enableMms = function (auth, options, application) {
		if (!options || !options.enabled) {
			return Promise.resolve();
		}
		return makeIrisRequest({
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

	var assignApplicationToLocation = function (auth, application) {
		return makeIrisRequest({
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

	this.createMessagingApplication = function (auth, data, callback) {
		var app;
		return Promise.all([createApplication(auth, data), createLocation(auth, data)])
			.then(function (result) {
				app = {
					applicationId: result[0],
					locationId: result[1]
				};
				return enableSms(auth, data.smsOptions, app);
			})
			.then(function () {
				return enableMms(auth, data.mmsOptions, app);
			})
			.then(function () {
				return assignApplicationToLocation(auth, app);
			})
			.then(function () {
				return app;
			})
			.asCallback(callback);
	};

	this.searchAndOrderNumbers = function (auth, app, query, callback) {
		query = query || {};
		var timeout = (query.timeout || 60) * 1000;
		var queryXml = util.isFunction(query.toXml) ? query.toXml() : query;
		queryXml["SiteId"] = {_text: auth.subaccountId};
		queryXml["PeerId"] = {_text: app.locationId};
		return makeIrisRequest({
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
					return makeIrisRequest({
						path       : "orders/" + orderId,
						method     : "GET",
						auth       : auth
					})
					.then(function (result) {
						var status = findFirstDescendant(result[0], "OrderStatus");
						if (["COMPLETE", "PARTIAL"].indexOf(status) >= 0) {
							var completedNumbers = findFirstDescendant(result[0], "CompletedNumbers");
							clearInterval(timer);
							return resolve(findDescendants(completedNumbers, "FullNumber").map(function (number) {
								return number._text;
							}));
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

	this.send = function (params, callback) {
		return client.makeRequest({
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
