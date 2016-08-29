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
