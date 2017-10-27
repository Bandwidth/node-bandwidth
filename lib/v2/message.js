var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var convert = require("xml-js");
var UnexpectedResponseError = require("unexpectedResponseError");

function findFirstDescendant(obj, name){
	var j, k, v, r;
	for(k in obj){
	  v = obj[k];
	  if(k === name){
		return v._text;
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
		var headers = {
			"User-Agent" : client.getUserAgentHeader()
		};
		if (params.body){
			headers["Content-Type"] = "application/xml";
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
		var body = convert.xml2js(response.body || "", {compact: true});
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
		return body;
	};

	var makeIrisRequest = function (params) {
		return request(createIrisRequestOptions(params)).then(handleResponse);
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
