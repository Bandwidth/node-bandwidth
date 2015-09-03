var Client = require("./client");
var CALL_PATH = "calls";

function Call() {
	//for compatibility
	if (arguments.length > 0) {
		this.from = arguments[0];
		this.to = arguments[1];
	}
}

/**
 * Get information about a call that was made or received
 * @param client Client instance
 * @param id Id of call
 * @param callback callback function
 * @example
 * bandwidth.Client.get(client, "id", function(err, call){});
 */
Call.get = function (client, id, callback) {
	if (arguments.length === 2) {
		callback = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("get", client.concatUserPath(CALL_PATH) + "/" +  id, function (err, item) {
		if (err) {
			return callback(err);
		}

		item.client = client;
		item.__proto__ = Call.prototype;
		callback(null, item);
	});
};

/**
 * Get a list of previous calls that were made or received
 * @param client Client instance
 * @param query query parametes
 * @param callback callback function
 * @example
 * bandwidth.Call.list(client, function(err, list){});
 */
Call.list = function (client, query, callback) {
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
		query = {};
	}

	client.makeRequest("get", client.concatUserPath(CALL_PATH), query, function (err, items) {
		if (err) {
			return callback(err);
		}

		var itemsIsEmpty = items instanceof Object && Object.getOwnPropertyNames(items).length === 0;
		var result = itemsIsEmpty ? [] : items.map(function (item) {
			item.client = client;
			item.__proto__ = Call.prototype;
			return item;
		});

		callback(null, result);
	});
};

/**
 * Make a phone call
 * @param client Client instance
 * @param item call"s data
 * @param callback callback function
 * @example
 * bandwidth.Call.create(client, {from: "", to: ""}, function(err, call){});
 */
Call.create = function (client, item, callback) {
	if (arguments.length === 2) {
		callback = item;
		item = client;
		client = new Client();
	}

	var request = client.createRequest("post", client.concatUserPath(CALL_PATH));
	request.type("json").send(item).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				Call.get(client, id, callback);
			});
		}
		else {
			client.checkResponse(res, callback);
		}
	});
};

/**
 * Make changes to an active phone call. E.g.: transfer, hang up, answer or reject incoming calls, call recording, etc.
 * @param client Client instance
 * @param id Id of call
 * @param data changed data
 * @param callback callback function
 * @example
 * bandwidth.Call.update(client, "id", {state: "rejected"}, function(err){}) ;
 */
Call.update = function (client, id, data, callback) {
	if (arguments.length === 3) {
		callback = data;
		data = id;
		id = client;
		client = new Client();
	}

	client.makeRequest("post", client.concatUserPath(CALL_PATH) + "/" + id, data, callback);
};

/**
 * Make changes to an active phone call. E.g.: transfer, hang up, answer or reject incoming calls, call recording, etc.
 * @param data changed data
 * @param callback callback function
 * @example
 * call.update({state: "rejected"}, function(err){}) ;
 */
Call.prototype.update = function (data, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH) + "/" + this.id,  data, callback);
};

/**
 * Play an audio or speak a sentence in a call
 * @param data audio data
 * @param callback callback function
 * @example
 * call.playAudio({fileUrl: ""}, function(err}{});
 */
Call.prototype.playAudio = function (data, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH) + "/" + this.id + "/audio",  data, callback);
};

/**
 * Speak a sentence in a call
 * @param sentence sentence to speak
 * @param tag optional tag value which will be used in events
 * @param gender optional gender value (default: female)
 * @param voice optional voice name (default: kate)
 * @param callback callback function
 * @example
 * call.speakSentence("test", "tag", function(err){});
 */
Call.prototype.speakSentence = function (sentence, tag, gender, voice, callback) {
	if (arguments.length === 2) {
		callback = tag;
		tag = null;
	}
	else if (arguments.length === 3) {
		callback = gender;
		gender = null;
	}
	else if (arguments.length === 4) {
		callback = voice;
		return callback(new Error("Parameters \"gender\" and \"voice\" should be used together"));
	}

	this.playAudio({
		gender   : gender || "female",
		locale   : "en_US",
		voice    : voice || "kate",
		sentence : sentence,
		tag      : tag
	}, callback);
};

/**
 * Play audio file in call
 * @param recordingUrl url to audio file
 * @param callback callback function
 * @example
 * call.playRecording("url", function(err){});
 */
Call.prototype.playRecording = function (recordingUrl, callback) {
	this.playAudio({
		fileUrl : recordingUrl
	}, callback);
};

/**
 * Send DTMF
 * @param dtmf stmv value
 * @param callback callback function
 * @example
 * call.setDtmf("0", function(err){});*/
Call.prototype.setDtmf = function (dtmf, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH) + "/" +
		this.id + "/dtmf",  { dtmfOut : dtmf }, callback);
};

/**
 * Gather the DTMF digits pressed
 * @param data gather"s data
 * @param callback callback function
 * @example
 * call.createGather("Press a digit", function(err, gather){})
 * call.createGather({maxDigits: 1, prompt: {sentence: "Press a digit", bargeable: true }}, function(err, gather){})
 */
Call.prototype.createGather = function (data, callback) {
	if (typeof data === "string") {
		data = {
			tag       : this.id,
			maxDigits : 1,
			prompt    : {
				locale    : "en_US",
				gender    : "female",
				sentence  : data,
				voice     : "kate",
				bargeable : true
			}
		};
	}

	var self = this;
	var request = self.client.createRequest("post", self.client.concatUserPath(CALL_PATH) + "/" + this.id + "/gather");
	request.type("json").send(data).end(function (res) {
		if (res.ok && res.headers.location) {
			Client.getIdFromLocationHeader(res.headers.location, function (err, id) {
				if (err) {
					return callback(err);
				}

				self.getGather(id, callback);
			});
		}
		else {
			self.client.checkResponse(res, callback);
		}
	});
};

/**
 * Update the gather DTMF (Stop Gather)
 * @param gatherId Id of gather
 * @param data changed data
 * @param callback callback function
 * @example call.updateGather("id", { state: "completed" }, function(err) { });
 */
Call.prototype.updateGather = function (gatherId, data, callback) {
	this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH + "/" +
		this.id + "/gather/" + gatherId), data, callback);
};

/**
 * Get the gather DTMF parameters and results
 * @param gatherId Id of gather
 * @param callback callback function
 * @example call.getGather("1", function(err, gather){ });
 */
Call.prototype.getGather = function (gatherId, callback) {
	this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" +
		this.id + "/gather/" + gatherId), callback);
};

/**
 * Gets information about one call event
 * @param eventId Id of event
 * @param callback callback function
 * @example call.getEvent("id", function(err, ev){ });
 */
Call.prototype.getEvent = function (eventId, callback) {
	this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" +
		this.id + "/events/" + eventId), callback);
};

/**
 * Gets the list of call events for a call
 * @example call.getEvents(function(err, list) { });
 */
Call.prototype.getEvents = function (callback) {
	this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" + this.id + "/events"), callback);
};

/**
 * Retrieve all recordings related to the call
 * @param callback callback function
 * @example call.getRecordings(function(err, list){ })
 */
Call.prototype.getRecordings = function (callback) {
	this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" + this.id + "/recordings"), callback);
};

/**
 * Hangup a call
 * @param callback callback function
 * @example call.hangUp(function(err) { });
 */
Call.prototype.hangUp = function (callback) {
	var self = this;
	self.update({ state : "completed" }, function (err) {
		if (err) {
			return callback(err);
		}

		self.reload(callback);
	});
};

/**
 * Answer on incoming call
 * @param callback callback function
 * @example call.answerOnIncoming(function(err) { });
 */
Call.prototype.answerOnIncoming = function (callback) {
	var self = this;
	self.update({ state : "active" }, function (err) {
		if (err) {
			return callback(err);
		}

		self.reload(callback);
	});
};

/**
 * Reject incoming call
 * @param callback callback
 * @example call.rejectIncoming(function(err) { });
 */
Call.prototype.rejectIncoming = function (callback) {
	var self = this;
	self.update({ state : "rejected" }, function (err) {
		if (err) {
			return callback(err);
		}

		self.reload(callback);
	});
};

/**
 * Tune on recording
 * @example call.recordingOn(function(err) { });
 */
Call.prototype.recordingOn = function (callback) {
	var self = this;
	self.update({ recordingEnabled : true }, function (err) {
		if (err) {
			return callback(err);
		}

		self.reload(callback);
	});
};

/**
 * Tune off recording
 * @example call.recordingOff(function(err){ });
 */
Call.prototype.recordingOff = function (callback) {
	var self = this;
	self.update({ recordingEnabled : false }, function (err) {
		if (err) {
			return callback(err);
		}

		self.reload(callback);
	});
};

/**
 * Refresh information about a call
 */
Call.prototype.reload = function (callback) {
	var self = this;
	self.client.makeRequest("get", self.client.concatUserPath(CALL_PATH) + "/" +  self.id, function (err, item) {
		if (err) {
			return callback(err);
		}

		var k;
		for (k in item) {
			self[k] = item[k];
		}

		callback();
	});
};

module.exports = Call;
