var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");
/**
 * Domain
 * @constructor
 */
var Domain = function (client) {
	/**
	 * Create a domain
	 * @param {Object} params Parameters for creating a new domain
	 * @param {String} params.name The name is a unique URI to be used in DNS lookups.
	 * @param {String} params.description String to describe the domain.
	 * @param {Function} [callback] Callback with the newly created domain
	 * @return {DomainResponse} A promise for the newly created domain
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "domains",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var domain = params;
			var location = response.headers.location;
			var domainId = location.substring(location.lastIndexOf("/") + 1);
			domain.id = domainId;
			return domain;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of all domains.
	 * @param {Function} callback A callback with the list of calls
	 * @param {Number} [params.size] the maximum number of domains returned
	 * by the query per page (Max size: 100).
	 * @return {Array.<DomainResponse>} A promise for the list of domains.
	 */
	this.list = function (params, callback) {
		var self = this;
		return client.makeRequest({
			path   : "domains",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var domainListResponse = {
				domains     : response.body,
				hasNextPage : false,
				getNextPage : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				domainListResponse.hasNextPage = true;
				domainListResponse.getNextPage = function (nextCallback) {
					return self.list(nextLink, nextCallback);
				};
			}
			return domainListResponse;
		})
		.asCallback(callback);
	};

	/**
	 * Delete a domain.
	 * @param  {String} domainId ID of the domain to delete.
	 * @param  {Function} [callback] A callback for the domain.
	 * @return {Promise} A promise for current operation.
	 */
	this.delete = function (domainId, callback) {
		return client.makeRequest({
			path   : "domains/" + domainId,
			method : "DELETE"
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};
};

module.exports = Domain;

/**
 * @class DomainResponse
 * @type {Object}
 * @property {String} id The unique identifier for the domain.
 * @property {String} name A name you choose for this domain.
 * @property {String} description A description of this domain.
 */
