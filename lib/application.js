/**
 * Application
 * @constructor
 * @param {Object} client Catapult client
 */

var Application = function (client) {
	/**
	 * Get information about the specified applications
	 * @param  {Object} params Parameters for filtering applications
	 * @param {Number} [params.page] The specified page requested when querying
	 * a list of applications
	 * @param {Number} [params.size] The size of each page requested
	 * @param  {Function} [callback] A callback for the list of applications
	 * @return {MessageResponse} A promise for the list of applications
	 */
	this.get = function (params, callback) {
		return client.makeRequest({
			path   : "applications",
			method : "GET",
			qs   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

};

module.exports = Application;
