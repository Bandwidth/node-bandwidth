var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Conference = lib.Conference;

describe("Conference", function () {
	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#get", function () {
		var item = {
			id          : "1",
			from        : "from1",
			callbackUrl : "http://host1"
		};

		it("should return a conference", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1").reply(200, item);
			Conference.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return a conference (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1").reply(200, item);
			Conference.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1").reply(500);
			Conference.get(helper.createClient(), "1", function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#create", function () {
		var item = {
			id          : "1",
			from        : "from1",
			callbackUrl : "http://host1"
		};
		var data = {
			from        : "from1",
			callbackUrl : "http://host1"
		};

		it("should create a conference", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/conferences/1" });
			helper.nock().get("/v1/users/FakeUserId/conferences/1").reply(200, item);
			Conference.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should create a conference (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/conferences/1" });
			helper.nock().get("/v1/users/FakeUserId/conferences/1").reply(200, item);
			Conference.create(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail to create a conference when location is invalid", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences", data).reply(201, "",
				{ "Location" : "fakelocation" });
			helper.nock().get("/v1/users/FakeUserId/conferences/1").reply(200, item);
			Conference.create(data,  function (err) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences").reply(500);
			Conference.create(helper.createClient(), data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#update", function () {
		it("should update a conference", function (done) {
			var data = { callbackUrl : "http://host2" };
			helper.nock().post("/v1/users/FakeUserId/conferences/1", data).reply(200);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.update(data, done);
		});
	});

	describe("#complete", function () {
		it("should update a conference", function (done) {
			var data = { state : "completed" };
			helper.nock().post("/v1/users/FakeUserId/conferences/1", data).reply(200);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.complete(done);
		});
	});

	describe("#mute", function () {
		it("should call mute", function (done) {
			var data = { mute : true };
			helper.nock().post("/v1/users/FakeUserId/conferences/1", data).reply(200);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.mute(done);
		});
	});

	describe("#playAudio", function () {
		it("should play audio for a conference", function (done) {
			var data = { fileUrl : "http://host2" };
			helper.nock().post("/v1/users/FakeUserId/conferences/1/audio", data).reply(200);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.playAudio(data, done);
		});
	});

	describe("#getMembers", function () {
		var items = [ { id : 1 }, { id : 2 } ];
		it("should return list of members", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1/members").reply(200, items);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.getMembers(function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client; delete i.conferenceId;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return an empty list of members", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1/members").reply(200);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.getMembers(function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client; delete i.conferenceId;
				});

				list.should.eql([]);
				done();
			});
		});

		it("should fila on request error", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1/members").reply(400);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.getMembers(function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#getMember", function () {
		var item = { id : 10 };
		it("should return a  member", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1/members/10").reply(200, item);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.getMember("10", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				delete i.conferenceId;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on request error", function (done) {
			helper.nock().get("/v1/users/FakeUserId/conferences/1/members/10").reply(400);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.getMember("10", function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#createMember", function () {
		var item = {
			id : "1"
		};
		var data = {
			from : "from1"
		};
		it("should create a conference", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences/1/members", data)
				.reply(201, "", {
					"Location" : "/v1/users/FakeUserId/conferences/1/members/10"
				});
			helper.nock().get("/v1/users/FakeUserId/conferences/1/members/10").reply(200, item);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.createMember(data, function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				delete i.conferenceId;
				i.should.eql(item);
				done();
			});
		});

		it("should fail if location is invalid", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences/1/members", data)
				.reply(201, "", {
					"Location" : "fakeLocation"
				});
			helper.nock().get("/v1/users/FakeUserId/conferences/1/members/10").reply(200, item);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.createMember(data, function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done();
			});
		});

		it("should fail on remote request error", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences/1/members").reply(500);
			var conference = new Conference();
			conference.id = 1;
			conference.client = helper.createClient();
			conference.createMember(data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});
});
