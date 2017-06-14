/**
 * NumberInfo
 * @constructor
 */
var NumberInfo = function (client) {
	/**
	 * Gets information about a number.
	 * @param  {String} number The ID of the numberInfo to get
	 * @param  {Function} [callback] A callback with the number information
	 * @return {NumberInfoResponse} A promise for the number information
	 * @example
	 * // Promise
	 * client.NumberInfo.get("+1234567890").then(function(info){});
	 *
	 * // Callback
	 * client.NumberInfo.get("+1234567890", function(err, info){});
	 */
	this.get = function (number, callback) {
		return client.makeRequest({
			pathWithoutUser : true,
			path            : "phoneNumbers/numberInfo/" + encodeURIComponent(number),
			method          : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = NumberInfo;

/**
 * @class NumberInfoResponse
 * @type {Object}
 * @property {String} name The Caller ID name information.
 * @property {String} number Phone number in  E164 format.
 * @property {String} created The time this Caller ID information was first queried (UTC).
 * @property {String} updated The time this Caller ID information was last updated (UTC).
 */
