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
	 * @param  {params.from} The message sender's telephone number (or short code)
	 * This must be a Catapult number that you own
	 * @param  {String} [params.to] Message recipient telephone number (or short code)
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

	// TODO: document param types
	/**
	 * Gets a list of messages
	 * @param  {Object} params Search parameters
	 * @param  {Function} [callback] A callback for the list of messages
	 * @return {Array} A promise for the list of messages
	 */
	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "messages",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Message;

// TODO: Document MessageResponse object
