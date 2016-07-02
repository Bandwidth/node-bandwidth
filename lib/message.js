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
	 * @param  {Object} params Parameters for sending a new message
	 * @param  {params.text} The message text to send
	 * @param  {params.from} The message sender"s telephone number (or short code)
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
	 * @return {MessageResponse} A promise for the new message object
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
			var messageId = location.substring(location.lastIndexOf("/") + 1);
			message.id = messageId;
			return message;
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
	 * @return {Array} A promise for the list of messages
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