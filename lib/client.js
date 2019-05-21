var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var UnexpectedResponseError = require("./unexpectedResponseError");
var RateLimitError = require("./RateLimitError");
var packageInfo = require("./../package.json");

var apiVersionPath = "/v1";
var usersPath = "/users";

var Client = function (config) {
	// Apply default values if not provided
	if (!config.baseUrl) {
		config.baseUrl = "https://api.catapult.inetwork.com";
	}

	var handleResponse = function (response) {
		if (response.statusCode === 429) {
			if (response.headers && response.headers["x-ratelimit-reset"]) {
				var limitReset = response.headers["x-ratelimit-reset"];
				throw new RateLimitError(response.body, response.statusCode, limitReset);
			}
			else {
				throw new UnexpectedResponseError(response.body, response.statusCode);
			}
		}
		else if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 202) {
			var message = "";
			if (response.body) {
				message = response.body.message || "";
			}
			throw new UnexpectedResponseError(message, response.statusCode);
		}
		return response;
	};

	function getUserAgentHeader() {
		return packageInfo.name + "-v" + packageInfo.version;
	}

	function createRequestOptions (params) {
        //Added to allow the V1/V2 base url split
        //V1 endpoint functions remain unchanged, V2 inclues the new URL as 'apiBaseUrl' param
        var apiBaseUrl = params.apiBaseUrl ? params.apiBaseUrl : config.baseUrl;
		var baseUrl = apiBaseUrl + (params.apiVersion ? "/" + params.apiVersion : apiVersionPath);
		var userPath = params.pathWithoutUser ? "" : (usersPath + "/" + config.userId);
		return {
			url                : baseUrl + userPath + "/" + params.path,
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
			rejectUnauthorized : false, // for some reason this is required for bootcamp ssl
			encoding           : params.encoding || params.encoding === null ? params.encoding : undefined
		};
	}

	this.makeRequest = function (params) {
		return request(createRequestOptions(params)).then(handleResponse);
	};

	this.createRequestOptions = createRequestOptions;

	this.handleResponse = handleResponse;

	this.getUserAgentHeader = getUserAgentHeader;
};

module.exports = Client;
