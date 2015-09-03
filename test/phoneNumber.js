var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var PhoneNumber = lib.PhoneNumber;

describe("PhoneNumber", function () {
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
			id          : "1",
			number      : "111111",
			numberState : "enabled"
		}, {
			id          : "2",
			number      : "222222",
			numberState : "enabled"
		} ];

		it("should return list of phoneNumbers", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers?page=1").reply(200, items);
			PhoneNumber.list(helper.createClient(), { page : 1 }, function (err, list) {
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

		it("should return empty list of phoneNumbers", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers?page=1").reply(200);
			PhoneNumber.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should return list of phoneNumbers (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers?page=1").reply(200, items);
			PhoneNumber.list({ page : 1 }, function (err, list) {
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

		it("should return list of phoneNumbers (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers").reply(200, items);
			PhoneNumber.list(helper.createClient(),  function (err, list) {
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

		it("should return list of phoneNumbers (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers").reply(200, items);
			PhoneNumber.list(function (err, list) {
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
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers").reply(500);
			PhoneNumber.list(helper.createClient(),  function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#get", function () {
		var item = {
			id          : "1",
			number      : "111111",
			numberState : "enabled"
		};
		it("should return a phoneNumber", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers/1").reply(200, item);
			PhoneNumber.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return a phoneNumber (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers/1").reply(200, item);
			PhoneNumber.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers/1").reply(500);
			PhoneNumber.get(helper.createClient(), "1", function (err) {
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
			PhoneNumber.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail to create a phoneNumber when location is invalid", function (done) {
			helper.nock().post("/v1/users/FakeUserId/phoneNumbers", data).reply(201, "",
				{ "Location" : "fakeLocation" });
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers/1").reply(200, item);
			PhoneNumber.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should create a phoneNumber (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/phoneNumbers", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/phoneNumbers/1" });
			helper.nock().get("/v1/users/FakeUserId/phoneNumbers/1").reply(200, item);
			PhoneNumber.create(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/phoneNumbers").reply(500);
			PhoneNumber.create(helper.createClient(), data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#update", function () {
		it("should update a phoneNumber", function (done) {
			var data = { numberState : "disabled" };
			helper.nock().post("/v1/users/FakeUserId/phoneNumbers/1", data).reply(200);
			var phoneNumber = new PhoneNumber();
			phoneNumber.id = 1;
			phoneNumber.client = helper.createClient();
			phoneNumber.update(data, done);
		});
	});

	describe("#delete", function () {
		it("should delete a phoneNumber", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/phoneNumbers/1").reply(200);
			var phoneNumber = new PhoneNumber();
			phoneNumber.id = 1;
			phoneNumber.client = helper.createClient();
			phoneNumber.delete(done);
		});
	});
});
