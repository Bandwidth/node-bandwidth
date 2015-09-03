var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Application = lib.Application;

describe("Application", function () {
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
			id              : "1",
			name            : "app1",
			incomingCallUrl : "http://host1"
		},{
			id              : "2",
			name            : "app2",
			incomingCallUrl : "http://host2"
		} ];

		it("should return list of applications", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications?page=1").reply(200, items);
			Application.list(helper.createClient(), { page : 1 }, function (err, list) {
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

		it("should return list of applications (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications?page=1").reply(200, items);
			Application.list({ page : 1 }, function (err, list) {
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

		it("should return list of applications (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications").reply(200, items);
			Application.list(helper.createClient(), function (err, list) {
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

		it("should return list of applications (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications").reply(200, items);
			Application.list(function (err, list) {
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

		it("should return empty list of applications (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications").reply(200);
			Application.list(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications").reply(500);
			Application.list(helper.createClient(), {}, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#get", function () {
		var item = {
			id              : "1",
			name            : "app1",
			incomingCallUrl : "http://host1"
		};
		it("should return an application", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications/1").reply(200, item);
			Application.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return an application (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications/1").reply(200, item);
			Application.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/applications/1").reply(500);
			Application.get(helper.createClient(), "1", function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#create", function () {
		var item = {
			id              : "1",
			name            : "111",
			incomingCallUrl : "http://host1"
		};
		var data = {
			name            : "111",
			incomingCallUrl : "http://host1"
		};
		it("should create an application", function (done) {
			helper.nock().post("/v1/users/FakeUserId/applications", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/applications/1" });
			helper.nock().get("/v1/users/FakeUserId/applications/1").reply(200, item);
			Application.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail to create an application when location is invalid (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/applications", data).reply(201, "",
				{ "Location" : "fakelocation" });
			helper.nock().get("/v1/users/FakeUserId/applications/1").reply(200, item);
			Application.create(data,  function (err) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should create an application (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/applications", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/applications/1" });
			helper.nock().get("/v1/users/FakeUserId/applications/1").reply(200, item);
			Application.create(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/applications").reply(500);
			Application.create(helper.createClient(), data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#update", function () {
		it("should update an application", function (done) {
			var data = { incomingCallUrl : "http://host2" };
			helper.nock().post("/v1/users/FakeUserId/applications/1", data).reply(200);
			var app = new Application();
			app.id = 1;
			app.client = helper.createClient();
			app.update(data, done);
		});
	});

	describe("#delete", function () {
		it("should remove an application", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/applications/1").reply(200);
			var app = new Application();
			app.id = 1;
			app.client = helper.createClient();
			app.delete(done);
		});
	});
});
