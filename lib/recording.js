var Client = require("./client");
var RECORDING_PATH = "recordings";

function Recording() {
}

/**
 * Retrieve a specific call recording information, identified by recordingId
 * @param client Client instance
 * @param id Id of recording
 * @param callback callback
 * @example
 * bandwidth.Recording.get(client, "id", function(err, recording){});
 */
Recording.get = function (client, id, callback) {
	if (arguments.length === 2) {
		callback = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(RECORDING_PATH) + "/" +  id, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = Recording.prototype;
		callback(null, item);
	});
};

/**
 * List a user"s call recordings
 * @param client Client instance
 * @param query query parameters
 * @param callback callback
 * @example
 * bandwidth.Recording.list(client, function(err, list){});
 */
Recording.list = function (client, query, callback) {
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

	client.makeRequest("get", client.concatUserPath(RECORDING_PATH), query, function (err, items) {
		if (err) {
			return callback(err);
		}

		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		callback(null, (itemsIsEmpty ? [] : items).map(function (item) {
			item.client = client;
			item.__proto__ = Recording.prototype;
			return item;
		}));
	});

};

/**
 * Request the transcription process to be started for the given recording id.
 * @param callback callback function
 * @example
 * recording.createTranscription(function(err, transcription){})
 */
Recording.prototype.createTranscription = function (callback) {
	var self = this;
	var request = self.client.createRequest("post", self.client.concatUserPath(RECORDING_PATH) +
		"/" + this.id + "/transcriptions");
	request.type("json").send({}).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				self.getTranscription(id, callback);
			});
		}
		else {
			self.client.checkResponse(res, callback);
		}
	});
};

/**
 * Gets information about a transcription
 * @param transcriptionId Id of event
 * @param callback callback function
 * @example
 * recording.getTranscription("id", function(err, transcription){});
 */
Recording.prototype.getTranscription = function (transcriptionId, callback) {
	var path = this.client.concatUserPath(RECORDING_PATH + "/" + this.id + "/transcriptions/" + transcriptionId);
	this.client.makeRequest("get", path, callback);
};

/** Gets the list of all transcriptions
 * @example
 * recording.getTranscriptions(function(err, list){});
 */
Recording.prototype.getTranscriptions = function (callback) {
	this.client.makeRequest("get", this.client.concatUserPath(RECORDING_PATH +
			"/" + this.id + "/transcriptions"), callback);
};

module.exports = Recording;
