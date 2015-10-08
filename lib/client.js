var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var UnexpectedResponseError = require("./UnexpectedResponseError");

var Client = function (config) {
	// Apply default values if not provided
	if (!config.baseUrl) {
		config.baseUrl = "https://api.catapult.inetwork.com";
	}

	function createRequestOptions (params) {
		return {
			url    : config.baseUrl + "/v1/users/" + config.userId + "/" + params.path,
			qs     : params.qs,
			method : params.method || "GET",
			auth   : {
				user : config.apiToken,
				pass : config.apiSecret
			},
			json   : true,
			body   : params.body
		};
	}

	this.makeRequest = function (params) {
		return request(createRequestOptions(params))
			.then(function (response) {
				if (response[0].statusCode !== 200 && response[0].statusCode !== 201) {
					var message = "";
					if (response[0].body) {
						message = response[0].body.message || "";
					}
					throw new UnexpectedResponseError(message, response[0].statusCode);
				}
				return response;
			});
	};
};

module.exports = Client;
