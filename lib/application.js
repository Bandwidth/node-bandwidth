var Client = require("./client");
var APPLICATION_PATH = "applications";

function Application() {
	//compabtibility fix
	if (arguments.length > 0) {
		this.name = arguments[0];
		this.incomingCallUrl = arguments[1];
		this.incomingSmsUrl = arguments[2];
		this.script = arguments[3];
	}
}

/**
 * Get information about an application
 * @param client optional Client instance
 * @param id id of Application*
 * @param callback callback function
 * @example
 * bandwidth.Application.get(client, "id", function(err, app){...});
 */

Application.get = function (client, id, callback) {
	if (arguments.length === 2) {
		callback = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(APPLICATION_PATH) + "/" +  id, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = Application.prototype;
		callback(null, item);
	});
};

/**
 * Get a list of your applications
 * @param client Client instance
 * @param query query parameters
 * @param callback callback function
 * @example
 * bandwidth.application.list(client, function(err, apps){...});
 */
Application.list = function (client, query, callback) {

	if (arguments.length === 1) {
		callback = client;
		client = new Client();
		query = {};
	}

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

	client.makeRequest("get", client.concatUserPath(APPLICATION_PATH), query, function (err, items) {
		if (err) {
			return callback(err);
		}
		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		var result = itemsIsEmpty ? [] : items.map(function (item) {
			item.client = client;
			item.__proto__ = Application.prototype;
			return item;
		});

		callback(null, result);
	});
};

/**
 * Create an application
 * @param client Client instance
 * @param item data to create application
 * @param callback callback function
 * @example
 * bandwidth.Application.create(client, {name: "test", incomingCallUrl: "url"}, function(err, app){});
 */
Application.create = function (client, item, callback) {
	if (arguments.length === 2) {
		callback = item;
		item = client;
		client = new Client();
	}

	var request = client.createRequest("post", client.concatUserPath(APPLICATION_PATH));
	request.type("json").send(item).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				Application.get(client, id, callback);
			});
		}
		else {
			client.checkResponse(res, callback);
		}
	});
};

/**
 * Make changes to an application
 * @param data changed data
 * @param callback callback function
 * @example
 * app.update({callbackUrl: "http://host1", function(err){...});
 */
Application.prototype.update = function (data, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(APPLICATION_PATH) + "/" + this.id,  data, callback);

};

/**
 * Delete an application
 * @example
 * app.delete(function(err){...});
 */
Application.prototype.delete = function (callback) {
	this.client.makeRequest("del", this.client.concatUserPath(APPLICATION_PATH) + "/" + this.id,  callback);
};

module.exports = Application;
