var lib = require("../");
var Client = lib.Client;
var nock = require("nock");
var helper = require("./helper");

describe("Client compatibility functions", function () {
	var client;
	before(function () {
		client = new Client("api.catapult.inetwork.com", "FakeUserId", "FakeApiToken", "FakeApiSecret");
		nock.disableNetConnect();
	});

	after(function () {
		nock.enableNetConnect();
	});

	afterEach(function () {
		nock.cleanAll();
	});

	describe("#sendCall", function () {
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

		it("should create a call", function (done) {
			helper.nock().post("/v1/users/FakeUserId/calls", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/calls/1" });
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, item);
			client.sendCall(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});
	});

	describe("#changeCall", function () {
		it("should update a call", function (done) {
			var data = { state : "rejected" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			client.changeCall("1", data, done);
		});
	});

	describe("#startRecording", function () {
		it("should tune on recording of a call", function (done) {
			var data = { recordingEnabled : true };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, data);
			client.startRecording("1", done);
		});
	});

	describe("#stopRecording", function () {
		it("should tune off recording of a call", function (done) {
			var data = { recordingEnabled : false };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, data);
			client.stopRecording("1", done);
		});
	});

	describe("#getRecording", function () {
		var item = {
			id    : "1",
			call  : "call1",
			media : "media1"
		};
		it("should return a recording", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings/1").reply(200, item);
			client.getRecording("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
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
			client.getRecordings("1", function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});

	describe("#transferCall", function () {
		it("should update a call", function (done) {
			var data = { call : { id : "1" }, data : "test" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", { data : "test" }).reply(200);
			client.transferCall(data, done);
		});
	});

	describe("#hangUp", function () {
		it("should update a call", function (done) {
			var data = { state : "completed" };
			helper.nock().post("/v1/users/FakeUserId/calls/1", data).reply(200);
			client.hangUp("1", done);
		});
	});

	describe("#getCall", function () {
		var item = {
			id    : "1",
			from  : "111",
			to    : "222",
			state : "active"
		};
		it("should return a call", function (done) {
			helper.nock().get("/v1/users/FakeUserId/calls/1").reply(200, item);
			client.getCall("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});
	});

	describe("#playCallAudio", function () {
		it("should play audio", function (done) {
			var data = { fileUrl : "url" };
			helper.nock().post("/v1/users/FakeUserId/calls/1/audio", data).reply(200);
			client.playCallAudio({ callId : "1", fileUrl : "url" }, done);
		});
	});

	describe("#sendMessage", function () {
		var item = {
			id   : "1",
			from : "from",
			to   : "to",
			text : "text"
		};

		var data = {
			from : "from",
			to   : "to",
			text : "text"
		};

		it("should create a message", function (done) {
			helper.nock().post("/v1/users/FakeUserId/messages", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/messages/1" });
			helper.nock().get("/v1/users/FakeUserId/messages/1").reply(200, item);
			client.sendMessage(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getMessage", function () {
		var item = {
			id   : "1",
			from : "from1",
			to   : "to1",
			text : "message"
		};
		it("should return a message", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages/1").reply(200, item);
			client.getMessage("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getMessages", function () {
		var items = [ {
			id   : "1",
			from : "from1",
			to   : "to1",
			text : "text1"
		}, {
			id   : "2",
			from : "from2",
			to   : "to2",
			text : "text2"
		} ];

		it("should return list of messages", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages").reply(200, items);
			client.getMessages(function (err, list) {
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
	});

	describe("#getAvailableNumbers", function () {
		var items = [ {
			number         : "1",
			city           : "City1",
			lata           : "Lata1",
			nationalNumber : "NationalNumber1",
			patternMatch   : "PatternMatch1",
			price          : 0.01,
			rateCenter     : "RateCenter1",
			state          : "State1"
		}, {
			number         : "2",
			city           : "City2",
			lata           : "Lata2",
			nationalNumber : "NationalNumber2",
			patternMatch   : "PatternMatch2",
			price          : 0.02,
			rateCenter     : "RateCenter2",
			state          : "State2"
		} ];

		it("should return tollFree numbers", function (done) {
			helper.nock().get("/v1/availableNumbers/tollFree?criteria1=1").reply(200, items);
			client.getAvailableNumbers({ criteria1 : 1, numberType : "tollFree" }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return local numbers", function (done) {
			helper.nock().get("/v1/availableNumbers/local?criteria1=1").reply(200, items);
			client.getAvailableNumbers({ criteria1 : 1, numberType : "local" }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});

	describe("#acquirePhoneNumber", function () {
		var item = {
			id          : "1",
			number      : "111111",
			numberState : "enabled"
		};
		var data = {
			number : "111111"
		};
		it("should create a phoneNumber", function (done) {
			helper.nock().post("/v1/users/FakeUserId/phoneNumbers", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/phoneNumbers/1" });
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers/1").reply(200, item);
			client.acquirePhoneNumber(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getPhoneNumber", function () {
		var item = {
			id          : "1",
			number      : "111111",
			numberState : "enabled"
		};

		it("should return a phoneNumber", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers/1").reply(200, item);
			client.getPhoneNumber("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getPhoneNumbers", function () {
		var items = [ {
			id          : "1",
			number      : "111111",
			numberState : "enabled"
		}, {
			id          : "2",
			number      : "222222",
			numberState : "enabled"
		} ];

		it("should return list of phoneNumbers", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers").reply(200, items);
			client.getPhoneNumbers(function (err, list) {
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
	});

	describe("#updatePhoneNumber", function () {
		it("should update a phoneNumber", function (done) {
			var data = { numberState : "disabled" };
			helper.nock().post("/v1/users/FakeUserId/phoneNumbers/1", data).reply(200);
			client.updatePhoneNumber("1", data, done);
		});
	});

	describe("#deletePhoneNumber", function () {
		it("should delete a phoneNumber", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/phoneNumbers/1").reply(200);
			client.deletePhoneNumber("1", done);
		});
	});

	describe("#getApplications", function () {
		var items = [ {
			id              : "1",
			name            : "app1",
			incomingCallUrl : "http://host1"
		}, {
			id              : "2",
			name            : "app2",
			incomingCallUrl : "http://host2"
		} ];

		it("should return list of applications", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications").reply(200, items);
			client.getApplications(function (err, list) {
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
	});

	describe("#portIn", function () {
		it("should throw an error", function (done) {
			client.portIn({}, function (err) {
				if (err) {
					return done();
				}

				done("An error is expected");
			});
		});
	});

	describe("#uploadLOA", function () {
		it("should throw an error", function (done) {
			client.uploadLOA("id", "file", function (err) {
				if (err) {
					return done();
				}

				done("An error is expected");
			});
		});
	});

	describe("#getPortInState", function () {
		it("should throw an error", function (done) {
			client.getPortInState("id", function (err) {
				if (err) {
					return done();
				}

				done("An error is expected");
			});
		});
	});

	describe("#checkPortInAvailability", function () {
		it("should throw an error", function (done) {
			client.checkPortInAvailability({}, function (err) {
				if (err) {
					return done();
				}

				done("An error is expected");
			});
		});
	});

	describe("obsolete types", function () {
		it("should allow to create instances of obsolete types", function () {
			new lib.Application("test");
			new lib.Audio("test");
			new lib.AvailableNumber("test");
			new lib.AvailableNumberSearchCriteria("test");
			new lib.Call("test");
			new lib.CallTransfer("test");
			new lib.LNPAvailabilityCheck("test");
			new lib.Message("test");
			new lib.PhoneNumber("test");
			new lib.PortInData("test");
		});
	});
});
