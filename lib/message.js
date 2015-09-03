var Client = require("./client");
var MESSAGE_PATH = "messages";

function Message() {
	//compabtibility fix
	if (arguments.length > 0) {
		this.from = arguments[0];
		this.to = arguments[1];
		this.text = arguments[2];
	}
}

/**
 * Get information about a message that was sent or received
 * @param client Client instance
 * @param id id of Message
 * @param callback callback
 * @example
 * bandwidth.Message.get(client, "id", function(err, message){});
 */
Message.get = function (client, id, callback) {
	if (arguments.length === 2) {
		callback = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(MESSAGE_PATH) + "/" +  id, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = Message.prototype;
		callback(null, item);
	});
};

/**
 * Get a list of previous messages that were sent or received
 * @param client Client instance
 * @param query query parameters
 * @param callback callback function
 * @example
 * bandwidth.Message.list(client, function(err, list){});
 */
Message.list = function (client, query, callback) {
	if (arguments.length === 2) {
		callback = query;
		if (client instanceof Client) {
			query = {};
		}
		else {
			query = client;
			client = new Client();
		}
	}
	else if (arguments.length === 1) {
		callback = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(MESSAGE_PATH), query, function (err, items) {
		if (err) {
			return callback(err);
		}

		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		var result = itemsIsEmpty ? [] : items.map(function (item) {
			item.client = client;
			item.__proto__ = Message.prototype;
			return item;
		});

		callback(null, result);
	});
};

/**
 * Send text messages
 * @param client Client instance
 * @param item message (or list of messages) to send
 * @param callback callback function
 * @example
 * bandwidth.Message.create(client, {from: "", to: "", text: ""}, function(err, message){});
 * bandwidth.Message.create(client, [{from: "", to: "", text: ""}], function(err, statuses){});
 */
Message.create = function (client, item, callback) {
	if (arguments.length === 2) {
		callback = item;
		item = client;
		client = new Client();
	}

	var isList = Array.isArray(item);
	var request = client.createRequest("post", client.concatUserPath(MESSAGE_PATH));
	request.type("json").send(item).end(function (res) {
		if (res.ok) {
			if (isList) {
				var statuses = ((Object.keys(res.body).length === 0 ? null : res.body) || []).map(function (i) {
					if (i.result === "error") {
						return { error : new Error(i.error.message) };
					}

					var index = (i.location || "").lastIndexOf("/");
					if (index < 0) {
						return { error : new Error("Missing id in response") };
					}

					return { id : i.location.substr(index + 1) };
				});

				callback(null, statuses);
			}
			else {
				Client.getIdFromLocationHeader(res.headers.location || "", function (err, id) {
					if (err) {
						return callback(err);
					}

					Message.get(client, id, callback);
				});
			}
		}
		else {
			client.checkResponse(res, callback);
		}
	});
};

module.exports = Message;
