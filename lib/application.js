/**
 * Application
 * @constructor
 * @param {Object} client Catapult client
 */

var Application = function (client) {
	/**
	 * List the user's applications
	 * @param {Object} params Parameters for filtering applications
	 * @param {Number} [params.page] The specified page requested when querying
	 * a list of applications
	 * @param {Number} [params.size] The size of each page requested
	 * @param {Function} [callback] A callback for the list of applications
	 * @return {MessageResponse} A promise for the list of applications
	 */
	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "applications",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response.body;
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