var Message = function (client, params) {

	if (params) {
		var self = this;
		Object.keys(params).forEach(function (field) {
			self[field] = params[field];
		});
	}

	if (!this.id) {
		this.send = function () {
			Message.sendMessage(client, params);
		};
	}
};

// TODO: Handle response from sending multiple messages
Message.sendMessage = function (client, params, callback) {
	return client.makeRequest({
		path   : "messages",
		method : "POST",
		body   : params
	})
	.then(function (response) {
		var message = new Message(client, params);
		var location = response[0].headers.location;
		var messageId = location.substring(location.lastIndexOf("/") + 1);
		message.id = messageId;
		return message;
	})
	.nodeify(callback);
};

Message.getMessage = function (client, messageId, callback) {
	return client.makeRequest({
		path   : "messages/" + messageId,
		method : "GET"
	})
	.then(function (response) {
		return new Message(client, response[0].body);
	})
	.nodeify(callback);
};

Message.getMessages = function (client, params, callback) {
	return client.makeRequest({
		path   : "messages",
		method : "GET",
		qs     : params
	})
	.then(function (response) {
		var messages = [];
		response[0].body.forEach(function (messageParams) {
			var message = new Message(client, messageParams);
			messages.push(message);
		});
		return messages;
	})
	.nodeify(callback);
};

module.exports = Message;
