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
		return client.makeRequest({
			path   : "messages",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var messageListResponse = {
				messages    : response.body,
				hasNextPage : false,
				getNextPage : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				messageListResponse.hasNextPage = true;
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
