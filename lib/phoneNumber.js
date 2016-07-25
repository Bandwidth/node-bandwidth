var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * Phone numbers
 * @constructor
 */
var PhoneNumber = function (client) {
	/**
	 * Allocates a number
	 * @param {Object} params Parameters for allocating a number
	 * @param {String} params.number A number to allocate.
	 * @param {String} [params.name] A name you choose for this number.
	 * @param {String} [params.applicationId] The unique id of an Application you want
	 * to associate with this number.
	 * @param {String} [params.fallbackNumber] Number to transfer an incoming call when
	 * the callback/fallback events can't be delivered.
	 * @param {Function} [callback] Callback with the newly created number
	 * @return {PhoneNumberResponse} A promise for the newly created number
	 * @example
	 *
	 * //Allocate number +1234567980
	 *
	 * // Promise
	 * client.PhoneNumber.create({ number : "+1234567890" }).then(function(number){});
	 *
	 * // Callback
	 * client.PhoneNumber.create({ number : "+1234567890" }, function(err, number){});
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "phoneNumbers",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var phoneNumber = params;
			var location = response.headers.location;
			phoneNumber.id = location.substring(location.lastIndexOf("/") + 1);
			return phoneNumber;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about a phoneNumber.
	 * @param  {String} phoneNumberOrId The ID of the number or number in format E.164
	 * (like +1234567980) to get
	 * @param  {Function} callback A callback with the call information
	 * @return {PhoneNumberResponse} A promise for the call information
	 * @example
	 * // Promise
	 * client.PhoneNumber.get(numberId).then(function(number){});
	 * // or
	 * client.PhoneNumber.get("+1234567890").then(function(number){});
	 *
	 * // Callback
	 * client.PhoneNumber.get(numberId, function(err, number){});
	 * // or
	 * client.PhoneNumber.get("+1234567890", function(err, number){});
	 * */
	this.get = function (phoneNumberOrId, callback) {
		return client.makeRequest({
			path   : "phoneNumbers/" + encodeURIComponent(phoneNumberOrId),
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of allocated numbers.
	 * @param {Object} params Query parameters for listing numbers
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list numbers. If no value is specified the default value is 25 (maximum value 1000).
	 * @param {String} [params.applicationId] Used to filter the retrieved list of numbers by
	 * an associated application ID
	 * @param {String} [params.state] Used to filter the retrieved list of numbers by
	 * a US state.
	 * @param {String} [params.name] Used to filter the retrieved list of numbers by name
	 * @param {String} [params.city] Used to filter the retrieved list of numbers by city name
	 * @param {String} [params.numberState] Used to filter the retrieved list of numbers by number state
	 * @param {Function} callback A callback with the list of numbers
	 * @return {Array.<PhoneNumberResponse>} A promise for the list of phone numbers
	 * @example
	 * // Promise
	 * client.PhoneNumber.list({size: 1000}).then(function(numbersResponse){});
	 *
	 * // Callback
	 * client.PhoneNumber.list({size: 1000}, function(err, numbersResponse){});
	 */
	this.list = function (params, callback) {
		var self = this;
		return client.makeRequest({
			path   : "phoneNumbers",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var phoneNumberListResponse = {
				phoneNumbers : response.body,
				hasNextPage  : false,
				getNextPage  : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				phoneNumberListResponse.hasNextPage = true;
				phoneNumberListResponse.getNextPage = function (nextCallback) {
					return self.list(nextLink, nextCallback);
				};
			}
			return phoneNumberListResponse;
		})
		.asCallback(callback);
	};

	/**
	 * Update the number
	 * @param  {String} phoneNumberId The ID of the number
	 * @param {Object} params Changed parameters of the number
	 * @param {String} params.applicationId The unique id of an Application
	 * resource you want to associate with this number for incoming calls and messages.
	 * @param {String} params.name A name you choose for this number.
	 * @param {String} params.fallbackNumber Number to transfer an incoming call when the
	 * callback/fallback events can't be delivered.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.PhoneNumber.update(numberId, {name: "Another Name"}).then(function(){});
	 *
	 * // Callback
	 * client.PhoneNumber.update(numberId, {name: "Another Name"}, function(err){});
	 */
	this.update = function (phoneNumberId, params, callback) {
		return client.makeRequest({
			path   : "phoneNumbers/" + phoneNumberId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Remove the number
	 * @param  {String} phoneNumberId The ID of the number
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.PhoneNumber.delete(numberId).then(function(){});
	 *
	 * // Callback
	 * client.PhoneNumber.delete(numberId, function(err){});
	 */
	this.delete = function (phoneNumberId, callback) {
		return client.makeRequest({
			path   : "phoneNumbers/" + phoneNumberId,
			method : "DELETE"
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};
};

module.exports = PhoneNumber;

/**
 * @class PhoneNumberResponse
 * @type {Object}
 * @property {String} id The unique ID of the number.
 * @property {String} state Number state
 * @property {String} name Number name
 * @property {String} number Number  in E.164 format.
 * @property {String} nationalNumber Number in natinal friendly format (like  (555) 5555-5555).
 * @property {String} city Number city.
 * @property {String} state Number state.
 * @property {String} applicationId The unique id of an linked Application.
 * @property {String} fallbackNumber Number to transfer an incoming call
 * when the callback/fallback events can't be delivered.
 * @property {String} price The monthly price for this number.
 * @property {String} numberState The phone number state, values are `enabled` or `released`
 * @property {String} createdTime Date when the number was created.
 */
