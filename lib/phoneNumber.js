var Client = require("./client");
var PHONE_NUMBER_PATH = "phoneNumbers";

function PhoneNumber() {
	//for compatibility only
	if (arguments.length > 0) {
		this.number = arguments[0];
		this.name = arguments[1];
		this.applicationId = arguments[2];
	}
}

/**
 * Get information about one number
 * @param client Client instance
 * @param id Id of phone number
 * @param callback callback function
 * @example
 * bandwidth.PhoneNumber.get(client, "id", function(err, number){});
 */
PhoneNumber.get = function (client, id, callback) {
	if (arguments.length === 2) {
		callback = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(PHONE_NUMBER_PATH) + "/" +  id, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = PhoneNumber.prototype;
		callback(null, item);
	});
};

/**
 * Get a list of your numbers
 * @param client Client instance
 * @param query query parameters
 * @param callback callback function
 * @example
 * bandwidth.PhoneNumber.list(client, function(err, list){});
 */
PhoneNumber.list = function (client, query, callback) {
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

	client.makeRequest("get", client.concatUserPath(PHONE_NUMBER_PATH), query, function (err, items) {
		if (err) {
			return callback(err);
		}

		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		var result = itemsIsEmpty ? [] : items.map(function (item) {
			item.client = client;
			item.__proto__ = PhoneNumber.prototype;
			return item;
		});

		callback(null, result);
	});
};

/**
 * Allocate a number so you can use it
 * @param client Client instance
 * @param item data to create phone number
 * @param callback callback function
 * @example
 * bandwidth.PhoneNumber.create(client, {number: "number"}, function(err, number){});
 */
PhoneNumber.create = function (client, item, callback) {
	if (arguments.length === 2) {
		callback = item;
		item = client;
		client = new Client();
	}

	var request = client.createRequest("post", client.concatUserPath(PHONE_NUMBER_PATH));
	request.type("json").send(item).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				PhoneNumber.get(client, id, callback);
			});
		}
		else {
			client.checkResponse(res, callback);
		}
	});
};

/**
 * Make changes to a number you have
 * @param data changed data
 * @param callback callback
 * @example
 * number.update({name: "new name"}, function(err){});
 */
PhoneNumber.prototype.update = function (data, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(PHONE_NUMBER_PATH) + "/" + this.id,  data, callback);
};

/**
 * Remove a number from your account
 * @example
 * number.delete(function(err){});
 */
PhoneNumber.prototype.delete = function (callback) {
	this.client.makeRequest("del", this.client.concatUserPath(PHONE_NUMBER_PATH) + "/" + this.id, callback);
};

module.exports = PhoneNumber;
