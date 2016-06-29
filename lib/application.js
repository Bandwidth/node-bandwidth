var url = require("url");
var qs = require("qs");

/**
 * Application
 * @constructor
 * @param {Object} client Catapult client
 */

var Application = function (client) {
	/**
	 * List the user's applications
	 * @param {Object} params Parameters for filtering applications
	 * @param {Number} [params.size] The size of each page requested (Max size: 1000)
	 * @param {Function} [callback] A callback for the list of applications
	 * @return {MessageResponse} A promise for the list of applications
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
				applications : response.body
			};
			var links = response.headers.link.split(",");
			var nextLink = links[1];
			if (nextLink) {
				var linkRegex = /<(.*)>/;
				var link = linkRegex.exec(nextLink)[1];
				var parsedUrl = url.parse(link);
				var queryString = qs.parse(parsedUrl.query);
				applicationListResponse.hasMore = true;
				applicationListResponse.getNextPage = function (nextCallback) {
					return self.list(queryString, nextCallback);
				};
			}
			return applicationListResponse;
		})
		.asCallback(callback);
	};

	/**
	 * Create a new application
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
	 * @param {String} callbackHttpMethod Determine if the callback event should be sent via HTTP GET
 	 * or HTTP POST. Values are "get" or "post", default: "post".
 	 * @param {Function} [callback] A callback for the list of applications
 	 * @property {Boolean} autoAnswer Determines whether or not an incoming call should be
 	 * automatically answered. Default value is 'true'.
	 * @return {Application} A promise for the newly created application.
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
	 * @return {MessageResponse} A promise for the application.
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
	 * @param  {String} applicationId The ID of the application to modify.
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
	 * @param {String} callbackHttpMethod Determine if the callback event should be sent via HTTP GET
 	 * or HTTP POST. Values are "get" or "post", default: "post".
 	 * @param {Function} [callback] A callback for the list of applications
 	 * @property {Boolean} autoAnswer Determines whether or not an incoming call should be
 	 * automatically answered. Default value is 'true'.
	 * @return {Application} A promise for the modified application.
	 */
	this.update = function (applicationId, params, callback) {
		return client.makeRequest({
			path   : "applications/" + applicationId,
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Delete an application.
	 * @param  {String} applicationId The ID of the application to delete.
	 * @param  {Function} [callback] A callback for the application.
	 * @return {MessageResponse} A promise for the application.
	 */
	this.delete = function (applicationId, callback) {
		return client.makeRequest({
			path   : "applications/" + applicationId,
			method : "DELETE"
		})
		.then(function (response) {
			return;
		})
		.asCallback(callback);
	};

};

module.exports = Application;

/**
 * @class Application
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