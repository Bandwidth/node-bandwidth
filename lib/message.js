/**
 * SMS or MMS Message
 * @constructor
 * @param {Object} client Catapult client
 */
var Message = function (client) {
	// TODO: Handle response from sending multiple messages
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
