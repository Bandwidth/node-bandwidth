var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Message = lib.Message;

describe("Message", function () {
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
			helper.nock().get("/v1/users/FakeUserId/messages?page=1").reply(200, items);
			Message.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				new Message();
				done();
			});
		});

		it("should return empty list of messages", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages?page=1").reply(200);
			Message.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				new Message();
				done();
			});
		});

		it("should return list of messages (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages?page=1").reply(200, items);
			Message.list({ page : 1 }, function (err, list) {
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

		it("should return list of messages (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages").reply(200, items);
			Message.list(helper.createClient(),  function (err, list) {
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

		it("should return list of messages (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages").reply(200, items);
			Message.list(function (err, list) {
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

		it("should fail if request failed", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages").reply(500);
			Message.list(helper.createClient(),  function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#get", function () {
		var item = {
			id   : "1",
			from : "from1",
			to   : "to1",
			text : "message"
		};

		it("should return a message", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages/1").reply(200, item);
			Message.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return a message (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages/1").reply(200, item);
			Message.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/messages/1").reply(500);
			Message.get(helper.createClient(), "1", function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#create", function () {
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

		it("should create empty list of messages", function (done) {
			var data = [ { from : "from1", to : "to1", text : "text1" }, { from : "from2", to : "to2", text : "text2" } ];
			helper.nock().post("/v1/users/FakeUserId/messages", data)
				.reply(200, null);
			Message.create(helper.createClient(), data,  function (err, statuses) {
				if (err) {
					return done(err);
				}

				statuses.should.eql([]);
				done();
			});
		});
	});

	describe("#create", function () {
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
			Message.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail to create a message when location is null", function (done) {
			helper.nock().post("/v1/users/FakeUserId/messages", data).reply(201, "",
				{ "Location" : null });
			helper.nock().get("/v1/users/FakeUserId/messages/1").reply(200, item);
			Message.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				delete i.client;
				done(new Error("An error is expected"));
			});
		});

		it("should create list of messages", function (done) {
			var data = [ { from : "from1", to : "to1", text : "text1" }, { from : "from2", to : "to2", text : "text2" } ];
			helper.nock().post("/v1/users/FakeUserId/messages", data)
				.reply(200, [
					{ result : "error", error : { message : "Error" } },
					{ result : "accepted", location : "/v1/users/FakeUserId/messages/1" } ]);
			Message.create(helper.createClient(), data,  function (err, statuses) {
				if (err) {
					return done(err);
				}

				statuses[0].error.message.should.equal("Error");
				statuses[1].id.should.equal("1");
				done();
			});
		});

		it("should create a message (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/messages", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/messages/1" });
			helper.nock().get("/v1/users/FakeUserId/messages/1").reply(200, item);
			Message.create(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should create list of messages (with default client)", function (done) {
			var data = [ { from : "from1", to : "to1", text : "text1" }, { from : "from2", to : "to2", text : "text2" } ];
			helper.nock().post("/v1/users/FakeUserId/messages", data)
				.reply(200, [
					{ result : "accepted" },
					{ result : "accepted", location : "/v1/users/FakeUserId/messages/1" }
				]);
			Message.create(data,  function (err, statuses) {
				if (err) {
					return done(err);
				}

				statuses[0].error.should.be.ok;
				statuses[1].id.should.equal("1");
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/messages").reply(500);
			Message.create(helper.createClient(), data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});
});
