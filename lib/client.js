var Promise = require("bluebird");
const axios = require('axios');
var request = Promise.promisify(require("request"));
var UnexpectedResponseError = require("./unexpectedResponseError");
var RateLimitError = require("./RateLimitError");
var packageInfo = require("./../package.json");
const {buildXml, parseXml} = require('./xmlHelper.js');

var apiVersionPath = "/v1";
var usersPath = "/users";

var Client = function (config) {
	// Apply default values if not provided
	if (!config.baseUrl) {
		config.baseUrl = "https://api.catapult.inetwork.com";
	}

		// Apply default values if not provided
	if (!config.baseDashboardUrl) {
		config.baseDashboardUrl = "https://dashboard.bandwidth.com/api/accounts/";
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
		var baseUrl = config.baseUrl + apiVersionPath;
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
			encoding           : params.encoding || undefined
		};
	}

	this.makeRequest = function (params) {
		return request(createRequestOptions(params)).then(handleResponse);
	};

	this.createRequestOptions = createRequestOptions;

	this.handleResponse = handleResponse;

	/* Create interfaces to Dashboard and Message API */
	let dashboard = axios.create({
		baseURL: `https://dashboard.bandwidth.com/api/accounts/${dashboardAccount}`,
		responseType: 'text',
		auth: {
			username: dashboardUser,
			password: dashboardPass
		},
		headers: {
			"User-Agent" : getUserAgentHeader()
		}
		transformResponse: [parseXml]
	});

	dashboard.defaults.headers.post['Content-Type'] = 'application/xml; charset=utf-8';
	dashboard.defaults.headers.put['Content-Type'] = 'application/xml; charset=utf-8';

	this.makeDashboardRequest = (params) => {
		return dashboard.request(params)
	};
};

module.exports = Client;
