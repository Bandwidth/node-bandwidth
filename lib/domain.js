var Client = require("./client");
var EndPoint = require("./endPoint");
var DOMAIN_PATH = "domains";

function Domain() {
}

/**
 * Retrieve created domains.
 * @param client Client instance
 * @param callback callback function
 * @example
 * bandwidth.Domain.list(client, function(err, domains){});
 */
Domain.list = function (client, callback) {
	if (arguments.length === 1) {
		callback = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(DOMAIN_PATH), function (err, items) {
		if (err) {
			return callback(err);
		}

		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		if (itemsIsEmpty) {
			items = [];
		}
		items.forEach(function (item) {
			item.client = client;
			item.__proto__ = Domain.prototype;
		});

		callback(null, items);
	});
};

/**
 * Create a domain.
 * @param client Client instance
 * @param item domain"s data
 * @param callback callback function
 * @example
 * bandwidth.Domain.create(client, {name: "domain1"}, function(err, domain){});
 */
Domain.create = function (client, item, callback) {
	if (arguments.length === 2) {
		callback = item;
		item = client;
		client = new Client();
	}

	var request = client.createRequest("post", client.concatUserPath(DOMAIN_PATH));
	request.type("json").send(item).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				var domain = new Domain();
				domain.id = id;
				domain.client = client;
				domain.name = item.name;
				domain.description = item.description;
				callback(null, domain);
			});
		}
		else {
			client.checkResponse(res, callback);
		}
	});
};

/**
 * Retrieve created domain by id.
 * @param client Client instance
 * @param id domain id
 * @param callback callback function
 * @example
 * bandwidth.Domain.get(client, id, function(err, domain){});
 */
Domain.get = function (client, id, callback) {
	if (arguments.length === 2) {
		callback = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(DOMAIN_PATH) + "/" +  id, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = Domain.prototype;
		callback(null, item);
	});
};

/**
 * Delete a domain.
 * @param callback callback
 * @example
 * domain.delete(function(err){});
 */
Domain.prototype.delete = function (callback) {
	this.client.makeRequest("del", this.client.concatUserPath(DOMAIN_PATH) + "/" + this.id,  callback);
};

/**
 * List endpoints of a domain.
 * @example
 * domain.getEndPoints(function(err, list){});
 */
Domain.prototype.getEndPoints = function (callback) {
	var client = this.client;
	var id = this.id;
	client.makeRequest("get", client.concatUserPath(DOMAIN_PATH) + "/" + id + "/endpoints", function (err, items) {
		if (err) {
			return callback(err);
		}

		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		var result = itemsIsEmpty ? [] : items.map(function (item) {
			item.client = client;
			item.__proto__ = EndPoint.prototype;
			item.domainId = id;
			return item;
		});

		callback(null, result);
	});
};

/**
 * Retrieve information about a particular endpoint of a domain.
 * @param endpointId Id of endpoint
 * @param callback callback function
 * @example
 * domain.getEndPoint("1", function(err, point){});
 */
Domain.prototype.getEndPoint = function (endpointId, callback) {
	var client = this.client;

	var id = this.id;
	client.makeRequest("get", client.concatUserPath(DOMAIN_PATH) + "/" + id + "/endpoints/" +
		endpointId, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = EndPoint.prototype;
		item.domainId = id;
		callback(null, item);
	});
};

/**
 * Add a endpoint to a domain.
 * @param item data to add endpoint to this domain
 * @param callback callback
 * @example
 * domain.createEndPoint({applicationId: "id", name: "name"}, function(err,point){});
 */
Domain.prototype.createEndPoint = function (item, callback) {
	var self = this;
	var request = self.client.createRequest("post", self.client.concatUserPath(DOMAIN_PATH) +
		"/" + self.id + "/endpoints");
	request.type("json").send(item).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				self.getEndPoint(id, callback);
			});
		}
		else {
			self.client.checkResponse(res, callback);
		}
	});
};

/**
 * Delete an endpoint
 * @param endpointId Id of endpoint to remove
 * @param callback callback
 * @example
 * domain.deleteEndPoint("id", function(err){});
 */
Domain.prototype.deleteEndPoint = function (endpointId, callback) {
	var item = new EndPoint();
	item.client = this.client;
	item.id = endpointId;
	item.domainId = this.id;
	item.delete(callback);
};

/**
 * Update an endpoint
 * @param endpointId Id of endpoint to remove
 * @param data JSON Object with new values
 * @param callback callback
 * @example
 * domain.updateEndPoint("id", {enabled: "false"}, function(err){});
 */
Domain.prototype.updateEndPoint = function (endpointId, data, callback) {
	var item = new EndPoint();
	item.client = this.client;
	item.id = endpointId;
	item.domainId = this.id;
	item.update(data, callback);
};

module.exports = Domain;
