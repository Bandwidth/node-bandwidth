var util = require("util");

var RateLimitError = function (message, statusCode, limitReset) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.statusCode = statusCode;
	this.limitReset = limitReset;

};

util.inherits(RateLimitError, Error);

module.exports = RateLimitError;

var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * Account
 * @constructor
 */
var Account = function (client) {

	/**
	 * Gets information about user's account.
	 * @param  {String} accountId The ID of the account to get
	 * @param  {Function} callback A callback with the account information
	 * @return {AccountResponse} A promise for the account information
	 * @example
	 * // Promise
	 * client.Account.get().then(function(info){});
	 *
	 * // Callback
	 * client.Account.get(function(err, info){});
	 */
	this.get = function (callback) {
		return client.makeRequest({
			path   : "account",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of transactions from user's account.
	 * @param {Object} params Query parameters for listing accounts
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list of transactions. If no value is specified the default value is 25 (maximum value 1000).
	 * @param {Number} [params.maxItems] Limit the number of transactions that will be returned
	 * @param {String} [params.toDate] Return only transactions that are newer than the parameter.
	 * @param {String} [params.fromDate] Return only transactions that are older than the parameter.
	 * @param {String} [params.type] Return only transactions that are this type.
	 * @param {Function} callback A callback with the list of transactions
	 * @return {TransactionListResponse} A promise for the list of transactions
	 * @example
	 *
	 * //Promise
	 * client.Account.getTransactions()
	 * 	.then(function (response) {
	 * 		console.log(response.transactions);
	 * 		if(response.hasNextPage) {
	 * 			return response.getNextPage();
	 * 		}
	 * 		else {
	 * 			return {transactions: []};
	 * 		}
	 * 	})
	 * 	.then(function(response) {
	 * 		console.log(response.transactions);
	 * 	});
	 * @example
	 * //Get transactions filtering by date
	 * //Promise
	 * var params = {
	 * 	fromDate: "2013-02-21T13:38:00"
	 * };
	 * client.Account.getTransactions(params)
	 * 	.then(function (response) {
	 * 		console.log(response.transactions);
	 * 		if(response.hasNextPage) {
	 * 			return response.getNextPage();
	 * 		}
	 * 		else {
	 * 			return {transactions: []};
	 * 		}
	 * 	})
	 * 	.then(function(response) {
	 * 		console.log(response.transactions);
	 * 	});
	 * @example
	 * //Get transactions filtering by date
	 * //Promise
	 * var params = {
	 * 	fromDate: "2013-02-21T13:38:00",
	 * 	toDate:   "2013-02-21T13:40:00"
	 * };
	 * client.Account.getTransactions(params)
	 * 	.then(function (response) {
	 * 		console.log(response.transactions);
	 * 		if(response.hasNextPage) {
	 * 			return response.getNextPage();
	 * 		}
	 * 		else {
	 * 			return {transactions: []};
	 * 		}
	 * 	})
	 * 	.then(function(response) {
	 * 		console.log(response.transactions);
	 * 	});
	 * @example
	 * //Get transactions limiting result
	 * //Promise
	 * var params = {
	 * 	maxItems: 1
	 * };
	 * client.Account.getTransactions(params)
	 * 	.then(function (response) {
	 * 		console.log(response.transactions);
	 * 		if(response.hasNextPage) {
	 * 			return response.getNextPage();
	 * 		}
	 * 		else {
	 * 			return {transactions: []};
	 * 		}
	 * 	})
	 * 	.then(function(response) {
	 * 		console.log(response.transactions);
	 * 	});
	 *
	 * @example
	 * //Get transactions of `payment` type
	 * //Promise
	 * var params = {
	 * 	type: "Payment"
	 * };
	 * client.Account.getTransactions(params)
	 * 	.then(function (response) {
	 * 		console.log(response.transactions);
	 * 		if(response.hasNextPage) {
	 * 			return response.getNextPage();
	 * 		}
	 * 		else {
	 * 			return {transactions: []};
	 * 		}
	 * 	})
	 * 	.then(function(response) {
	 * 		console.log(response.transactions);
	 * 	});
	 *
	 */
	this.getTransactions = function (params, callback) {
		var self = this;
		return client.makeRequest({
			path   : "account/transactions",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var transactionListResponse = {
				transactions : response.body,
				hasNextPage  : false,
				getNextPage  : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				transactionListResponse.hasNextPage = true;
				transactionListResponse.getNextPage = function (nextCallback) {
					return self.getTransactions(nextLink, nextCallback);
				};
			}
			return transactionListResponse;
		})
		.asCallback(callback);
	};
};

module.exports = Account;

/**
 * @class AccountResponse
 * @type {Object}
 * @property {String} balance User's account balance in dollars, as a string;
 * the currency symbol is not included.
 * @property {String} type The type of account configured for your user.
 */

/**
 * @class TransactionListResponse
 * @type {Object}
 * @property {Array.<TransactionResponse>} transactions Array of transactions
 * @property {function} getNextPage Calls the next page function
 * @property {boolean} hasNextPage True/False flag for next
 */

/**
 * @class TransactionResponse
 * @type {Object}
 * @property {String} id The unique identifier for the transaction.
 * @property {String} time The time the transaction was processed.
 * @property {String} amount The transaction amount in dollars, as a string;
 * the currency symbol is not included.
 * @property {String} type The type of transaction.
 * @property {String} units The number of product units the transaction charged or credited.
 * @property {String} productType The product the transaction was related to
 * @property {String} number The phone number the transaction was related to
 */

var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * Application
 * @constructor
 * @param {Object} client Catapult client
 */

var Application = function (client) {
	/**
	 * List the user's applications
	 * @param {Object} params Parameters for filtering applications.
	 * @param {Number} [params.size] The maximum number of applications returned by
	 * the query per page (Max size: 1000).
	 * @param {Function} [callback] A callback for the list of applications.
	 * @return {ApplicationListResponse} A promise for the list of applications, has a getNextPage
	 * function if the number of applications returned by the query exceeds the page size.
	 * @example
	 * //Promise
	 * client.Application.list()
	 * .then(function (response) {
	 * 	console.log(response.applications);
	 * 	if(response.hasNextPage) {
	 * 		return response.getNextPage();
	 * 	}
	 * 	else {
	 * 		return {applications: []};
	 * 	}
	 * })
	 * .then(function(response) {
	 * 	console.log(response.applications);
	 * });
	 */
	this.list = function (params, callback) {
		var self = this;
		return client.makeRequest({
			path   : "applications",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var applicationListResponse = {
				applications : response.body,
				hasNextPage  : false,
				getNextPage  : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				applicationListResponse.hasNextPage = true;
				applicationListResponse.getNextPage = function (nextCallback) {
					return self.list(nextLink, nextCallback);
				};
			}
			return applicationListResponse;
		})
		.asCallback(callback);
	};

	/**
	 * Create a new application
	 * @param {Object} params Parameters for creating a new call
	 * @param {String} params.name A name you choose for this application.
 	 * @param {String} params.incomingCallUrl A URL where call events will be sent for an inbound call.
 	 * This is the endpoint where the Application Platform will send all call events.
	 * Either incomingCallUrl or incomingMessageUrl is required.
 	 * @param {String} [params.incomingCallUrlCallbackTimeout] Determine how long should the platform wait
 	 * for incomingCallUrl's response before timing out in milliseconds.
 	 * @param {String} [params.incomingCallFallbackUrl] The URL used to send the callback
 	 * event if the request to incomingCallUrl fails.
 	 * @param {String} params.incomingMessageUrl A URL where message events will be sent for an inbound message.
 	 * This is the endpoint where the Application Platform will send all message events.
 	 * Either incomingMessageUrl or incomingCallUrl is required.
	 * @param {Number} [params.incomingMessageUrlCallbackTimeout] Determine how long should the platform wait for
 	 * incomingMessageUrl's response before timing out in milliseconds.
	 * @param {String} [params.incomingMessageFallbackUrl] The URL used to send the callback event if
	 * the request to incomingMessageUrl fails.
	 * @param {String} [params.callbackHttpMethod] Determine if the callback event should be sent via HTTP GET
 	 * or HTTP POST. Values are "get" or "post", default: "post".
 	 * @param {Boolean} [params.autoAnswer=true] Determines whether or not an incoming call should be
 	 * automatically answered. Default value is 'true'.
 	 * @param {Function} [callback] A callback for the list of applications
	 * @return {ApplicationResponse} A promise for the newly created application.
	 * @example
	 * //Promise
	 * client.Application.create({
	 * 	name: 'SampleApp',
	 * 	incomingCallUrl: 'http://your-server.com/CallCallback',
	 * 	incomingMessageUrl: 'http://your-server.com/MsgCallback'
	 * })
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Application.create({
	 * 	name: 'SampleApp2',
	 * 	incomingCallUrl: 'http://your-server.com/CallCallback',
	 * 	incomingMessageUrl: 'http://your-server.com/MsgCallback'
	 * }, function (err, response) {
	 * 	if (err) {
	 * 		console.log(err);
	 * 	}
	 * 	else {
	 * 		console.log(response)
	 * 	}
	 * });
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "applications",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var application = params;
			var location = response.headers.location;
			var applicationId = location.substring(location.lastIndexOf("/") + 1);
			application.id = applicationId;
			return application;
		})
		.asCallback(callback);
	};

	/**
	 * Get an application.
	 * @param  {String} applicationId The ID of the application to get.
	 * @param  {Function} [callback] A callback for the application.
	 * @return {ApplicationResponse} A promise for the application.
	 * @example
	 * // Promise
	 * client.Application.get('a-j4f2jz53mq')
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * // Callback
	 * client.Application.get('a-zuwwfzzrbea',
	 * 	function (err, response) {
	 * 		if (err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * });
	 */
	this.get = function (applicationId, callback) {
		return client.makeRequest({
			path   : "applications/" + applicationId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Make changes to an application.
	 * @param {String} applicationId The ID of the application to modify.
	 * @param {Object} params Parameters for creating a new call
	 * @param {String} [params.name] A name you choose for this application.
 	 * @param {String} [params.incomingCallUrl] A URL where call events will be sent for an inbound call.
 	 * This is the endpoint where the Application Platform will send all call events.
	 * Either incomingCallUrl or incomingMessageUrl is required.
 	 * @param {String} [params.incomingCallUrlCallbackTimeout] Determine how long should the platform wait
 	 * for incomingCallUrl's response before timing out in milliseconds.
 	 * @param {String} [params.incomingCallFallbackUrl] The URL used to send the callback
 	 * event if the request to incomingCallUrl fails.
 	 * @param {String} [params.incomingMessageUrl] A URL where message events will be sent for an inbound message.
 	 * This is the endpoint where the Application Platform will send all message events.
 	 * Either incomingMessageUrl or incomingCallUrl is required.
	 * @param {Number} [params.incomingMessageUrlCallbackTimeout] Determine how long should the platform wait for
 	 * incomingMessageUrl's response before timing out in milliseconds.
	 * @param {String} [params.incomingMessageFallbackUrl] The URL used to send the callback event if
	 * the request to incomingMessageUrl fails.
	 * @param {String} [params.callbackHttpMethod] Determine if the callback event should be sent via HTTP GET
 	 * or HTTP POST. Values are "get" or "post", default: "post".
 	 * @param {Boolean} [params.autoAnswer] Determines whether or not an incoming call should be
 	 * automatically answered. Default value is 'true'.
 	 * @param {Function} [callback] A callback for the list of applications
 	 * @example
	 * // Promise
	 * client.Application.update('a-j4f2j6vjmqz53mq', {
	 * 	name: 'Rename App1',
	 * 	autoAnswer: false
	 * })
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * // Callback
	 * client.Application.update('a-zudcfzzrbea',
	 * 	{
	 * 		name: 'Rename App2',
	 * 		autoAnswer: false
	 * 	},
	 * 	function (err, response) {
	 * 		if (err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * });
	 */
	this.update = function (applicationId, params, callback) {
		return client.makeRequest({
			path   : "applications/" + applicationId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Delete an application.
	 * @param  {String} applicationId The ID of the application to delete.
	 * @param  {Function} [callback] A callback for the application.
	 * @example
	 * // Promise
	 * client.Application.delete('a-j4f2j6mqz53mq')
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * // Callback
	 * client.Application.delete('a-zuwwzrbea',
	 * 	function (err, response) {
	 * 		if (err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * });
	 */
	this.delete = function (applicationId, callback) {
		return client.makeRequest({
			path   : "applications/" + applicationId,
			method : "DELETE"
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

};

module.exports = Application;

/**
 * @class ApplicationListResponse
 * @type {Object}
 * @property {Array.<ApplicationResponse>} applications Array of applications
 * @property {function} getNextPage Calls the next page function
 * @property {boolean} hasNextPage True/False flag for next
 */

/**
 * ApplicationResponse
 * @class ApplicationResponse
 * @type {Object}
 * @property {String} id The unique identifier for the application.
 * @property {String} name A name you choose for this application.
 * @property {String} incomingCallUrl A URL where call events will be sent for an inbound call.
 * This is the endpoint where the Application Platform will send all call events.
 * Either incomingCallUrl or incomingMessageUrl is required.
 * @property {String} incomingCallUrlCallbackTimeout Determine how long should the platform wait
 * for incomingCallUrl's response before timing out in milliseconds.
 * @property {String} incomingCallFallbackUrl The URL used to send the callback
 * event if the request to incomingCallUrl fails.
 * @property {String} callbackHttpMethod Determine if the callback event should be sent via HTTP GET
 * or HTTP POST. Values are "get" or "post", default: "post".
 * @property {Boolean} autoAnswer Determines whether or not an incoming call should be
 * automatically answered. Default value is 'true'.
 * @property {String} incomingMessageUrl A URL where message events will be sent for an inbound message.
 * This is the endpoint where the Application Platform will send all message events.
 * Either incomingMessageUrl or incomingCallUrl is required.
 * @property {Number} incomingMessageUrlCallbackTimeout Determine how long should the platform wait for
 * incomingMessageUrl's response before timing out in milliseconds.
 * @property {String} incomingMessageFallbackUrl The URL used to send the callback event if
 * the request to incomingMessageUrl fails.
 */
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

var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * Bridge
 * @constructor
 */
var Bridge = function (client) {
	/**
	 * Create a new bridge
	 * @param {Object} params Parameters for creating a bridge
	 * @param {Boolean} [params.bridgeAudio=true] Enable/Disable two way audio path.
	 * @param {Array<String>} [params.callIds] The list of call ids in the bridge. If the list of call ids
	 * is not provided the bridge is logically created and it can be used to place calls later.
	 * @param {Function} [callback] Callback with the newly created bridge
	 * @return {BridgeResponse} A promise for the newly created bridge
	 * @example
	 * //Promise
	 * client.Bridge.create({
	 * 	bridgeAudio: true,
	 * 	callIds: ['c-qbs5kwrsyx6wsdi', 'c-zan4g74pprsq']
	 * })
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.create({
	 * 	bridgeAudio: true,
	 * 	callIds: ['c-qbsx6wsdi', 'c-zan4g7prsq']
	 * }, function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "bridges",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var bridge = params;
			var location = response.headers.location;
			bridge.id = location.substring(location.lastIndexOf("/") + 1);
			return bridge;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about a bridge.
	 * @param  {String} bridgeId The ID of the bridge to get
	 * @param  {Function} callback A callback with the call information
	 * @return {BridgeResponse} A promise for the call information
	 * @example
	 * //Promise
	 * client.Bridge.get('brg-65dhjwrmbasiei')
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.get('brg-65dhmbasiei',
	 * 	function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
	 */
	this.get = function (bridgeId, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of bridges.
	 * @param {Object} params Query parameters for listing bridges
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list of bridges. If no value is specified the default value is 25 (maximum value 1000).
	 * @param {Function} callback A callback with the list of bridges
	 * @return {BridgeListResponse} A promise for the list of bridges
	 * @example
	 * client.Bridge.list()
	 * .then(function (response) {
	 * 	console.log(response.bridges);
	 * 	if(response.hasNextPage) {
	 * 		return response.getNextPage();
	 * 	}
	 * 	else {
	 * 		return {bridges: []};
	 * 	}
	 * })
	 * .then(function(response) {
	 * 	console.log(response.bridges);
	 * });
	 */
	this.list = function (params, callback) {
		var self = this;
		return client.makeRequest({
			path   : "bridges",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var bridgeListResponse = {
				bridges     : response.body,
				hasNextPage : false,
				getNextPage : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				bridgeListResponse.hasNextPage = true;
				bridgeListResponse.getNextPage = function (nextCallback) {
					return self.list(nextLink, nextCallback);
				};
			}
			return bridgeListResponse;
		})
		.asCallback(callback);
	};

	/**
	 * Update the bridge
	 * @param  {String} bridgeId The ID of the bridge
	 * @param {Object} params Changed parameters of the bridge
	 * @param {Boolean} params.bridgeAudio Enable/Disable two way audio path (default = true).
	 * @param {Array<String>} params.callIds The list of call ids in the bridge.
	 * @param {Function} [callback] Callback with the newly created bridge
	 * @return {BridgeResponse} A promise for the operation
	 * @example
	 * //Promise
	 * client.Bridge.update('brg-65dasiei', {
	 * 	bridgeAudio: false
	 * })
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.update('brg-65dhjbanasiei', {
	 * 	bridgeAudio: false
	 * }, function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
	 *
	 * @example
	 * // end bridge
	 * var bridgeOptions = {
	 * 	callIds: []
	 * };
	 *
	 * client.Bridge.update("{bridgeId}", bridgeOptions)
	 * .then(function () {
	 * 	// continue
	 * });
	 *
	 * @example
	 * // Add two calls to bridge then remove one
	 * var bridgeOptions = {
	 * 	bridgeAudio : true,
	 * 	callIds: ["{callId1}","{callId2}"]
	 * };
	 *
	 * client.Bridge.update("{bridgeId}", bridgeOptions)
	 * .then(function () {
	 * 	var callIdsToRemainInBridge = {
	 * 		callIds: ["{callId1"]
	 * 	};
	 * 	return client.Bridge.update("{bridgeId}", callIdsToRemainInBridge)
	 * })
	 * .then(function () {
	 * 	//continue
	 * });
	 */
	this.update = function (bridgeId, params, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	function audioApi (bridgeId, params, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId + "/audio",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	}

	/**
	 * Speak sentence to the bridge using default values
	 * @param {String} bridgeId The ID of the bridge
	 * @param {String} sentence A sentence to speak to the bridge.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence in a bridge
	 *
	 * //Promise
	 * client.Bridge.speakSentence("bridgeID", "Hello From Bandwidth").then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.speakSentence("bridgeID", "Hello From Bandwidth", function (err, res) {});
	 */
	this.speakSentence = function (bridgeId, sentence, callback) {
		return audioApi(bridgeId, { sentence : sentence }).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the bridge
	 * @param  {String} bridgeId the Id of the bridge to stop speaking
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Bridge.stopSpeaking("bridgeId").then(function (res) {});
	*/
	this.stopSpeaking = function (bridgeId, callback) {
		return this.speakSentence(bridgeId, "").asCallback(callback);
	};

	/**
	 * Play audio url to the bridge
	 * @param {String} bridgeId The ID of the bridge
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file on bridge
	 *
	 * //Promise
	 * client.Bridge.playAudioFile("bridgeID", "http://myurl.com/file.mp3").then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.playAudioFile("bridgeID", "http://myurl.com/file.wav", function (err, res) {});
	 */
	this.playAudioFile = function (bridgeId, fileUrl, callback) {
		return audioApi(bridgeId, { fileUrl : fileUrl }).asCallback(callback);
	};

	/**
	 * Play audio file or speak sentence in bridge
	 * @param {String} bridgeId The ID of the bridge
	 * @param {Object} params Parameters to play audio in bridge.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/bridges/#resourcePOSTv1usersuserIdbridgesbridgeIdaudio|docs}
	 * for list of supported locales.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/bridges/#resourcePOSTv1usersuserIdbridgesbridgeIdaudio|docs}
	 * for list of supported voices
	 * It will be considered only if sentence is not null/empty. Susan's voice will be used by default.
	 * @param {Boolean} [params.loopEnabled=false] When value is true, the audio will keep playing in a loop.
	 * Default: false.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio File on loop
	 * var options = {
	 * 	fileUrl     : "http://myurl.com/file.mp3",
	 * 	loopEnabled : true
	 * }
	 * //Promise
	 * client.Bridge.playAudioAdvanced("bridgeId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.playAudioAdvanced("bridgeId", options, function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Bridge.playAudioAdvanced("bridgeId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.playAudioAdvanced("bridgeId", options, function (err,res) {});
	 */
	this.playAudioAdvanced = function (bridgeId, params, callback) {
		return audioApi(bridgeId, params).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the bridge
	 * @param  {String} bridgeId the Id of the bridge to stop file playback
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Bridge.stopAudioFilePlayback("bridgeId").then(function (res) {});
	*/
	this.stopAudioFilePlayback = function (bridgeId, callback) {
		return this.playAudioFile(bridgeId, "").asCallback(callback);
	};

	/**
	 * Gets information about a bridge.
	 * @param  {String} bridgeId The ID of the bridge to get
	 * @param  {Function} callback A callback with the call information
	 * @return {Promise} A promise for the call information
	 * @example
	 * //Promise
	 * client.Bridge.getCalls('brg-65dhjbiei')
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.getCalls('brg-65dhjrmbasiei',
	 * 	function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
	 */
	this.getCalls = function (bridgeId, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId + "/calls",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Bridge;

/**
 * @class BridgeListResponse
 * @type {Object}
 * @property {Array.<BridgeResponse>} bridges Array of bridges
 * @property {function} getNextPage Calls the next page function
 * @property {boolean} hasNextPage True/False flag for next
 */

/**
 * @class BridgeResponse
 * @type {Object}
 * @property {String} id The unique ID of the bridge.
 * @property {String} state Bridge state. Possible state values are described here.
 * @property {Array<String>} callIds List of call Ids that will be in the bridge.
 * @property {Boolean} bridgeAudio Enable/Disable two way audio path.
 * @property {String} completedTime The time when the bridge was completed.
 * @property {String} createdTime The time that bridge was created.
 * @property {String} activatedTime The time that the bridge got into active state.
 */

/**
 * Voice call
 * @constructor
 */
var Call = function (client) {
	/**
	 * Create a new voice call
	 * @param {Object} params Parameters for creating a new call
	 * @param {String} params.from A Bandwidth phone number on your account the
	 * call should come from (must be in E.164 format, like +19195551212).
	 * @param {String} params.to The number to call (must be either an E.164 formated number,
	 * like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com).
	 * @param {Number} [params.callTimeout] Determine how long should the platform wait for]
	 * call answer before timing out in seconds.
	 * @param {String} [params.callbackUrl] The full server URL where the call events related to the
	 * Call will be sent to.
	 * @param {Number} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.callbackHttpMethod] Determine if the callback event should be sent via HTTP GET
	 * or HTTP POST. Values are "GET" or "POST" (if not set the default is POST).
	 * @param {String} [params.fallbackUrl] The full server URL used to send the callback
	 * event if the request to callbackUrl fails.
	 * @param {String} [params.bridgeId] The id of the bridge where the call will be added.
	 * @param {String} [params.conferenceId] Id of the conference where the call will be added.
	 * This property is required if you want to add this call to a conference.
	 * @param {String} [params.recordingEnabled] Indicates if the call should be recorded after being created.
	 * Set to "true" to enable. Default is "false".
	 * @param {String} [params.recordingMaxDuration] Indicates the maximum duration of call recording in seconds.
	 * Default value is 1 hour.
	 * @param {String} [params.transcriptionEnabled] Whether all the recordings for this call is going to be
	 * automatically transcribed.
	 * @param {String} [params.tag] A string that will be included in the callback events of the call.
	 * @param {Object} [params.sipHeaders] Map of Sip headers prefixed by "X-". Up to 5 headers can be sent per call.
	 * @param {Function} [callback] Callback with the newly created call
	 * @return {CallResponse} A promise for the newly created call
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "calls",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var call = params;
			var location = response.headers.location;
			var callId = location.substring(location.lastIndexOf("/") + 1);
			call.id = callId;
			return call;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about an active or completed call.
	 * @param  {String} callId The ID of the call to get
	 * @param  {Function} callback A callback with the call information
	 * @return {Promise} A promise for the call information
	 */
	this.get = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of active and historic calls you made or received.
	 * @param {Object} params Query parameters for listing calls
	 * @param {String} [params.bridgeId] The id of the bridge for querying a list of calls history
	 * (pagination does not apply).
	 * @param {String} [params.conferenceId] The id of the conference for querying a list of calls history
	 * @param {String} [params.from] The number to filter calls that came from (must be either an E.164
	 * formated number,like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com).
	 * @param {String} [params.to] The number to filter calls that was called to (must be either an E.164
	 * formated number,like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com).
	 * @param {Number} [params.page=0] Used for pagination to indicate the page requested for querying a list of calls.
	 * If no value is specified the default is 0.
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list of calls. If no value is specified the default value is 25 (maximum value 1000).
	 * @param {Function} callback A callback with the list of calls
	 * @return {Promise} A promise for the list of calls
	 */
	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "calls",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Update properties of an active phone call.
	 * @param {String} callId The ID of the incoming call
	 * @param {Object} params The propreties to update
	 * @param {string} [params.state] The call state.
	 * Possible values:
	 * `rejected` to reject not answer,
	 * `active` to answer the call,
	 * `completed` to hangup the call,
	 * `transferring` to start and connect call to a new outbound call.
	 * @param {string} [params.recordingEnabled] Indicates if the call should be recorded.
	 * Values `true` or `false`. You can turn recording on/off and have multiple recordings on a single call.
	 * @param {string} [params.recordingFileFormat] The file format of the recorded call.
	 * Supported values are `wav` (default) and `mp3`.
	 * @param {string} [params.transferTo] Phone number or SIP address that the call is going to be transferred to.
	 * @param {string} [params.transferCallerId] This is the caller id that will be used when the call is transferred.
	 * This parameter is only considered in `transfer` state.
	 * <br> - transferring an incoming call:
	 * Allowed values are 1) "private" 2) the incoming call "from" number or 3) any Bandwidth number owned by user.
	 * <br> - transferring an outgoing call call:
	 * allowed values are 1) "private" or 2) any Bandwidth phone number owned by user.
	 * @param {string} [params.whisperAudio] Audio to be played to the caller that the call will be transferred to.
	 * @param {string} [params.callbackUrl] The server URL where the call events for the new call will be sent.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Start recording a mp3 and update the callback url
	 * var payLoad = {
	 * 	recordingEnabled: "true",
	 * 	recordingFileFormat = "mp3",
	 * 	callbackUrl: "http://yourUrl.com/callbacks/callrecording"
	 * };
	 *
	 * client.call.update("callId", payload)
	 * .then(function () {
	 * 	// keep on keeping on here;
	 * });
	 */
	this.update = function (callId, params, callback) {
		return client.makeRequest({
			path   : "calls/" + callId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Answer an incoming call
	 * @param {String} callId The ID of the incoming call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Promise
	 * client.Call.answer("callID").then(function () {});
	 *
	 * //Callback
	 * client.Call.answer("callID", function (err) {});
	 */
	this.answer = function (callId, callback) {
		return this.update(callId, { state : "active" }).asCallback(callback);
	};

	/**
	 * Reject an incoming call
	 * @param {String} callId The ID of the incoming call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Promise
	 * client.Call.reject("callID").then(function () {});
	 *
	 * //Callback
	 * client.Call.reject("callID", function (err) {});
	 */
	this.reject = function (callId, callback) {
		return this.update(callId, { state : "rejected" }).asCallback(callback);
	};

	/**
	 * Complete active call
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Promise
	 * client.Call.hangup("callID").then(function () {});
	 *
	 * //Callback
	 * client.Call.hangup("callID", function (err) {});
	 */
	this.hangup = function (callId, callback) {
		return this.update(callId, { state : "completed" }).asCallback(callback);
	};

	/**
	 * Transfer a call
	 * @param {Object} params Parameters for transfering of the call
	 * @param {String} params.transferTo Phone number or SIP address that the call
	 * is going to be transferred to.
	 * @param {String} [params.transferCallerId] The caller id that will be used when the call is transferred
	 * see the {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallId|docs}
	 * for supported options.
	 * @param {Object} [params.whisperAudio] Audio to be played to the caller that the call will be transferred to.
	 * Uses the same parameters as call.playAudioAdvanced. See the
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}.
	 * @param {String} [params.whisperAudio.gender=female] The gender of the voice used to synthesize the sentence
	 * @param {String} [params.whisperAudio.voice=Susan] The voice to speak the sentence
	 * @param {String} [params.whisperAudio.locale=en_US]
	 * The locale used to get the accent of the voice used to synthesize the sentence.
	 * @param {String} [params.whisperAudio.fileUrl] The location of an audio file to play WAV and MP3 supported
	 * @param {Boolean} [params.whisperAudio.loopEnabled=false] Loop media
	 * @param {Function} [callback] Callback with the transfered call
	 * @return {CallResponse} A promise for the transfered call
	 * @example
	 * //Transfer call
	 * var speakSentence = {
	 * 	transferTo       : "+15555555555",
	 * 	transferCallerId : "private",
	 * 	whisperAudio     : {
	 * 		sentence : "You have an incoming call",
	 * 		gender   : "female",
	 * 		voice    : "julie",
	 * 		locale   : "en"
	 * 	}
	 * };
	 *
	 * //Using Promises
	 * client.Call.transfer("callId", speakSentence).then(function (res) {});
	 *
	 * var playAudio = {
	 * 	fileUrl     : "http://mysite.com/file.wav",
	 * 	loopEnabled : true
	 * }
	 * //Using callbacks
	 * client.Call.transfer("callId", playAudio, function (err, res) {});
	 *
	 * @example
	 * //Example: Transfer a call using the caller Id of the party being transferred
	 * var transferPayload = {
	 * 	transferTo       : "+18382947878",
	 * };
	 *
	 * //Using Promises
	 * client.Call.transfer("callId", transferPayload).then(function (res) {});
	 *
	 */
	this.transfer = function (callId, params, callback) {
		params.state = "transferring";
		return client.makeRequest({
			path   : "calls/" + callId,
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var location = response.headers.location;
			var callId = location.substring(location.lastIndexOf("/") + 1);
			return { id : callId };
		})
		.asCallback(callback);
	};

	function audioApi (callId, params, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/audio",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	}

	/**
	 * Speak sentence to the call using default values
	 * @param {String} callId The ID of the call
	 * @param {String} sentence A sentence to speak to the call.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence in a call
	 *
	 * //Promise
	 * client.Call.speakSentence("callID", "Hello From Bandwidth").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.speakSentence("callID", "Hello From Bandwidth", function (err, res) {});
	 */
	this.speakSentence = function (callId, sentence, callback) {
		return audioApi(callId, { sentence : sentence }).asCallback(callback);
	};
	/**
	 * This stops any speak sentence audio playback on the call
	 * @param {String} callId The ID of the call to stop file playback
	 * @return {Promise} A promise for the call information
	 * @example
	 * //Stop Audio file on call
	 * client.Call.stopSpeaking("callId").then(function (res) {});
	 */
	this.stopSpeaking = function (callId,callback) {
		return this.speakSentence(callId, "").asCallback(callback);
	};

	/**
	 * Play audio url to the call
	 * @param {String} callId The ID of the call
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file on call
	 *
	 * //Promise
	 * client.Call.playAudioFile("callId", "http://myurl.com/file.mp3").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.playAudioFile("callId", "http://myurl.com/file.wav", function (err, res) {});
	 */
	this.playAudioFile = function (callId, fileUrl, callback) {
		return audioApi(callId, { fileUrl : fileUrl }).asCallback(callback);
	};
	/**
	 * This stops any stop file audio playback on the call
	 * @param {String} callId The ID of the call to stop file playback
	 * @return {Promise} A promise for the call information
	 * @example
	 * //Stop Audio file on call
	 * client.Call.stopAudioFilePlayback("callId").then(function (res) {});
	 */
	this.stopAudioFilePlayback = function (callId,callback) {
		return this.playAudioFile(callId, "").asCallback(callback);
	};
	/**
	 * Play audio file or speak sentence in call
	 * @param {String} callId The ID of the call
	 * @param {Object} params Parameters to play audio in call.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}
	 * for list of supported locales.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}
	 * for list of supported voices
	 * It will be considered only if sentence is not null/empty. Susan's voice will be used by default.
	 * @param {Boolean} [params.loopEnabled=false] When value is true, the audio will keep playing in a loop.
	 * Default: false.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio File on loop
	 * var options = {
	 * 	fileUrl     : "http://myurl.com/file.mp3",
	 * 	loopEnabled : true
	 * }
	 * //Promise
	 * client.Call.playAudioAdvanced("callId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Call.playAudioAdvanced("callId", options, function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Call.playAudioAdvanced("callId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Call.playAudioAdvanced("callId", options, function (err,res) {});
	 */
	this.playAudioAdvanced = function (callId, params, callback) {
		return audioApi(callId, params).asCallback(callback);
	};

	/**
	 * Turns on call recording for the active call
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Turn on recording
	 *
	 * //Promise
	 * client.Call.enableRecording("callId").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.enableRecording("callId", function (err, res) {});
	 */
	this.enableRecording = function (callId, callback) {
		return this.update(callId, { recordingEnabled : true }).asCallback(callback);
	};

	/**
	 * Turns off call recording for the active call
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Turn off recording
	 *
	 * //Promise
	 * client.Call.disableRecording("callId").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.disableRecording("callId", function (err, res) {});
	 */
	this.disableRecording = function (callId, callback) {
		return this.update(callId, { recordingEnabled : false }).asCallback(callback);
	};

	this.setMaxRecordingDuration = function (callId, recordingMaxDuration, callback) {
		return this.update(callId, { recordingMaxDuration : recordingMaxDuration }).asCallback(callback);
	};

	/**
	 * Collects a series of DTMF digits from a phone call with an optional prompt.
	 * @param {String} callId The ID of the call
	 * @param {Object} params Parameters for creating a gather
	 * @param {String} [params.maxDigits] The maximum number of digits to collect (max: 30)
	 * @param {String} [params.interDigitTimeout=5] Stop gathering if a DTMF digit is not detected
	 * in this many seconds (max: 30s)
	 * @param {String} [params.terminatingDigits=#] A string of DTMF digits that end the gather operation immediately
	 * if any one of them is detected
	 * @param {String} [params.tag] A string you choose that will be included with the response and
	 * events for this gather operation.
	 * @param {String} [params.prompt.sentence] The text to speak for the prompt.
	 * Uses the same defaults as call.playAudioAdvanced. See the
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}
	 * @param {String} [params.prompt.gender] The gender to use for the voice reading the prompt sentence
	 * @param {String} [params.prompt.locale] The language and region to use for the voice reading the prompt sentence
	 * @param {Boolean} [params.prompt.loopEnabled=false] When value is true, the audio will keep playing in a loop
	 * @param {Boolean} [params.prompt.bargeable=true] Make the prompt (audio or sentence) bargeable
	 * (will be interrupted at first digit gathered).
	 * @param {Strings} [params.prompt.fileUrl] Make the prompt (audio or sentence) bargeable
	 * (will be interrupted at first digit gathered).
	 * @param {Function} [callback] Callback with the newly created call
	 * @return {CallResponse} A promise for the newly created call
	 * @example
	 * //Create Gather
	 * //The gather ends if either 0, #, or * is detected
	 * var options = {
	 * 	maxDigits         : 30,
	 * 	interDigitTimeout : "30",
	 * 	terminatingDigits : "0#*",
	 * 	prompt            : {
	 * 		sentence    : "Please enter your account number and press pound",
	 * 		gender      : "male",
	 * 		voice       : "Simon",
	 * 		locale      : "en_UK",
	 * 		loopEnabled : true,
	 * 		bargeable   : true
	 * 	}
	 * };
	 * //Promise
	 * client.Call.createGather("callId", options).then(function(res) {});
	 *
	 * //Callback
	 * client.Call.createGather("callId", options, function(err, res) {});
	 */
	this.createGather = function (callId, params, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/gather",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var gather = params;
			var location = response.headers.location;
			gather.id = location.substring(location.lastIndexOf("/") + 1);
			return gather;
		})
		.asCallback(callback);
	};

	/**
	 * Get the gather DTMF parameters and results.
	 * @param {String} callId The ID of the call
	 * @param {String} gatherId The ID of the gather
	 * @param {Function} [callback] Callback with the gather
	 * @return {GatherResponse} A promise for the gather
	 */
	this.getGather = function (callId, gatherId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/gather/" + gatherId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Complete the gather.
	 * @param {String} callId The ID of the call
	 * @param {String} gatherId The ID of the gather
	 * @param {Function} [callback] Callback of the operation
	 * @return {Promise} A promise for the operation
	 */
	this.completeGather = function (callId, gatherId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/gather/" + gatherId,
			method : "POST",
			body   : { state : "completed" }
		})
		.asCallback(callback);
	};

	/**
	 * Get events for the call.
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback with the event list
	 * @return {Array.<EventResponse>} A promise for the event list
	 * @example
	 * // Promise
	 * client.Call.getEvents(callId).then(function (events) {});
	 * // Callback
	 * client.Call.getEvents(callId, function (err, events) {});
	 */
	this.getEvents = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/events",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get a single event for the call.
	 * @param {String} callId The ID of the call
	 * @param {String} eventId The ID of the event to get
	 * @param {Function} [callback] Callback with the event list
	 * @return {EventResponse} A promise for the event list
	 * @example
	 * // Promise
	 * client.Call.getEvent(callId, evenId).then(function (callEvent) {});
	 * // Callback
	 * client.Call.getEvent(callId, eventId, function (err, callEvent) {});
	 */
	this.getEvent = function (callId, eventId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/events/" + eventId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get recordings for the call.
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback with the recording list
	 * @return {Array.<RecordingResponse>} A promise for the recording list
	 * @example
	 * // Promise
	 * client.Call.getRecordings(callId).then(function (list) {});
	 * // Callback
	 * client.Call.getRecordings(callId, function (err, list) {});
	 */
	this.getRecordings = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/recordings",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get transcriptions for the call.
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback with the transcription list
	 * @return {Array.<TranscriptionResponse>} A promise for the transcription list
	 * @example
	 * // Promise
	 * client.Call.getTranscriptions(callId).then(function (list) {});
	 * // Callback
	 * client.Call.getTranscriptions(callId, function (err, list) {});
	 */
	this.getTranscriptions = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/transcriptions",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Send DTMF (phone keypad digit presses).
	 * @param {String} callId The ID of the call
	 * @param {String} dtmfOut String containing the DTMF characters to be sent
	 * in a call.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Call.sendDtmf(callId, "1").then(function () {});
	 * // Callback
	 * client.Call.sendDtmf(callId, "1", function (err) {});
	 */
	this.sendDtmf = function (callId, dtmfOut, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/dtmf",
			method : "POST",
			body   : { dtmfOut : dtmfOut }
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};
};

module.exports = Call;

/**
 * @class CallResponse
 * @type {Object}
 * @property {String} id The unique ID of the call.
 * @property {String} direction Call direction: values are 'in' for an incoming call, 'out' for an outgoing call
 * @property {String} from The phone number or SIP address that made the call.
 * Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com).
 * @property {String} to The phone number or SIP address that received the call.
 * Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com).
 * @property {String} state The call state. Described below, values are
 * 'started' 'rejected' 'active' 'completed' 'transferring'
 * @property {String} startTime Date when the call was created. Timestamp follows the ISO8601 format.
 * @property {String} activeTime Date when the call was answered. Timestamp follows the ISO8601 format.
 * @property {String} endTime Date when the call ended. Timestamp follows the ISO8601 format.
 * @property {Number} callTimeout Determine how long should the platform wait for
 * call answer before timing out in seconds
 * @property {String} callbackUrl The server URL where the call events related to the call will be sent.
 * @property {String} callbackHttpMethod Determine if the callback event should be sent via
 * HTTP GET or HTTP POST. Values are 'get' or 'post' Default is 'post'
 * @property {Number} callbackTimeout Determine how long should the platform wait for
 * callbackUrl's response before timing out (milliseconds).
 * @property {String} fallbackUrl The server URL used to send the call events if the request to callbackUrl fails.
 * @property {Number} chargeableDuration The number of seconds the call will be billed for.
 * @property {String} transferTo	Phone number or SIP address that the call is going to be transferred to.
 * @property {String} transferCallerId	This is the caller id that will be used when
 * the call is transferred. This parameter is only considered in transfer state.
 * @property {String} whisperAudio	Audio to be played to the caller that the call will be transferred to.
 * @property {String} bridgeId	The id of the bridge where the call will be added.
 * @property {String} bridge	The URL of the bridge, if any, that contains the call.
 * @property {String} conferenceId	The id of the conference where the call will be added.
 * This property is required if you want to add this call to a conference.
 * @property {String} conference	The complete URL of the conference resource the call is associated with.
 * @property {String} events The URL to retrieve the events related to the call.
 * @property {String} recordingEnabled=false	Indicates if the call should be recorded
 * after being created. Set to 'true' to enable. Default is 'false'
 * @property {String} recordingFileFormat=wav The file format of the recorded call.
 * Supported values are 'wav' (default) and 'mp3'.
 * @property {Number} recordingMaxDuration=3600	Indicates the maximum duration of
 * call recording in seconds. Default value is 1 hour.
 * @property {Boolean} transcriptionEnabled	Whether all the recordings for
 * this call should be be automatically transcribed.
 * tag Any string, it will be included in the callback events of the call.
 * @property {Number} page=0 Used for pagination to indicate the page requested for
 * querying a list of calls. If no value is specified the default is 0.
 * @property {Number} size=25 Used for pagination to indicate the size of each page requested
 * for querying a list of calls. If no value is specified the default value is 25 (maximum value 1000).
 * @property {Object} sipHeaders Map of Sip headers prefixed by "X-".
 * Up to 5 headers can be sent per call. Max length for header and value is 256 characters.
 */

/**
 * @class GatherResponse
 * @type {Object}
 * @property {String} id The unique ID of the gather.
 * @property {String} state The state of the gather.
 * @property {String} reason The reason of completing of the gather.
 * @property {String} createdTime Time of creation of the gather.
 * @property {String} completedTime TIme of completion of the gather.
 * @property {String} digits Gathered digits.
 */

/**
 * @class EventResponse
 * @type {Object}
 * @property {String} id The call event id.
 * @property {String} time The time the event occurred.
 * @property {String} name The name of the event.
 * @property {String} data Data about event.
 */

/**
 * @class RecordingResponse
 * @type {Object}
 * @property {String} id The recording id.
 * @property {String} startTime Date/time when the recording started.
 * @property {String} endTime Date/time when the recording ended.
 * @property {String} call The complete URL to the call resource this recording is associated with.
 * @property {String} media The complete URL to the media resource this recording is associated with.
 * @property {String} state The state of the recording
 */

/**
 * @class  TranscriptionResponse
 * @type {Object}
 * @property {String} id The transcription id.
 * @property {String} state The state of the transcription
 * @property {String} text The transcribed text (only first 1000 characters)
 * @property {String} time The date/time the transcription resource was created
 * @property {Number} chargeableDuration The seconds between activeTime and endTime for the recording;
 *  this is the time that is going to be used to charge the resource.
 * @property {Number} textSize The size of the transcribed text.
 * @property {String} textUrl An url to the full text
 */

var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var UnexpectedResponseError = require("./unexpectedResponseError");
var RateLimitError = require("./RateLimitError");
var packageInfo = require("./../package.json");

var apiVersionPath = "/v1";
var usersPath = "/users";

var Client = function (config) {
	// Apply default values if not provided
	if (!config.baseUrl) {
		config.baseUrl = "https://api.catapult.inetwork.com";
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
		//Added to allow the V1/V2 base url split
		//V1 endpoint functions remain unchanged, V2 inclues the new URL as 'apiBaseUrl' param
		var apiBaseUrl = params.apiBaseUrl ? params.apiBaseUrl : config.baseUrl;
		var baseUrl = apiBaseUrl + (params.apiVersion ? "/" + params.apiVersion : apiVersionPath);
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
			encoding           : params.encoding || params.encoding === null ? params.encoding : undefined
		};
	}

	this.makeRequest = function (params) {
		return request(createRequestOptions(params)).then(handleResponse);
	};

	this.createRequestOptions = createRequestOptions;

	this.handleResponse = handleResponse;

	this.getUserAgentHeader = getUserAgentHeader;
};

module.exports = Client;

/**
 * Conference
 * @constructor
 */
var Conference = function (client) {
	/**
	 * Create a new conference
	 * @param {Object} params Parameters for creating a conference
	 * @param {String} params.from The phone number that will host the conference.
	 * @param {String} [params.callbackUrl] The complete URL where the events related to the
	 * Conference will be sent to.
	 * @param {String} [params.callbackHttpMethod=post] Determine if the callback event should be sent
	 * via HTTP GET or HTTP POST.
	 * @param {String} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.fallbackUrl] Determine how long should the platform wait
	 * for callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.profile] Determines how DTMF is used. Values are:
	 *`interpret_digits`: the conference will handle DTMF with the default behavior, or `passthru_digits`:
	 * allows the application to receive DTMF events and use the `gather` API.
	 * @param {String} [params.tag] A string that will be included in the callback events
	 * of the conference.
	 * @param {Function} [callback] Callback with the newly created conference
	 * @return {ConferenceResponse} A promise for the newly created conference
	 * @example
	 * // Promise
	 * client.Conference.create({from: "+1234567890"}).then(function(conference){});
	 * // Callback
	 * client.Conference.create({from: "+1234567890"}, function(err, conference){});
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "conferences",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var conference = params;
			var location = response.headers.location;
			conference.id = location.substring(location.lastIndexOf("/") + 1);
			return conference;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about a conference.
	 * @param  {String} conferenceId The ID of the conference to get
	 * @param  {Function} [callback] A callback with the conference information
	 * @return {ConferenceResponse} A promise for the conference information
	 * @example
	 * // Promise
	 * client.Conference.get("conferenceId").then(function(conference){});
	 * // Callback
	 * client.Conference.get("conferenceId", function(err, conference){});
	 */
	this.get = function (conferenceId, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Update the conference
	 * @param  {String} conferenceId The ID of the conference
	 * @param {Object} params Changed parameters of the conference
	 * @param {String} [params.state] Conference state. Possible state values are:
	 * "completed" to terminate the conference.
	 * @param {String} [params.hold] If "true", all member can't hear or speak in the conference.
	 * If "false", all members can hear and speak in the conference (unless set at the member level).
	 * @param {String} [params.mute] If "true", all member can't speak in the conference.
	 * If "false", all members can speak in the conference (unless set at the member level).
	 * @param {String} [params.callbackUrl] The complete URL where the events related to the
	 * Conference will be sent to.
	 * @param {String} [params.callbackHttpMethod=post] Determine if the callback event should be sent
	 * via HTTP GET or HTTP POST.
	 * @param {String} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.fallbackUrl] Determine how long should the platform wait
	 * for callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.tag] A string that will be included in the callback events
	 * of the conference.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.update("conferenceID", {mute: "true"}).then(function(){});
	 * // Callback
	 * client.Conference.update("conferenceID", {mute: "true"}, function(err){});
	 */
	this.update = function (conferenceId, params, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Remove the conference
	 * @param  {String} conferenceId The ID of the conference
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.remove("conferenceID").then(function(){});
	 * // Callback
	 * client.Conference.remove("conferenceID", function(err){});
	 */
	this.remove = function (conferenceId, callback) {
		return this.update(conferenceId, { state : "completed" }, callback);
	};

	function audioApi (conferenceId, memberId, params, callback) {
		var path = "conferences/" + conferenceId;
		if (typeof memberId === "string") {
			path = path + "/members/" + memberId;
		}
		else {
			callback = params;
			params = memberId;
		}
		path += "/audio";
		return client.makeRequest({
			path   : path,
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	}

	/**
	 * Speak sentence to the conference using default values
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} sentence A sentence to speak to the conference.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence in a conference
	 *
	 * //Promise
	 * client.Conference.speakSentence("conferenceID", "Hello From Bandwidth").then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.speakSentence("conferenceID", "Hello From Bandwidth", function (err, res) {});
	 */
	this.speakSentence = function (conferenceId, sentence, callback) {
		return audioApi(conferenceId, { sentence : sentence }).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the conference
	 * @param  {String} conferenceId the Id of the conference to stop speaking
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Conference.stopSpeaking("conferenceId").then(function (res) {});
	*/
	this.stopSpeaking = function (conferenceId, callback) {
		return this.speakSentence(conferenceId, "").asCallback(callback);
	};

	/**
	 * Play audio url to the conference
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file on conference
	 *
	 * //Promise
	 * client.Conference.playAudioFile("conferenceID", "http://myurl.com/file.mp3").then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioFile("conferenceID", "http://myurl.com/file.wav", function (err, res) {});
	 */
	this.playAudioFile = function (conferenceId, fileUrl, callback) {
		return audioApi(conferenceId, { fileUrl : fileUrl }).asCallback(callback);
	};

	/**
	 * Play audio file or speak sentence in conference
	 * @param {String} conferenceId The ID of the conference
	 * @param {Object} params Parameters to play audio in conference.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence.
	 * for list of supported voices
	 * It will be considered only if sentence is not null/empty. Susan's voice will be used by default.
	 * @param {Boolean} [params.loopEnabled=false] When value is true, the audio will keep playing in a loop.
	 * Default: false.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio File on loop
	 * var options = {
	 * 	fileUrl     : "http://myurl.com/file.mp3",
	 * 	loopEnabled : true
	 * }
	 * //Promise
	 * client.Conference.playAudioAdvanced("conferenceId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Conference.playAudioAdvanced("conferenceId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
	 */
	this.playAudioAdvanced = function (conferenceId, params, callback) {
		return audioApi(conferenceId, params).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the conference
	 * @param  {String} conferenceId the Id of the conference to stop file playback
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Conference.stopAudioFilePlayback("conferenceId").then(function (res) {});
	*/
	this.stopAudioFilePlayback = function (conferenceId, callback) {
		return this.playAudioFile(conferenceId, "").asCallback(callback);
	};

	/**
	 * Gets information about a conference members.
	 * @param  {String} conferenceId The ID of the conference to get memebers
	 * @param  {Function} callback A callback with member list
	 * @return {Promise} A promise for member list
	 * @example
	 * // Promise
	 * client.Conference.getMembers("conferenceId").then(function(members){});
	 * // Callback
	 * client.Conference.getMembers("conferenceId", function(err, members){});
	 */
	this.getMembers = function (conferenceId, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about a single conference member.
	 * @param  {String} conferenceId The ID of the conference
	 * @param  {String} memberId The ID of the member
	 * @param  {Function} callback A callback with the member
	 * @return {Promise} A promise for the member
	 * @example
	 * // Promise
	 * client.Conference.getMember("conferenceId", "memberId").then(function(member){});
	 * // Callback
	 * client.Conference.getMember("conferenceId", "memberId", function(err, member){});
	 */
	this.getMember = function (conferenceId, memberId, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members/" + memberId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Add members to a conference.
	 * @param {Object} params Parameters for new member
	 * @param {String} params.callId The callId must refer to an active call that was created
	 * using this conferenceId.
	 * @param {String} [params.joinTone] If "true", will play a tone when the member joins the conference.
	 * If "false", no tone is played when the member joins the conference.
	 * @param {String} [params.leavingTone] If "true", will play a tone when the member leaves the conference.
	 * If "false", no tone is played when the member leaves the conference.
	 * @param {String} [params.mute] If "true", member can't speak in the conference. If "false",
	 * this members can speak in the conference (unless set at the conference level).
	 * @param {String} [params.hold] If "true", member can't hear or speak in the conference.
	 * If "false", member can hear and speak in the conference (unless set at the conference level).
	 * @param {Function} [callback] Callback with the added member
	 * @return {ConferenceResponse} A promise for the added member
	 * @example
	 * // Promise
	 * client.Conference.createMember("conferenceId", {callId: "callID"}).then(function(member){});
	 * // Callback
	 * client.Conference.createMember("conferenceId", {callId: "callID"}, function(err, member){});
	 */
	this.createMember = function (conferenceId, params, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var conference = params;
			var location = response.headers.location;
			conference.id = location.substring(location.lastIndexOf("/") + 1);
			return conference;
		})
		.asCallback(callback);
	};

	/**
	 * Update the conference member
	 * @param  {String} conferenceId The ID of the conference
	 * @param  {String} memberId The ID of the member
	 * @param {Object} params Changed parameters of the member
	 * @param {String} [params.joinTone] If "true", will play a tone when the member joins the conference.
	 * If "false", no tone is played when the member joins the conference.
	 * @param {String} [params.leavingTone] If "true", will play a tone when the member leaves the conference.
	 * If "false", no tone is played when the member leaves the conference.
	 * @param {String} [params.mute] If "true", member can't speak in the conference. If "false",
	 * this members can speak in the conference (unless set at the conference level).
	 * @param {String} [params.hold] If "true", member can't hear or speak in the conference.
	 * If "false", member can hear and speak in the conference (unless set at the conference level).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.updateMember("conferenceID", "memberId", {mute: "true"}).then(function(){});
	 * // Callback
	 * client.Conference.updateMember("conferenceID", "memberId", {mute: "true"}, function(err){});
	 */
	this.updateMember = function (conferenceId, memberId, params, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members/" + memberId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Remove the conference member
	 * @param  {String} conferenceId The ID of the conference
	 * @param  {String} memberId The ID of the member
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.removeMember("conferenceID", "memberId").then(function(){});
	 * // Callback
	 * client.Conference.removeMember("conferenceID", "memberId", function(err){});
	 */
	this.removeMember = function (conferenceId, memberId, callback) {
		return this.updateMember(conferenceId, memberId, { state : "completed" }, callback);
	};

	/**
	 * Speak sentence to the conference member using default values
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} memberId The ID of the member
	 * @param {String} sentence A sentence to speak to the member.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence
	 *
	 * //Promise
	 * client.Conference.speakSentenceToMember("conferenceID", "memberID", Hello From Bandwidth")
	 *   .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.speakSentenceToMember("conferenceID", "memberID", "Hello From Bandwidth",
	 *   function (err, res) {});
	 */
	this.speakSentenceToMember = function (conferenceId, memberId, sentence, callback) {
		return audioApi(conferenceId, memberId, { sentence : sentence }).asCallback(callback);
	};

	/**
	 * Play audio url to the conference member
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} memberId The ID of the member
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file
	 *
	 * //Promise
	 * client.Conference.playAudioFileToMember("conferenceID", "memberId", http://myurl.com/file.mp3")
	 *   .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioFileToMember("conferenceID", "memberId", http://myurl.com/file.wav",
	 *    function (err, res) {});
	 */
	this.playAudioFileToMember = function (conferenceId, memberId, fileUrl, callback) {
		return audioApi(conferenceId, memberId, { fileUrl : fileUrl }).asCallback(callback);
	};

	/**
	 * Play audio file or speak sentence to the conference member
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} memberId The ID of the member
	 * @param {Object} params Parameters to play audio.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence.
	 * It will be considered only if sentence is not null/empty. Susan's voice will be used by default.
	 * @param {Boolean} [params.loopEnabled=false] When value is true, the audio will keep playing in a loop.
	 * Default: false.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio File on loop
	 * var options = {
	 * 	fileUrl     : "http://myurl.com/file.mp3",
	 * 	loopEnabled : true
	 * }
	 * //Promise
	 * client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options)
	 *  .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options,
	 *   function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options)
	 *   .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
	 */
	this.playAudioAdvancedToMember = function (conferenceId, memberId, params, callback) {
		return audioApi(conferenceId, memberId, params).asCallback(callback);
	};
};

module.exports = Conference;

/**
 * @class ConferenceResponse
 * @type {Object}
 * @property {String} id The unique ID of the conference.
 * @property {String} state Conference state. Possible state values are described here.
 * @property {String} from The phone number that will host the conference.
 * @property {String} createdTime The time that the Conference was created (UTC).
 * @property {String} completedTime The time that the Conference was completed (UTC).
 * @property {Number} activeMembers The number of active conference members.
 * @property {String} hold If "true", all member can't hear or speak in the conference.
 * If "false", all members can hear and speak in the conference (unless set at the member level).
 * @property {String} mute If "true", all member can't speak in the conference.
 * If "false", all members can speak in the conference (unless set at the member level).
 * @property {String} callbackUrl The complete URL where the events related to the
 * Conference will be sent to.
 * @property {String} profile If "interpret_digits": the conference will handle DTMF with the default behavior
 * or if "passthru_digits": allows the application to receive DTMF events and use the `gather` API.
 * @property {String} callbackHttpMethod Determine if the callback event should be sent
 * via HTTP GET or HTTP POST.
 * @property {String} callbackTimeout Determine how long should the platform wait for
 * callbackUrl's response before timing out in milliseconds.
 * @property {String} fallbackUrl Determine how long should the platform wait
 * for callbackUrl's response before timing out in milliseconds.
 * @property {String} tag A string that will be included in the callback events
 * of the conference.
 */

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

var parse = require("parse-link-header");
var _ = require("lodash");

/**
 * getNextLink
 * @function
 * @param {Object} response A headers object returned from calling 'client.makeRequest' (response.headers)
 * @returns A parsed version of the link to the subsequent page, or null if no such page exists.
 */
var getNextLink = function (headers) {
	if (headers.link) {
		var parsedHeader = parse(headers.link);
		if (parsedHeader.next) {
			return _.omit(parsedHeader.next, [ "rel", "url" ]);
		}
	}
	return null;
};

module.exports.getNextLink = getNextLink;
var Client                  = require("./client");
var Account                 = require("./account");
var Message                 = require("./message");
var Call                    = require("./call");
var Conference              = require("./conference");
var Bridge                  = require("./bridge");
var Domain                  = require("./domain");
var Endpoint                = require("./endpoint");
var ErrorType               = require("./error");
var NumberInfo              = require("./numberInfo");
var Media                   = require("./media");
var Application             = require("./application");
var Recording               = require("./recording");
var AvailableNumber         = require("./availableNumber");
var PhoneNumber             = require("./phoneNumber");
var UnexpectedResponseError = require("./unexpectedResponseError");
var RateLimitError          = require("./RateLimitError");
var BXMLResponse            = require("./xml");
var MessageV2               = require("./v2/message");
var queries                 = require("./v2/searchAndOrderNumberQueries");

/**
 * Catapult API Client
 * @constructor
 * @param {Object} config - Client configuration parameters
 * @param {String} config.userId - Your Catapult user ID
 * @param {String} config.apiToken - Your Catapult API token
 * @param {String} config.apiSecret - Your Catapult API secret
 * @param {String} [config.baseUrl=https://api.catapult.inetwork.com] - The catapult base URL.
 * Configurable for using alternative Catapult environments.
 */
var CatapultClient = function (config) {
	var client           = new Client(config);
	this.Account         = new Account(client);
	this.Media           = new Media(client);
	this.Message         = new Message(client);
	this.Call            = new Call(client);
	this.Conference      = new Conference(client);
	this.Bridge          = new Bridge(client);
	this.Domain          = new Domain(client);
	this.Endpoint        = new Endpoint(client);
	this.Error           = new ErrorType(client);
	this.NumberInfo      = new NumberInfo(client);
	this.Recording       = new Recording(client);
	this.Application     = new Application(client);
	this.AvailableNumber = new AvailableNumber(client);
	this.PhoneNumber     = new PhoneNumber(client);
	this.v2 = {
		Message : new MessageV2(client)
	};
};

CatapultClient.UnexpectedResponseError = UnexpectedResponseError;
CatapultClient.RateLimitError          = RateLimitError;
CatapultClient.BXMLResponse            = BXMLResponse;

// Allow modules transformed from ES6 import/export to reference 
// this constructor as the default export.
CatapultClient.default = CatapultClient;

Object.keys(queries).forEach(function (type) {
	CatapultClient[type] = queries[type];
});

module.exports = CatapultClient;

var Promise = require("bluebird");
var stream = require("stream");
var fs = require("fs");
var request = require("request");

function getReadStreamData(data) {
	return new Promise(function (resolve, reject) {
		var s;
		if (data instanceof Buffer) {
			s = new stream.Readable();
			s.push(data);
			s.push(null);
			return resolve({ stream : s, size : data.length });
		}
		if (typeof data === "string") {
			return fs.stat(data, function (err, stat) {
				if (err) {
					return reject(err);
				}
				resolve({ stream : fs.createReadStream(data), size : stat.size });
			});
		}
		if (data instanceof stream.Readable) {
			// we have to detect stream size first
			var size = 0;
			s = new stream.Readable(); // new stream in memory to store data from original stream
			data.on("data", function (buffer) {
				s.push(buffer);
				size += buffer.length;
			});
			data.on("end", function () {
				s.push(null);
				resolve({ stream : s, size : size });
			});
			data.resume();
			return;
		}
		reject(new Error("data should be string, Buffer or readable stream"));
	});
}

/**
 * Media
 * @constructor
 */
var Media = function (client) {
	/**
	 * Upload a media file
	 * @param {String} name The name of uploaded file.
	 * @param {String|Buffer|Readable} data Data to upload. If data is string it should be path to file to upload.
	 * @param {String} contentType Optional MIME type of uploaded data (default: application/octet-stream).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 */
	this.upload = function (name, data, contentType, callback) {
		if (!callback && typeof contentType === "function") {
			callback = contentType;
			contentType = null;
		}
		return getReadStreamData(data)
			.then(function (streamData) {
				return new Promise(function (resolve, reject) {
					var req = request(
						client.createRequestOptions({
							path   : encodeURI("media/" + name),
							method :  "PUT"
						})
					);
					req.headers["Content-Type"] =
						contentType || "application/octet-stream";
					req.headers["Content-Length"] = streamData.size;
					req.on("error", reject);
					req.on("response", resolve);
					streamData.stream.pipe(req);
				});
			})
			.then(client.handleResponse)
			.asCallback(callback);
	};

	/**
	 * Download a media file
	 * @param {String} name The name of downloaded file.
	 * @param {String/null/Function} [encoding='binary'] The encoding that will be passed onto makeRequest,
		if null content will be a Buffer.  If function is passed, it will be the callback
	 * @param {Function} [callback] Callback for the operation
	 * @return {DownloadMediaFileResponse} A promise for the operation
	 */
	this.download = function (name, encoding, callback) {

		if(typeof encoding === "function") {
			callback = encoding;
			encoding = "binary";
		}

		return client.makeRequest({
			path     : encodeURI("media/" + name),
			method   : "GET",
			encoding : encoding
		})
		.then(function (response) {
			return {
				contentType : response.headers["content-type"],
				content     : response.body
			};
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of your media files.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Array<MediaFileResponse>} A promise for the operation
	 */
	this.list = function (callback) {
		return client
			.makeRequest({
				path   : "media",
				method : "GET"
			})
			.then(function (response) {
				return response.body;
			})
			.asCallback(callback);
	};

	/**
	 * Remove a media file
	 * @param {String} name The name of file to remove.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 */
	this.delete = function (name, callback) {
		return client
			.makeRequest({
				path   : encodeURI("media/" + name),
				method : "DELETE"
			})
			.asCallback(callback);
	};
};

module.exports = Media;
/**
 * @class DownloadMediaFileResponse
 * @type {Object}
 * @property {String} contentType MIME type of downloaded file.
 * @property {String|Buffer|Readable} content Content of file.
 */

/**
 * @class MediaFileResponse
 * @type {Object}
 * @property {String} mediaName name of media file.
 * @property {Number} contentLength Length of media file.
 */

var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * SMS or MMS Message
 * @constructor
 * @param {Object} client Catapult client
 */
var Message = function (client) {
	/**
	 * Send a new SMS or MMS message
	 * @param  {Object} params Parameters for sending a new message.
	 * @param  {String} params.text The message text to send
	 * @param  {String} params.from The message sender"s telephone number (or short code)
	 * This must be a Catapult number that you own
	 * @param  {String} [params.to] Message recipient telephone number (or short code)
	 * @param  {Array} [params.media] Json array containing list of media urls to be sent as content for an mms.
	 * Valid URLs are: https://api.catapult.inetwork.com/v1/users/<user-id>/media/
	 * We also support media URLs that are external to Bandwidth API, http:// or https:// format:
	 * Example: http://customer-web-site.com/file.jpg
	 * @param  {String} [params.callbackUrl] The complete URL where the events related to the
	 * outgoing message will be sent
	 * @param  {Number} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl"s response before timing out (milliseconds)
	 * @param  {String} [params.fallbackUrl] The server URL used to send message events
	 * if the request to callbackUrl fails
	 * @param  {String} [params.tag] A string that will be included in the callback events of the message
	 * @param  {String} [params.receiptRequested=none] Requested receipt option for outbound messages:
	 * `none` `all` `error`
	 * @param  {Function} [callback] A callback for the new message object
	 * @returns {MessageResponse} A promise for the new message object
	 * @example
	 * client.Message.send({
	 *   from : "+19195551212",
	 *   to   : "+19195551213",
	 *   text : "Thank you for susbcribing to Unicorn Enterprises!"
	 * })
	 * .then(function(message){
	 *   console.log(message);
	 * });
	 * //{
	 * //  from : "+19195551212",
	 * //  to   : "+19195551213",
	 * //  text : "Thank you for susbcribing to Unicorn Enterprises!",
	 * //  id   : "..."
	 * //}
	 */
	this.send = function (params, callback) {
		return client.makeRequest({
			path   : "messages",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var message = params;
			var location = response.headers.location;
			message.id = location.substring(location.lastIndexOf("/") + 1);
			return message;
		})
		.asCallback(callback);
	};
	/**
	 * Send multiple SMS or MMS messages with one API call.
	 * This is much more performant than calling `send` multiple times.
	 * @param  {Array} params An array of params objects, each of which
	 * represents a single text message. The returned array will be in
	 * the same order as this array, so you can iterate over it.
	 * @param {String} params.text The message text to send
	 * @param {String} params.from The message sender's telephone number (or short code)
	 * This must be a Catapult number that you own.
	 * @param  {String} params.to Message recipient telephone number (or short code)
	 * @param  {Array} [params.media] Json array containing list of media urls to be sent as content for an mms.
	 * Valid URLs are: https://api.catapult.inetwork.com/v1/users/<user-id>/media/
	 * We also support media URLs that are external to Bandwidth API, http:// or https:// format:
	 * Example: http://customer-web-site.com/file.jpg
	 * @param  {String} [params.callbackUrl] The complete URL where the events related to the
	 * outgoing message will be sent
	 * @param  {Number} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl's response before timing out (milliseconds)
	 * @param  {String} [params.fallbackUrl] The server URL used to send message events
	 * if the request to callbackUrl fails
	 * @param  {String} [params.tag] A string that will be included in the callback events of the message
	 * @param  {String} [params.receiptRequested=none] Requested receipt option for outbound messages:
	 * `none` `all` `error`
	 * @param  {Function} [callback] A callback for the array of ExtendedMessageResponse
	 * @returns {ExtendedMessageResponse} A promise for the array of ExtendedMessageResponses
	 * @example
	 * client.Message.sendMultiple({
	 *   from : "+19195551211",
	 *   to   : "+19195551213",
	 *   text : "Thank you for susbcribing to Unicorn Enterprises!"
	 * }, {
	 *   from : "+19195151212",
	 *   to   : "+19195551214",
	 *   text : "Thank you for susbcribing to Unicorn Enterprises!"
	 * })
     * .then(function(messages){
	 *   console.log(messages);
	 * });
	 * //[{
	 * //  result : "failed",
     * //  error: {
     * //    category : "authorization",
     * //    code     : "number-access-denied",
     * //    message  : "User ... does not have permission to use number +19195551211",
     * //    details  : [
     * //      {
     * //        name  : "userId",
     * //        value : "..."
     * //      },
     * //      {
     * //        name  : "number",
     * //        value : "+19195551211"
     * //      }
     * //    ],
     * //  },
     * //  message : {
	 * //    from : "+19195551211",
	 * //    to   : "+19195551213",
	 * //    text : "Thank you for susbcribing to Unicorn Enterprises!"
	 * //  }
	 * //},{
	 * //  result  : "accepted",
     * //  message : {
     * //    from : "+19195551212",
     * //    to   : "+19195551214",
     * //    text : "Thank you for susbcribing to Unicorn Enterprises!",
     * //    id   : "..."
     * //  }
     * //}]
	 */
	this.sendMultiple = function (array, callback) {
		return client.makeRequest({
			path   : "messages",
			method : "POST",
			body   : array
		})
		.then(function (response) {
			var messages = [];
			// using C-style loops to guarantee order
			for (var k = 0; k < array.length; k++) {
				var message = array[k];
				if (response.body[k].result === "accepted") {
					var location = response.body[k].location ;
					message.id = location.substring(location.lastIndexOf("/") + 1);
					messages.push({
						result  : "accepted",
						message : message
					});
				}
				else {
					messages.push({
						result  : "failed",
						error   : response.body[k].error,
						message : message
					});
				}
			}
			return messages;
		})
		.asCallback(callback);
	};

	/**
	 * Get a message
	 * @param  {String} messageId The ID of the message to get
	 * @param  {Function} [callback] A callback for the message
	 * @return {MessageResponse} A promise for the message
	 */
	this.get = function (messageId, callback) {
		return client.makeRequest({
			path   : "messages/" + messageId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Redact the text of a previously sent message
	 * @param  {String} messageId The ID of the message to patch
	 * @param  {Object} data data to patch (only text is supported now)
	 * @param  {Object} data.text the contents of the text must be the empty string (""). Any other value will fail.
	 * @param  {Function} [callback] A callback for the message
	 * @return {Promise} A promise for the message
	 */
	this.patch = function (messageId, data, callback) {
		return client.makeRequest({
			path   : "messages/" + messageId,
			method : "PATCH",
			body   : data
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of messages
	 * @param  {Object} params Search parameters
	 * @param  {String} [params.from] The phone number to filter the messages that
	 * came from (must be in E.164 format, like +19195551212).
	 * @param  {String} [params.to] The phone number to filter the messages that was
	 * sent to (must be in E.164 format, like +19195551212).
	 * @param  {String} [params.fromDateTime] The starting date time to filter the
	 * messages (must be in yyyy-MM-dd hh:mm:ss format, like 2014-05-25 12:00:00. You can suppress parts of
	 * the date or time, like 2014-05-25, but the missing parameters will be filled with zeros).
	 * @param  {String} [params.toDateTime] The ending date time to filter the messages
	 * (must be in yyyy-MM-dd hh:mm:ss format, like 2014-05-25 12:00:00. You can suppress parts of the date
	 * or time, like 2014-05-25, but the missing parameters will be filled with zeros)
	 * @param  {Number} [params.size] Used for pagination to indicate the size of each page requested \
	 * for querying a list of messages. If no value is specified the default value is 25. (Maximum value 1000)
	 * @param  {String} [params.direction] 	Filter by direction of message, in - a message that came from the
	 * telephone network to one of your numbers (an "inbound" message) or out - a message that was sent from
	 * one of your numbers to the telephone network (an "outbound" message)
	 * @param  {String} [params.state] The message state to filter. Values are: received, queued, sending, sent, error
	 * @param  {String} [params.deliveryState] The message delivery state to filter.
	 * Values are waiting, delivered, not-delivered
	 * @param  {String} [params.sortOrder] How to sort the messages. Values are asc or desc
	 * If no value is specified the default value is asc
	 * @param  {Function} [callback] A callback for the list of messages
	 * @return {MessageListResponse} A promise for the list of messages
	 * @example
	 * //Download the node sdk from ap.bandwidth.com/docs/helper-libraries/node-js
	 * //API credentials which can be found on your account page at https://catapult.inetwork.com/pages/login.jsf
	 * var userId = 'u-userid';  //{user_id}
	 * var token = 't-token'; //{token}
	 * var secret = 'secret'; //{secret}
	 *
	 * var Bandwidth = require('node-bandwidth');
	 *
	 * var client = new Bandwidth({
	 * 	userId: userId,
	 * 	apiToken: token,
	 * 	apiSecret: secret
	 * });
	 *
	 * client.Message.list()
	 * .then(function (response) {
	 * 	console.log(response.messages);
	 * 	if(response.hasNextPage) {
	 * 		return response.getNextPage();
	 * 	}
	 * 	else {
	 * 		return {messages: []};
	 * 	}
	 * })
	 * .then(function(response) {
	 * 	console.log(response.messages);
	 * });
	 */
	this.list = function (params, callback) {
		var self = this;
		if (!params) {
			params = {};
		}
		return client.makeRequest({
			path   : "messages",
			method : "GET",
			userId : params.userId,
			qs     : params
		})
		.then(function (response) {
			var messageListResponse = {
				messages    : response.body,
				nextLink    : {},
				hasNextPage : false,
				getNextPage : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				messageListResponse.hasNextPage = true;
				messageListResponse.nextLink = nextLink;
				messageListResponse.getNextPage = function (nextCallback) {
					return self.list(nextLink, nextCallback);
				};
			}
			return messageListResponse;
		})
		.asCallback(callback);
	};
};

module.exports = Message;

/**
 * @class MessageListResponse
 * @type {Object}
 * @property {Array.<MessageResponse>} messages Array of messages
 * @property {function} getNextPage Calls the next page function
 * @property {boolean} hasNextPage True/False flag for next
 * @property {Object} nextLink The values to attach to the next `get` request for messages.
 */

/**
 * @class ExtendedMessageResponse
 * @type Object
 * @property {String} result Either "accepted" or "failed".
 * @property {MessageResponse} The message. Will consist of the params
 * queried with, if the query failed, or the complete message response,
 * if the message was accepted.
 * @property {MessageError} Defined only if result is "failed".
 */

/**
 * @class MessageError
 * @type Object
 * @property {String} category The type of error (e.g. "authorization").
 * @property {String} code The exact error string provided by the API.
 * @property {String} message A human-readable error message.
 * @property {Object} details Additional details on the error.
 */

/**
 * @class MessageResponse
 * @type Object
 * @property {String} id The unique ID of the message.
 * @property {String} from The message sender's telephone number (or short code).
 * @property {String} to Message recipient telephone number (or short code).
 * @property {String} direction Direction of message, in - a message that came from
 * the telephone network to one of your numbers (an "inbound" message) or out - a message
 * that was sent from one of your numbers to the telephone network (an "outbound" message)
 * @property {String} text The message contents.
 * @property {Array} media Json array containing list of media urls to be sent as content for an mms.
 * @property {String} state Message state, values are received, queued, sending, sent, error
 * @property {String} time The time the message resource was created (UTC, follows the ISO 8601 format).
 * @property {String} callbackUrl The complete URL where the events related to the outgoing message will be sent.
 * @property {Number} callbackTimeout Determine how long should the platform wait for callbackUrl's response
 * before timing out. (milliseconds)
 * @property {String} fallbackUrl The server URL used to send message events if the request to callbackUrl fails.
 * @property {Number} size Used for pagination to indicate the size of each page requested for
 * querying a list of messages.
 * If no value is specified the default value is 25. (Maximum value 1000)
 * @property {String} tag A string that will be included in the callback events of the message.
 * @property {String} receiptRequested Requested receipt option for outbound messages: none, all, error
 * Default is none.
 * @property {String} deliveryState One of the message delivery states: waiting, delivered, not-delivered.
 * @property {Number} deliveryCode Numeric value of deliver code.
 * @property {String} deliveryDescription Message delivery description for the respective delivery code.
 */

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

/**
 * Retrieve information about call recordings
 * @constructor
 */
var Recording = function (client) {

	/**
	 * Get a recording
	 * @param  {String} recordingId The ID of the recording to retrieve
	 * @param  {Function} [callback] Callback with the recording object
	 * @return {RecordingResponse} A promise for the recording object
	 */
	this.get = function (recordingId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get a list of recordings
	 * @param  {Object} params [description]
	 * @param  {Function} [callback] Callback with the recording objects
	 * @return {RecordingResponse} A promise for the recording objects
	 */
	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "recordings",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Create a transcription
	 * @param  {String} recordingId The ID of the recording
	 * @param  {Function} [callback] Callback with the create transcription
	 * @return {TranscriptionResponse} A promise for the created transcription
	 * @example
	 *
	 * // Promise
	 * client.Recording.createTranscription(recordingId).then(function(transcription){});
	 *
	 * // Callback
	 * client.Recording.createTranscription(recordingId, function(err, transcription){});
	 */
	this.createTranscription = function (recordingId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId + "/transcriptions",
			method : "POST",
			body   : {}
		})
		.then(function (response) {
			var location = response.headers.location;
			return { id : location.substring(location.lastIndexOf("/") + 1) };
		})
		.asCallback(callback);
	};

	/**
	 * Get information about the transcription
	 * @param  {String} recordingId The ID of the recording
	 * @param  {String} transcriptionId The ID of the transcription
	 * @param  {Function} [callback] Callback with the  transcription
	 * @return {TranscriptionResponse} A promise for the transcription
	 * @example
	 *
	 * // Promise
	 * client.Recording.getTranscription(recordingId, transcriptionId).then(function(transcription){});
	 *
	 * // Callback
	 * client.Recording.getTranscription(recordingId, transcriptionId, function(err, transcription){});
	 */
	this.getTranscription = function (recordingId, transcriptionId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId + "/transcriptions/" + transcriptionId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get list of all transcriptions for recording
	 * @param  {String} recordingId The ID of the recording
	 * @param  {Function} [callback] Callback with the  transcriptions
	 * @return {TranscriptionResponse} A promise for the transcriptions
	 * @example
	 *
	 * // Promise
	 * client.Recording.getTranscriptions(recordingId).then(function(transcriptions){});
	 *
	 * // Callback
	 * client.Recording.getTranscriptions(recordingId, function(err, transcriptions){});
	 */
	this.getTranscriptions = function (recordingId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId + "/transcriptions",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Recording;
/**
 * @class RecordingResponse
 * @type {Object}
 * @property {String} id The unique ID of the recording.
 * @property {String} startTime Date/time when the recording started.
 * @property {String} endTime Date/time when the recording ended.
 * @property {String} media The complete URL to the media resource this
 * recording is associated with.
 * @property {String} call The complete URL to the call resource
 * this recording is associated with.
 * @property {String} state The state of the recording,
 */
/**
 * @class TranscriptionResponse
 * @type {Object}
 * @property {String} id The unique ID of the transcription.
 * @property {String} text The transcribed text (only first 1000 characters).
 * @property {Number} chargeableDuration The seconds between activeTime and endTime
 * for the recording; this is the time that is going to be used to charge the resource.
 * @property {Number} textSize The size of the transcribed text.
 * @property {String} state The state of the transcription,
 * @property {String} textUrl A url to the full text,
 */

var util = require("util");

var UnexpectedResponseError = function (message, statusCode) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.statusCode = statusCode;
};

util.inherits(UnexpectedResponseError, Error);

module.exports = UnexpectedResponseError;

var builder = require("xmlbuilder");

function obsolete(method) {
	console.warn(method + "() is obsolete and will be remove in next release");
}

/**
 * Creates a new BXML Response object.
 * Call .toString() on this method to obtain the BXML string.
 * @constructor
 */

var BXMLResponse = function () {
	this.xml = builder.create("Response", {
		encoding : "UTF-8"
	});
	/**
	 * Create a SpeakSentence tag.
	 * @param {string} sentence The sentence to have the voice say.
	 * @param {Object} params The parameters for the API SpeakSentence call.
	 * @param {string} [params.gender="female"] The gender of the speaker.
	 * @param {string} [params.locale="en_US"] The locale for the speaker.
	 * @param {string} [params.voice="julie"] The voice for the speaker.
	 * @return {BXMLResponse} this, for chaining
	 * @example
	 * //This app will speak two sentences.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("Someone will be with you shortly.");
	 * myApp = myApp.toString();
	 */

	this.speakSentence = function (sentence, params) {
		params = params || { };
		params.locale = params.locale || "en_US";
		params.gender = params.gender || "female";
		params.voice = params.voice || "julie";
		this.xml = this.xml.ele("SpeakSentence", params, sentence).up();
		return this;
	};

	/**
	 * Create a Gather call, which collects pressed numbers.
	 * @param {Object} params The parameters for the Gather verb.
	 * @param {string} params.requestURL Relative or absolute URL to send events to and request new BXML.
	 * @param {number} [params.requestURLTimeout=3000] Time to wait for requestURL response in ms.
	 * @param {string} [params.terminatingDigits=#] Digits to stop gather.
	 * @param {number} [params.maxDigits=128] Maximum number of digits to collect.
	 * @param {number} [params.integerDigitTimeout=5] Timeout between digits.
	 * @param {boolean} [params.bargeable=true] Boolean indicating if audio should stop when digit is pressed.
	 * @param {function} [callback] A function containing the verbs to be nested inside the Gather call.
	 * @return {BXMLResponse} this, for chaining
	 * @example
	 * //This app will collect a PIN code.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.gather({
	 *     requestUrl : 'http://unico.rn/pinApiEndpoint',
	 *     maxDigits  : 4
	 * }, function () {
	 *     this.speakSentence("Please enter your PIN code.")
	 * });
	 * myApp = myApp.toString();
	 */
	this.gather = function (params, callback) {
		this.xml = this.xml.ele("Gather", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};

	/**
	 * @return {string} A string representation of the object's BXML.
	 */
	this.toString = function () {
		return this.xml.end({
			pretty : true,
			indent : "     "
		}).toString();
	};

	/**
	 * OBSOLETE: Create a new call to another phone number.
	 * @param {Object} params The parameters for the Call verb.
	 * @param {string} params.from Defines the number the call will be created from.
	 * @param {string} params.to Defines the number the call will be made to.
	 * @param {string} [params.requestUrl] URL to send event
	 * @param {number} [params.timeout] The timeout, in seconds, for the call to answer
	 * @param {number} [params.requestUrlTimeout] Timeout, in ms, to request new BXML document
	 * @param {function} [callback] A function containing the verbs to be nested inside the Call verb
	 * @return {BXMLResponse} this, for chaining
	 * @example
	 * //This app will create a call and tell the callee they are being called.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.call({
	 *      from : '+19195551212',
	 *      to   : '+19195551213'
	 * }, function () {
	 *      this.speakSentence("You are recieving a call from 919 555 1212.");
	 * });
	 * myApp = myApp.toString();
	 */
	this.call = function (params, callback) {
		obsolete("call");
		this.xml = this.xml.ele("Call", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};

	/**
	 * OBSOLETE: Create a new conference call.
	 * @param {Object} params The parameters for the Conference verb.
	 * @param {string} params.from The phone number that will host the conference.
	 * @param {string} [params.statusCallbackUrl] URL to which conference callbacks will be POSTed
	 * @param {boolean} [params.joinTone=true] Determines whether or not a tone is played on join.
	 * @param {boolean} [params.leavingTone=true] Determines whether or not a tone is played on leave.
	 * @param {string} [params.tag] A string that will be included in the callback events of the conference.
	 * @param {boolean} [params.mute=false] Determines whether or not the member will join muted.
	 * @param {boolean} [params.hold=false] Determines whether or not the member will join on hold.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * //This app will create a conference call. Callers to (919) 555 1212 will be patched in.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.conference({
	 *     from : '+19195551212'
	 * });
	 * myApp = myApp.toString();
	 */

	this.conference = function (params) {
		obsolete("call");
		params.joinTone = params.joinTone || true;
		params.leavingTone = params.leavingTone || true;
		this.xml = this.xml.ele("Conference", params).up();
		return this;
	};

	/**
	 * Terminates an outgoing call.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * //This app will speak two sentences and hang up.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("We have been acquired by BigCorp.")
	 *      .hangup();
	 * myApp = myApp.toString();
	 */

	this.hangup = function () {
		this.xml = this.xml.ele("Hangup").up();
		return this;
	};

	/**
	 * Plays an audio file located at a specified URL.
	 * @param {string} audio The URL of the audio to be played.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("All agents are currently busy playing ping-pong. Please hold.")
	 *      .playAudio("http://unico.rn/assets/postglamspeedfolk.mp3");
	 * myApp = myApp.toString();
	 */

	this.playAudio = function (audio) {
		this.xml = this.xml.ele("PlayAudio", {}, audio).up();
		return this;
	};
	/**
	 * Records the call. At end of call, a call recording event is sent to the callback URL.
	 * @param {Object} params The parameters for the Record verb.
	 * @param {string} [params.requestUrl] URL to send event and request new BXML.
	 * @param {number} [params.requestUrlTimeout] Timeout, in ms, to wait for requestUrl response.
	 * @param {string} [params.fileFormat] The format in which to save the recording - mp3 or wav.
	 * @param {string} [params.terminatingDigits] OBSOLETE: One or more digits that will finish the recording.
	 * @param {number} [params.maxDuration=300] OBSOLETE: Time, in seconds, for max duration. Up to 3600 sec (1hr)
	 * @param {boolean} [params.transcribe=false] Boolean to indicate transcription of the recording.
	 * @param {string} [params.transcribeCallbackUrl] URL to send transcribed event.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * //This app will record a message.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("Your call may be recorded for quality assurance.")
	 *      .record({
	 *            requestUrl : "http://unico.rn/recordsGetPutHere",
	 *            fileFormat : "mp3"
	 *		});
	 */

	this.record = function (params) {
		this.xml = this.xml.ele("Record", params).up();
		return this;
	};

	/**
	 * Redirects the current execution to run XML at another URL.
	 * @param {Object} params The parameters for the Redirect verb.
	 * @param {string} params.requestUrl The URL to send event to and request new BXML.
	 * @param {number} params.requestUrlTimeout Timeout, in ms, to wait for requestUrl to respond.
	 * @return {BXMLResponse} this, for chaining.
	 */

	this.redirect = function (params) {
		this.xml = this.xml.ele("Redirect", params).up();
		return this;
	};
	/**
	 * OBSOLETE: Sends a text message.
	 * @param {string} message The message to send.
	 * @param {Object} params The parameters for the SendMessage verb
	 * @param {string} params.from The number to send the message from.
	 * @param {string} params.to The number to send the message to.
	 * @param {string} [params.requestUrl] The URL to send events to and request new BXML from.
	 * @param {number} [params.requestUrlTimeout=30] Timeout, in seconds, to wait for requestUrl to respond.
	 * @param {string} [params.statusCallbackUrl] URL to send the message callback to.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * // This app will text a customer.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.sendMessage("Get $20 off your next purchase!", {
	 * 		from : "+19195551212",
	 *		to   : "+19195551213"
	 * });
	 */
	this.sendMessage = function (message, params) {
		obsolete("sendMessage");
		this.xml = this.xml.ele("SendMessage", params, message).up();
		return this;
	};

	/**
	 * Used to direct call flow for multiple transfer
	 * @param  {String} phoneNumber The phone number to try for a transfer
	 * @return {BXMLResponse} this, for chaining.
	 */
	this.phoneNumber = function (phoneNumber) {
		this.xml = this.xml.ele("PhoneNumber", phoneNumber).up();
		return this;
	};

	/**
	 * Transfers the call to another number.
	 * @param {Object} params The parameters for the Transfer verb.
	 * @param {string} params.transferTo The number to transfer the call to.
	 * @param {string} [params.transferCallerId] The caller ID to use on the transferred call.
	 * @param {number} [params.callTimeout] The timeout, in seconds, for the call to be answered.
	 * @param {string} [params.requestUrl] URL to send event to and request new BXML from.
	 * @param {number} [params.requestUrlTimeout] Timeout, in msec, to wait for requestUrl to respond.
	 * @param {string} [params.tag] A string that will be included in the callback events.
	 * @param {function} callback The verbs to nest inside the Transfer verb.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * // This app will transfer a call.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Your call is somewhat important to us.")
	 *		.speakSentence("Please wait while it is being transferred.")
	 *		.transfer({
	 * 			transferTo: "+19195551213"
	 *		}, function (){
	 * 			this.speakSentence("A call is being transferred to you from Customer Service.");
	 *		});
	 * @example
	 * // Multiple transfer with speak senetence - Try 3 numbers
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Your call is somewhat important to us.")
	 * 	.speakSentence("Please wait while it is being transferred.")
	 * 	.transfer({}, function (){
	 * 		this.phoneNumber("+13334445555");
	 * 		this.phoneNumber("+13334445556");
	 * 		this.phoneNumber("+13334445557");
	 * 		this.speakSentence("A call is being transferred to you from Customer Service.");
	 * 	});
console.log(myApp.toString());
	 */
	this.transfer = function (params, callback) {
		this.xml = this.xml.ele("Transfer", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};

	/**
	 *  Pause the execution of an ongoing BXML document
	 * @param {Object} params The parameters for the Pause verb.
	 * @param {string} params.length How many seconds Bandwidth will wait silently before continuing on.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * // This app will transfer a call.
	 * var Bandwidth = require("node-bandwidth");
	 * var r = new Bandwidth.BXMLResponse();
	 * r.pause({length: 5})
	 * console.log(r.toString());
	 */
	this.pause = function (params) {
		this.xml = this.xml.ele("Pause", params).up();
		return this;
	};

	/**
	 *  Send digits on a live call
	 * @param {string} value string containing the DTMF characters to be sent in a call (maximum of 92 characters)
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * // This app will transfer a call.
	 * var Bandwidth = require("node-bandwidth");
	 * var r = new Bandwidth.BXMLResponse();
	 * r.dtmf('1');
	 * console.log(r.toString());
	 */
	this.sendDtmf = function (value) {
		this.xml = this.xml.ele("SendDtmf", {}, value).up();
		return this;
	};
};

module.exports = BXMLResponse;
