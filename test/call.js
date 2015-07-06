var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Call = lib.Call;

describe("Call", function () {

	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#list", function () {
		var items = [ {
			id    : "1",
			from  : "111",
			to    : "222",
			state : "active"
		}, {
			id    : "2",
			from  : "211",
			to    : "322",
			state : "active"
		} ];

		it("should return list of calls", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls?page=1").reply(200, items);
			Call.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return list of calls (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls?page=1").reply(200, items);
			Call.list({ page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return list of calls (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls").reply(200, items);
			Call.list(helper.createClient(), function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return list of calls (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls").reply(200, items);
			Call.list(function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return empty list of calls (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls").reply(200);
			Call.list(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls").reply(500);
			Call.list(helper.createClient(), {}, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#get", function () {
		var item = {
			id    : "1",
			from  : "111",
			to    : "222",
			state : "active"
		};
		it("should return a call", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, item);
			Call.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return a call (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, item);
			Call.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(500);
			Call.get(helper.createClient(), "1", function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

	});

	describe("#create", function () {
		var item = {
			id    : "1",
			from  : "111",
			to    : "222",
			state : "active"
		};

		var data = {
			from : "111",
			to   : "222"
		};

		describe("should fail with invalid locaiton", function () {
			before(function () {
				helper.nock().post("/v1/users/FakeUserId/calls", data).reply(201, "",
					{ "Location" : "fakeLocation" });
				helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, item);
			});

			it("should fail", function (done) {
				Call.create(data,  function (err, i) {
					if (err) {
						err.message.should.equal("Missing id in response");
						return done();
					}
					delete i.client;
					done(new Error("An error is expected"));
				});
			});

			after(function () {
				nock.cleanAll();
			});
		});

		it("should create a call", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/calls/1" });
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, item);
			Call.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should create a  call (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/calls/1" });
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, item);
			Call.create(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls").reply(500);
			Call.create(helper.createClient(), data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#update", function () {
		it("should update a call", function (done) {
			var data = { state : "rejected" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.update(data, done);
		});
	});

	describe("#updateStatic", function () {
		it("should update a call statically", function (done) {
			var data = { state : "rejected" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			var client = helper.createClient();
			Call.update(client, "1", data, done);
		});

		it("should update a call using its ID without performing a GET", function (done) {
			var data = { state : "rejected" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			Call.update("1", data, done);
		});
	});

	describe("#playAudio", function () {
		it("should play audio", function (done) {
			var data = { fileUrl : "url" };
			helper.nock().post("/v1/users/FakeUserId/calls/1/audio", data).reply(200);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.playAudio(data, done);
		});
	});

	describe("#speakSentence", function () {
		it("should speak a sentense", function (done) {
			var data = {
				gender   : "female",
				locale   : "en_US",
				voice    : "kate",
				sentence : "test",
				tag      : "tag"
			};

			helper.nock().post("/v1/users/FakeUserId/calls/1/audio", data).reply(200);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.speakSentence("test", "tag", done);
		});

		it("should speak a sentense (without tag)", function (done) {
			var data = {
				gender   : "female",
				locale   : "en_US",
				voice    : "kate",
				sentence : "test",
				tag      : null
			};

			helper.nock().post("/v1/users/FakeUserId/calls/1/audio", data).reply(200);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.speakSentence("test", done);
		});

		it("should speak a sentense with different voice", function (done) {
			var data = {
				gender   : "male",
				locale   : "en_US",
				voice    : "tom",
				sentence : "test",
				tag      : "tag"
			};

			helper.nock().post("/v1/users/FakeUserId/calls/1/audio", data).reply(200);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.speakSentence("test", "tag", "male", "tom", done);
		});

		it("should throw error if gender is passed without voice", function (done) {
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.speakSentence("test", "tag", "male", function (err) {
				err.should.be.ok;
				done();
			});
		});
	});

	describe("#playRecording", function () {
		it("should play a recording", function (done) {
			var data = {
				fileUrl : "url"
			};
			helper.nock().post("/v1/users/FakeUserId/calls/1/audio", data).reply(200);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.playRecording("url", done);
		});
	});

	describe("#setDtmf", function () {
		it("should set dtmf", function (done) {
			var data = { dtmfOut : "test" };
			helper.nock().post("/v1/users/FakeUserId/calls/1/dtmf", data).reply(200);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.setDtmf("test", done);
		});
	});

	describe("#createGather", function () {
		var item = {
			id        : "101",
			tag       : "tag",
			maxDigits : 1
		};
		var data = {
			tag       : "tag",
			maxDigits : 1
		};

		it("should create a gather", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls/1/gather", data)
				.reply(201, "", {
					"Location" : "/v1/users/FakeUserId/calls/1/gather/101"
				});
			helper.nock().get("/v1/users/FakeUserId/calls/1/gather/101").reply(200, item);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.createGather(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});

		it("should fail to create a gather if location is invalid", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls/1/gather", data)
				.reply(201, "", {
					"Location" : "fakeLocation"
				});
			helper.nock().get("/v1/users/FakeUserId/calls/1/gather/101").reply(200, item);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.createGather(data,  function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should create a gather by sentence", function (done) {
			var d = {
				tag       : "1",
				maxDigits : 1,
				prompt    : {
					locale    : "en_US",
					gender    : "female",
					sentence  : "test",
					voice     : "kate",
					bargeable : true
				}
			};
			helper.nock().post("/v1/users/FakeUserId/calls/1/gather", d).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/calls/1/gather/101" });
			helper.nock().get("/v1/users/FakeUserId/calls/1/gather/101").reply(200, item);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.createGather("test",  function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls/1/gather").reply(500);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.createGather(data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#updateGather", function () {
		var data = {
			state : "completed"
		};
		it("should update a gather", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls/1/gather/101", data)
				.reply(201, "", {
					"Location" : "/v1/users/FakeUserId/calls/1/gather/101"
				});
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.updateGather("101", data, done);
		});
	});

	describe("#getGather", function () {
		var item = {
			id        : "101",
			tag       : "tag",
			maxDigits : 1
		};
		it("should return a gather", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1/gather/101").reply(200, item);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.getGather("101", function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getEvent", function () {
		var item = {
			id : "101"
		};
		it("should return an event", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1/events/101").reply(200, item);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.getEvent("101", function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getEvents", function () {
		var items = [ {
			id : "101"
		}, {
			id : "102"
		} ];
		it("should return events", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1/events").reply(200, items);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.getEvents(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});

	describe("#getRecordings", function () {
		var items = [ {
			id : "101"
		}, {
			id : "102"
		} ];
		it("should return recordings", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1/recordings").reply(200, items);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.getRecordings(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});

	describe("#hangUp", function () {
		it("should make hang up", function (done) {
			var data = { state : "completed" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, data);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.hangUp(done);
		});

		it("should fail if remote request failed", function (done) {
			var data = { state : "completed" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(400);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.hangUp(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail if refreshing of call failed", function (done) {
			var data = { state : "completed" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(500);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.hangUp(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#answerOnIncoming", function () {
		it("should answer to incoming call", function (done) {
			var data = { state : "active" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, data);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.answerOnIncoming(done);
		});

		it("should fail if remote request failed", function (done) {
			var data = { state : "active" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(400);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.answerOnIncoming(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail if refreshing of call failed", function (done) {
			var data = { state : "active" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(500);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.answerOnIncoming(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#rejectIncoming", function () {
		it("should reject a call", function (done) {
			var data = { state : "rejected" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, data);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.rejectIncoming(done);
		});

		it("should fail if remote request failed", function (done) {
			var data = { state : "rejected" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(400);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.rejectIncoming(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail if refreshing of call failed", function (done) {
			var data = { state : "rejected" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(500);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.rejectIncoming(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#recordingOn", function () {
		it("should tune on recording of a call", function (done) {
			var data = { recordingEnabled : true };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, data);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.recordingOn(done);
		});

		it("should fail if remote request failed", function (done) {
			var data = { recordingEnabled : true };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(400);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.recordingOn(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail if refreshing of call failed", function (done) {
			var data = { recordingEnabled : true };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(500);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.recordingOn(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#recordingOff", function () {
		it("should tune on recording of a call", function (done) {
			var data = { recordingEnabled : false };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, data);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.recordingOff(done);
		});

		it("should fail if remote request failed", function (done) {
			var data = { recordingEnabled : false };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(400);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.recordingOff(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail if refreshing of call failed", function (done) {
			var data = { recordingEnabled : false };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(500);
			var call = new Call();
			call.id = 1;
			call.client = helper.createClient();
			call.recordingOff(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});
});
