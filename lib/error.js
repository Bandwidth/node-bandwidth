var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * Error
 * @constructor
 */
var Error = function (client) {

	/**
	 * Gets information about a error.
	 * @param  {String} errorId The ID of the error to get
	 * @param  {Function} [callback] A callback with the error information
	 * @return {ErrorResponse} A promise for the error information
	 * @example
	 *
	 * // Promise
	 * client.Error.get(errorId).then(function(errorInfo){});
	 *
	 * // Callback
	 * client.Error.get(errorId, function(err, errorInfo){});
	 */
	this.get = function (errorId, callback) {
		return client.makeRequest({
			path   : "errors/" + errorId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of errors.
	 * @param {Object} params Query parameters for listing errors
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list of errors. If no value is specified the default value is 25.
	 * @param {Function} [callback] A callback with the list of errors
	 * @return {Array.<ErrorResponse>} A promise for the list of errors
	 * @example
	 *
	 * // Promise
	 * client.Error.list({size: 1000}).then(function(errorResponse){});
	 *
	 * // Callback
	 * client.Error.list({size: 1000}, function(err, errorResponse){});
	 */
	this.list = function (params, callback) {
		var self = this;
		return client.makeRequest({
			path   : "errors",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var errorListResponse = {
				errors      : response.body,
				hasNextPage : false,
				getNextPage : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				errorListResponse.hasNextPage = true;
				errorListResponse.getNextPage = function (nextCallback) {
					return self.list(nextLink, nextCallback);
				};
			}
			return errorListResponse;
		})
		.asCallback(callback);
	};
};

module.exports = Error;

/**
 * @class ErrorResponse
 * @type {Object}
 * @property {String} id The unique ID of the error.
 * @property {String} time The time the error occurred (UTC).
 * @property {String} category The error category.
 * @property {String} code A specific error code string that identifies the type of error
 * @property {String} message A message that describes the error condition in detail.
 * @property {Object} details A list of name/value pairs of additional details.
 */
