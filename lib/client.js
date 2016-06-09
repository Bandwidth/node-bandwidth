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

	function getUserAgentHeader() {
		return packageInfo.name + "-v" + packageInfo.version;
	}

	function createRequestOptions (params) {
		return {
			url                : config.baseUrl + apiVersionPath + usersPath + "/" + config.userId + "/" + params.path,
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

	this.makeRequest = function (params) {
		return request(createRequestOptions(params)).then(handleResponse);
	};
};

module.exports = Client;
