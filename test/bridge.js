var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Bridge = lib.Bridge;

describe("Bridge", function () {
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
			state : "active"
		}, {
			id    : "2",
			state : "active"
		} ];

		it("should return list of bridges", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges").reply(200, items);
			Bridge.list(helper.createClient(),  function (err, list) {
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

		it("should return list of bridges (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges").reply(200, items);
			Bridge.list(function (err, list) {
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

		it("should return empty list of bridges (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges").reply(200);
			Bridge.list(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should fail if request failed", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges").reply(500);
			Bridge.list(helper.createClient(),  function (err, list) {
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
			state : "active"
		};
		it("should return a bridge", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges/1").reply(200, item);
			Bridge.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return a bridge (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges/1").reply(200, item);
			Bridge.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges/1").reply(500);
			Bridge.get(helper.createClient(), "1", function (err) {
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
			state : "active"
		};
		var data = {
			bridge : "call"
		};

		it("should create a bridge", function (done) {
			helper.nock().post("/v1/users/FakeUserId/bridges", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/bridges/1" });
			helper.nock().get("/v1/users/FakeUserId/bridges/1").reply(200, item);
			Bridge.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should create a bridge (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/bridges", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/bridges/1" });
			helper.nock().get("/v1/users/FakeUserId/bridges/1").reply(200, item);
			Bridge.create(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail to create a bridge when location is invalid (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/bridges", data).reply(201, "",
				{ "Location" : "fakeLocation" });
			helper.nock().get("/v1/users/FakeUserId/bridges/1").reply(200, item);
			Bridge.create(data,  function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/bridges").reply(500);
			Bridge.create(helper.createClient(), data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#update", function () {
		it("should update a bridge", function (done) {
			var data = { bridge : "call2" };
			helper.nock().post("/v1/users/FakeUserId/bridges/1", data).reply(200);
			var bridge = new Bridge();
			bridge.id = 1;
			bridge.client = helper.createClient();
			bridge.update(data, done);
		});
	});

	describe("#playAudio", function () {
		it("should play audio", function (done) {
			var data = { fileUrl : "http://host1" };
			helper.nock().post("/v1/users/FakeUserId/bridges/1/audio", data).reply(200);
			var bridge = new Bridge();
			bridge.id = 1;
			bridge.client = helper.createClient();
			bridge.playAudio(data, done);
		});
	});

	describe("#getCalls", function () {
		it("should return calls of a bridge", function (done) {
			var items = [ { id : 1 }, { id : 2 } ];
			helper.nock().get("/v1/users/FakeUserId/bridges/1/calls").reply(200, items);
			var bridge = new Bridge();
			bridge.id = 1;
			bridge.client = helper.createClient();
			bridge.getCalls(function (err, list) {
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

		it("should return calls of a bridge (items is empty)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges/1/calls").reply(200);
			var bridge = new Bridge();
			bridge.id = 1;
			bridge.client = helper.createClient();
			bridge.getCalls(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should fail if request failed", function (done) {
			helper.nock().get("/v1/users/FakeUserId/bridges/1/calls").reply(500);
			var bridge = new Bridge();
			bridge.id = 1;
			bridge.client = helper.createClient();
			bridge.getCalls(function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});
});
