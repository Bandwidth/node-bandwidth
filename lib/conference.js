var Client = require("./client");
var ConferenceMember = require("./conferenceMember");
var CONFERENCE_PATH = "conferences";

function Conference() {
}

/**
 * Retrieve conference information.
 * @param client Client instance
 * @param id id of conference
 * @param callback callback function
 * @example
 * bandwidth.Conference.get(client, "id", function(err, conference){});
 */
Conference.get = function (client, id, callback) {
	if (arguments.length === 2) {
		callback = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(CONFERENCE_PATH) + "/" +  id, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = Conference.prototype;
		callback(null, item);
	});
};

/**
 * Create a conference.
 * @param client Client instance
 * @param item conference"s data
 * @param callback callback function
 * @example
 * bandwidth.Conference.create(client, {from: "number"}, function(err, conference){});
 */
Conference.create = function (client, item, callback) {
	if (arguments.length === 2) {
		callback = item;
		item = client;
		client = new Client();
	}

	var request = client.createRequest("post", client.concatUserPath(CONFERENCE_PATH));
	request.type("json").send(item).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				Conference.get(client, id, callback);
			});
		}
		else {
			client.checkResponse(res, callback);
		}
	});
};

/**
 * Update Conference.
 * @param data changed data
 * @param callback callback
 * @example
 * conference.update({mute: false}, function(err){});
 */
Conference.prototype.update = function (data, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" + this.id,  data, callback);
};

/**
 * Complete a conference
 * @example
 * conference.complete(function(err){});
 */
Conference.prototype.complete = function (callback) {
	this.update({ state : "completed" }, callback);
};

/**
 * Mute a conference
 * @example
 * conference.mute(function(err){});
 */
Conference.prototype.mute = function (callback) {
	this.update({ mute : true }, callback);
};

/**
 * List all members from a conference.
 * @example
 * conference.getMembers(function(err, list){});
 */
Conference.prototype.getMembers = function (callback) {
	var client = this.client;
	var id = this.id;
	client.makeRequest("get", client.concatUserPath(CONFERENCE_PATH) + "/" + id + "/members", function (err, items) {
		if (err) {
			return callback(err);
		}

		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		var result = itemsIsEmpty ? [] : items.map(function (item) {
			item.client = client;
			item.__proto__ = ConferenceMember.prototype;
			item.conferenceId = id;
			return item;
		});

		callback(null, result);
	});
};

/**
 * Retrieve information about a particular conference member.
 * @param memberId Id of member
 * @param callback callback function
 * @example
 * conference.getMember("1", function(err, member){});
 */
Conference.prototype.getMember = function (memberId, callback) {
	var client = this.client;

	var id = this.id;

	client.makeRequest("get", client.concatUserPath(CONFERENCE_PATH) + "/" + id +
		"/members/" + memberId, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = ConferenceMember.prototype;
		item.conferenceId = id;
		callback(null, item);
	});
};

/**
 * Add a member to a conference.
 * @param item data to add member to this conference
 * @param callback callback
 * @example
 * conference.createMember({callId: "id"}, function(err,member){});
 */
Conference.prototype.createMember = function (item, callback) {
	var self = this;
	var request = self.client.createRequest("post", self.client.concatUserPath(CONFERENCE_PATH) +
		"/" + self.id + "/members");
	request.type("json").send(item).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				self.getMember(id, callback);
			});
		}
		else {
			self.client.checkResponse(res, callback);
		}
	});
};

/**
 * Play an audio/speak a sentence in the conference.
 * @param data  audio data
 * @param callback callback function
 * @example
 * conference.playAudio({fileUrl: "http://host1"}, function(err){});
 */
Conference.prototype.playAudio = function (data, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" +
		this.id + "/audio", data, callback);
};

module.exports = Conference;
