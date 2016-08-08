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