var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * Endpoint
 * @constructor
 */
var Endpoint = function (client) {
	/**
	 * Create a new endpoint for the domain
	 * @param {String} domainId Id of domain
	 * @param {Object} params Parameters for creating a new endpoint
	 * @param {String} params.name The endpoint's name, which SIP clients use as the "address of record" .
	 * @param {String} params.description String to describe the endpoint.
	 * 0param {String} params.applicationId The id of the application associated with this endpoint.
	 * @param {Boolean} params.enabled Allow or not to receive and make calls.
	 * @param {Object} params.credentials Auth parameters
	 * @param {Function} [callback] Callback with the newly created endpoint
	 * @return {EndpointResponse} A promise for the newly created endpoint
	 * @example
	 * // Promise
	 * client.Endpoint.create("domainId", { name : "my-endpoint", applicationId : "appId",
	 * credentials : { password : "123456" }}).then(function (endpoint) {});
	 * // Callback
	 * client.Endpoint.create("domainId", { name : "my-endpoint", applicationId : "appId",
	 * credentials : { password : "123456" }}, function (err, endpoint) {});
	 */
	this.create = function (domainId, params, callback) {
		params.domainId = domainId;
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var enpoint = params;
			var location = response.headers.location;
			enpoint.id = location.substring(location.lastIndexOf("/") + 1);
			return enpoint;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of all endpoints for the domain.
	 * @example
	 *  // Default size (25) using promises
	 *  client.Endpoint.list("domainId")
	 *  	.then(function (res) {});
	 * @example
	 * // Default size (25) using callbacks
	 * client.Endpoint.list("domainId", function (err, res) {});
	 * @example
	 * // Specify number of endpoints using promises
	 * client.Endpoint.list("domainId", {size: 1000})
	 * 		.then(function (res) {});
	 * @example
	 * // Specify number of endpoints using callbacks
	 * client.Endpoint.list("domainId" {size: 1000}, function (err, res) {});
	 * @param {String} domainId Id of the domain to list the endpoints
	 * @param {Object} params Parameters for listing endpoints on domain
	 * @param {Number} [params.size] OPTIONAL The maximum number of endpoints returned by
	 * the query per page (Max size: 1000).
	 * @param {Function} [callback] A callback with the list of endpoints
	 * @return {Array.<EndpointResponse>} A promise for the list of endpoints.

	 */
	this.list = function (domainId, params, callback) {
		var self = this;
		if (typeof params === "function") {
			callback = params;
			params = {};
		}
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var endpointListResponse = {
				endpoints   : response.body,
				hasNextPage : false,
				getNextPage : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				endpointListResponse.hasNextPage = true;
				endpointListResponse.getNextPage = function (nextCallback) {
					return self.list(domainId, nextLink, nextCallback);
				};
			}
			return endpointListResponse;
		})
		.asCallback(callback);
	};

	/**
	 * Get a single endpoint.
	 * @param {String} domainId Id of the domain
	 * @param {String} endpointId Id of the endpoint
	 * @param {Function} [callback] A callback with the endpoint
	 * @return {EndpointResponse} A promise for the endpoint.
	 * @example
	 * // Promise
	 * client.Endpoint.get(domainId, endpointId).then(function(endpoint){});
	 *
	 * // Callback
	 * client.Endpoint.get(domainId, endpointId, function(err, endpoint){});
	 */
	this.get = function (domainId, endpointId, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints/" + endpointId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Delete an endpoint.
	 * @param {String} domainId Id of domain
	 * @param  {String} endpointId ID of the endpoint to delete.
	 * @param  {Function} [callback] A callback for the operation.
	 * @return {Promise} A promise for current operation.
	 * @example
	 * // Promise
	 * client.Endpoint.delete("domainId", "endpointId").then(function (endpoint) {});
	 * // Callback
	 * client.Endpoint.delete("domainId", "endpointId", function (err, endpoint) {});
	 */
	this.delete = function (domainId, endpointId, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints/" + endpointId,
			method : "DELETE"
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Update an endpoint.
	 * @param {String} domainId Id of domain
	 * @param  {String} endpointId ID of the endpoint to update.
	 * @param {Object} params Changed parameters for the endpoint
	 * @param {String} params.description String to describe the endpoint.
	 * 0param {String} params.applicationId The id of the application associated with this endpoint.
	 * @param {Boolean} params.enabled Allow or not to receive and make calls.
	 * @param {Object} params.credentials Auth parameters
	 * @param  {Function} [callback] A callback for the operation.
	 * @return {Promise} A promise for current operation.
	 * @example
	 * // Promise
	 * client.Endpoint.update("domainId", "endpointId", { enabled : true }).then(function (endpoint) {});
	 * // Callback
	 * client.Endpoint.update("domainId", "endpointId", { enabled : true }, function (err, endpoint) {});
	 */
	this.update = function (domainId, endpointId, params, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints/" + endpointId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Generate auth token for the endpoint.
	 * @param {String} domainId Id of domain
	 * @param  {String} endpointId ID of the endpoint to update.
	 * @param  {Object} params parameters of token.
	 * @param  {Number} params.expires Expiration time of token in seconds
	 * @param  {Function} [callback] A callback with token value.
	 * @return {Promise} A promise with token value.
 	 * @example
	 * // Promise
	 * client.Endpoint.createAuthToken("domainId", "endpointId", { expires : 3600 }).then(function (endpoint) {});
	 * // Callback
	 * client.Endpoint.createAuthToken("domainId", "endpointId", { expires : 3600 }, function (err, endpoint) {});
	 */
	this.createAuthToken = function (domainId, endpointId, params, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints/" + endpointId + "/tokens",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Endpoint;

/**
 * @class EndpointResponse
 * @type {Object}
 * @property {String} id The unique identifier for the application.
 * @param {String} name The endpoint's name, which SIP clients use as the "address of record" .
 * @param {String} description String to describe the endpoint.
 * 0param {String} applicationId The id of the application associated with this endpoint.
 * @param {Boolean} enabled Allow or not to receive and make calls.
 * @param {Object} credentials Auth parameters
*/
