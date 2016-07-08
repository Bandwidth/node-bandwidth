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
	 * @return {Promise} A promise for the newly created endpoint
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
	 * @param {String} domainId Id of domain
	 * @param {Function} callback A callback with the list of domains
	 * @return {Promise} A promise for the list of endpoints.
	 */
	this.list = function (domainId, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints",
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
	 * @param  {Function} [callback] A callback with token value.
	 * @return {Promise} A promise with token value.
	 */
	this.createAuthToken = function (domainId, endpointId, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId + "/endpoints/" + endpointId + "/tokens",
			method : "POST"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Endpoint;
