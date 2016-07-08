var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var UnexpectedResponseError = require("./unexpectedResponseError");
var packageInfo = require("./../package.json");

var apiVersionPath = "/v1";
var usersPath = "/users";

var Client = function (config) {
	// Apply default values if not provided
	if (!config.baseUrl) {
		config.baseUrl = "https://api.catapult.inetwork.com";
	}

	function handleResponse(response) {
		if (response.statusCode !== 200 && response.statusCode !== 201) {
			var message = "";
			if (response.body) {
				message = response.body.message || "";
			}
			throw new UnexpectedResponseError(message, response.statusCode);
		}
		return response;
	}

	function getUserAgentHeader() {
		return packageInfo.name + "-v" + packageInfo.version;
	}

	function createRequestOptions (params) {
		var url;
		if (params.attachUserPath) {
			url = config.baseUrl + apiVersionPath + usersPath + "/" + config.userId + "/" + params.path;
		}
		else {
			url = config.baseUrl + apiVersionPath + "/" + params.path;
		}
		return {
			url                : url,
			headers            : {
				"User-Agent" : getUserAgentHeader()
			},
			qs                 : params.qs,
			method             : params.method || "GET",
			auth               : {
				user : config.apiToken,
				pass : config.apiSecret
			},
			json               : true,
			body               : params.body,
			rejectUnauthorized : false // for some reason this is required for bootcamp ssl
		};
	}

	this.makeRequest = function (params) {
		params.attachUserPath = true;
		return request(createRequestOptions(params)).then(handleResponse);
	};

	// Needed for http://ap.bandwidth.com/docs/rest-api/available-numbers/
	// and
	// http://ap.bandwidth.com/docs/rest-api/numberinfo/
	this.makeRequestNoUser = function (params) {
		params.attachUserPath = false;
		return request(createRequestOptions(params)).then(handleResponse);
	};
};

module.exports = Client;
