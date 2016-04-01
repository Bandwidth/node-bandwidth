var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var UnexpectedResponseError = require("./unexpectedResponseError");

var apiVersionPath = "/v1";
var usersPath = "/users";

/**
 * Catapult API Client
 * @constructor
 * @param {object} config Client configuration parameters
 * @param {string} config.userId Your Catapult user ID
 * @param {string} config.apiToken Your Catapult API token
 * @param {string} config.apiSecret Your Catapult API secret
 * @param {string} [config.baseUrl] The catapult base URL. Configurable for using alternative Catapult environments.
 * Default: https://api.catapult.inetwork.com
 */
var Client = function (config) {
	// Apply default values if not provided
	if (!config.baseUrl) {
		config.baseUrl = "https://api.catapult.inetwork.com";
	}

	function createRequestOptions (params) {
		return {
			url                : config.baseUrl + apiVersionPath + usersPath + "/" + config.userId + "/" + params.path,
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

	/**
	 * Make an HTTP request to the Catapult REST API. Note, this is an SDK internal
	 * function, and not designed to be used directly
	 * @param {Object} params Request parameters
	 * @param {String} params.url The URL of the request
	 * @param {Object} [params.qs] Query string parameters for the request
	 * @param {String} [params.method=GET] The HTTP method to execute. Default is GET
	 * @param {Object} [params.body] The request body
	 * @return {Promise} A promise for the HTTP response
	 */
	this.makeRequest = function (params) {
		return request(createRequestOptions(params))
			.then(function (response) {
				if (response.statusCode !== 200 && response.statusCode !== 201) {
					var message = "";
					if (response.body) {
						message = response.body.message || "";
					}
					throw new UnexpectedResponseError(message, response.statusCode);
				}
				return response;
			});
	};
};

module.exports = Client;
