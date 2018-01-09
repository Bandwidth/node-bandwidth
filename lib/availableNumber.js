/**
 * Available numbers
 * @constructor
 */
var AvailableNumber = function (client) {
	/**
	 * Search for available local or tollFree numbers
	 * @param {String} type Type of number to search (local or tollFree)
	 * @param {Object} params Search parameters
	 * @param {String} [params.city] A city name (only for local numbers)
	 * @param {String} [params.state] A state name (only for local numbers)
	 * @param {String} [params.zip] A 5-digit US ZIP code (only for local numbers)
	 * @param {String} [params.areaCode] A 3-digit telephone area code (only for local numbers)
	 * @param {String} [params.localNumber] First digits of a telephone number inside an area code
	 * for filtering the results (only for local numbers)
	 * @param {String} [params.inLocalCallingArea] Boolean value to indicate that the search for
	 * available numbers must consider overlayed areas. Only applied for localNumber searching.
	 * (only for local numbers)
	 * @param {String} [params.quantity] The maximum number of numbers to return (default 10, maximum 5000)
	 * @param {String} [params.pattern] A number pattern that may include letters, digits, and the following
	 * wildcard characters: ? - matches any single digit, * - matches zero or more digits
	 * @param {Function} callback A callback with the list of available numbers
	 * @return {Array.<AvailableNumberResponse>} A promise for the list of available numbers
	 * @example
	 * // Search 3 available local phone numbers with area code 910
	 *
	 * // Promise
	 * client.AvailableNumber.search("local", { areaCode : "910", quantity : 3 }).then(function (numbers) {});
	 *
	 * // Callback
	 * client.AvailableNumber.search("local", { areaCode : "910", quantity : 3 }, function (err, numbers) {});
	 * @example
	 * //Promise
	 * client.AvailableNumber.search("tollFree", {
	 * 	quantity : 3 })
	 * .then(function (numbers) {
	 * 	console.log(numbers)
	 * });
	 *
	 * // Callback
	 * client.AvailableNumber.search("tollFree", {
	 * 	quantity : 3 },
	 * 	function (err, numbers) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(numbers);
	 * 		}
	 * 	});
	 */
	this.search = function (type, params, callback) {
		return client.makeRequest({
			pathWithoutUser : true,
			path            : "availableNumbers/" + type,
			method          : "GET",
			qs              : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Search for available local or tollFree numbers and order them
	 * @param {String} type Type of number to search (local or tollFree)
	 * @param {Object} params Search parameters
	 * @param {String} [params.city] A city name (only for local numbers)
	 * @param {String} [params.state] A state name (only for local numbers)
	 * @param {String} [params.zip] A 5-digit US ZIP code (only for local numbers)
	 * @param {String} [params.areaCode] A 3-digit telephone area code (only for local numbers)
	 * @param {String} [params.localNumber] First digits of a telephone number inside an area code for
	 * filtering the results (only for local numbers)
	 * @param {String} [params.pattern] A number pattern that may include letters, digits, and the following
	 * wildcard characters: ? - matches any single digit, * - matches zero or more digits
	 * @param {String} [params.inLocalCallingArea] Boolean value to indicate that the search for
	 * available numbers must consider overlayed areas. Only applied for localNumber searching.
	 * (only for local numbers)
	 * @param {String} [params.quantity] The maximum number of numbers to return
	 * (default 10, maximum 5000)
	 * @param {Function} callback A callback with the list of ordered numbers
	 * @return {Array.<OrderedNumberResponse>} A promise for the list of ordered numbers
	 * @example
	 * // Search 2 available local phone numbers with area code 910 and order them
	 *
	 * // Promise
	 * client.AvailableNumber.searchAndOrder("local", { areaCode : "910", quantity : 2 }).then(function (numbers) {});
	 *
	 * // Callback
	 * client.AvailableNumber.serchAndOrder("local", { areaCode : "910", quantity : 2 }, function (err, numbers) {});
	 * @example
	 * //Search and order tollfree numbers
	 * //Promise
	 * client.AvailableNumber.searchAndOrder("tollFree", {
	 * 	quantity : 1 })
	 * .then(function (numbers) {
	 * 	console.log(numbers)
	 * });
	 *
	 * // Callback
	 * client.AvailableNumber.searchAndOrder("tollFree", {
	 * 	quantity : 1 },
	 * 	function (err, numbers) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(numbers);
	 * 		}
	 * 	});
	 */
	this.searchAndOrder = function (type, params, callback) {
		return client.makeRequest({
			pathWithoutUser : true,
			path            : "availableNumbers/" + type,
			method          : "POST",
			qs              : params
		})
		.then(function (response) {
			return response.body.map(function (item) {
				var location = item.location;
				item.id = location.substring(location.lastIndexOf("/") + 1);
				return item;
			});
		})
		.asCallback(callback);
	};
};

module.exports = AvailableNumber;

/**
 * @class AvailableNumberResponse
 * @type {Object}
 * @property {String} number Phone number.
 * @property {String} nationalNumber Phone number in national format.
 * @property {String} price Price of this phone number.
 * @property {String} city A city name of number (only for local numbers).
 * @property {String} rateCenter A rate center (only for local numbers).
 * @property {String} state A state of number (only for local numbers).
 */

/**
 * @class OrderedNumberResponse
 * @type {Object}
 * @property {String} id Id of ordered number.
 * @property {String} number Phone number.
 * @property {String} nationalNumber Phone number in national format.
 * @property {String} price Price of this phone number.
 */
