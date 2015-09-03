var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Domain = lib.Domain;

describe("Domain", function () {
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
			name : "domain1"
		}, {
			id   : "2",
			name : "domain2"
		} ];

		it("should return domains", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains").reply(200, items);
			Domain.list(helper.createClient(), function (err, list) {
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

		it("should return empty list of domains", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains").reply(200);
			Domain.list(helper.createClient(), function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should return a domain (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains").reply(200, items);
			Domain.list(function (err, list) {
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

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains").reply(500);
			Domain.list(helper.createClient(), function (err) {
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
			name        : "domain1",
			description : "description1"
		};

		var data = {
			name        : "domain1",
			description : "description1"
		};

		it("should create a domain", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/domains/1" });
			helper.nock().get("/v1/users/FakeUserId/domains/1").reply(200, item);
			Domain.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail to create a domain when location is invalid", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains", data).reply(201, "",
				{ "Location" : "fakeLocation" });
			helper.nock().get("/v1/users/FakeUserId/domains/1").reply(200, item);
			Domain.create(helper.createClient(), data,  function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should create a domain (with default client)", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains", data).reply(201, "",
				{ "Location" : "/v1/users/FakeUserId/domains/1" });
			helper.nock().get("/v1/users/FakeUserId/domains/1").reply(200, item);
			Domain.create(data,  function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains").reply(500);
			Domain.create(helper.createClient(), data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#delete", function () {
		it("should remove a domain", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/domains/1").reply(200);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.delete(done);
		});
	});

	describe("#get", function () {
		var item = {
			id          : "1",
			name        : "domain1",
			description : "description1"
		};
		it("should return a domain", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/1").reply(200, item);
			Domain.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return a domain (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/1").reply(200, item);
			Domain.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/2").reply(500);
			Domain.get(helper.createClient(), "2", function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

	});

	describe("#getEndPoints", function () {
		var items = [ { id : 1 }, { id : 2 } ];
		it("should return list of endPoints", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints").reply(200, items);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.getEndPoints(function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client; delete i.domainId;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return empty list of endPoints", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints").reply(200);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.getEndPoints(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should fila on request error", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints").reply(400);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.getEndPoints(function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#getEndPoint", function () {

		var item = { id : 10 };

		it("should return an endpoint", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200, item);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.getEndPoint("10", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				delete i.domainId;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on request error", function (done) {
			helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints/10").reply(400);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.getEndPoint("10", function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#createEndPoint", function () {
		var item = {
			id : "1"
		};

		var data = {
			name : "point1"
		};

		it("should create an endpoint", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints", data)
				.reply(201, "", {
					"Location" : "/v1/users/FakeUserId/domains/1/endpoints/10"
				});
			helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200, item);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.createEndPoint(data, function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				delete i.domainId;
				i.should.eql(item);
				done();
			});
		});

		it("should fail to create an endpoint if location is invalid", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints", data)
				.reply(201, "", {
					"Location" : "fakeLocation"
				});
			helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200, item);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.createEndPoint(data,  function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail on remote request error", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints").reply(500);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.createEndPoint(data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#deleteEndPoint", function () {
		it("should delete an endPoint", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200);
			var domain = new Domain();
			domain.id = 1;
			domain.client = helper.createClient();
			domain.deleteEndPoint("10", done);
		});
	});

	describe("#updateEndPoint", function () {
		var DOMAIN_PATH = "/v1/users/FakeUserId/domains/";
		var domain;
		var domainId = "rd-lrz25ny";
		var endpointId = "re-kx2kk";
		var ENDPOINT_PATH = DOMAIN_PATH + domainId + "/endpoints/" + endpointId;
		var updateBody = { enabled : "false" };
		var errorResponse = { message : "There are lots of potential errors" };
		before(function () {
			domain = new Domain();
			domain.id = domainId;
			domain.client = helper.createClient();
		});
		describe("When endpoint is updated successfully", function () {
			var error;
			var result;
			before(function () {
				helper.nock()
					.post(ENDPOINT_PATH, updateBody)
					.reply(200, "OK");
				domain.updateEndPoint(endpointId, updateBody, function (err, res) {
					error = err;
					result = res;
				});
			});
			it("should callback with an empty object", function () {
				result.should.eql({});
			});
			it("should not callback with an error", function () {
				var isNull = error === null;
				isNull.should.be.true;
			});
		});
		describe("When enpoint is not updated successfully", function () {
			var error;
			var result;
			before(function () {
				helper.nock()
					.post(ENDPOINT_PATH, updateBody)
					.reply(400, errorResponse);
				domain.updateEndPoint(endpointId, updateBody, function (err, res) {
					error = err;
					result = res;
				});
			});
			it("should callback with an error", function () {
				error.message.should.eql(errorResponse.message);
			});
			it("should not callback with a result", function () {
				var isUndefined = typeof result === "undefined";
				isUndefined.should.be.true;
			});
		});

	});
});
