var Client = require("../").Client;
var errors = require("../").errors;
var nock = require("nock");
var helper = require("./helper");
describe("client tests", function () {
	before(function () {
		nock.disableNetConnect();
	});
	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});
	describe("#constructor", function () {
		it("should create client instance", function () {
			var client = new Client("1", "2", "3");
			client.should.be.instanceof(Client);
			Client("1", "2", "3").should.be.instanceof(Client);
		});
		it("should fail if auth data are missing", function () {
			var options = Client.globalOptions;
			try {
				Client.globalOptions = {};
				new Client();
				throw new Error("An error is estimated");
			}
			catch (err) {
				err.should.be.instanceof(errors.MissingCredentialsError);
			}
			finally {
				Client.globalOptions = options;
			}
		});
	});
	describe("#makeRequest", function () {
		var client = new Client("accountId", "user", "password");
		it("should make GET request", function (done) {
			var span = helper.nock().get("/v1/test")
			.reply(200, { test : "test" });
			client.makeRequest("get", "/test", function (err, r) {
				if (err) {
					return done(err);
				}
				r.test.should.equal("test");
				done();
			});
		});

		it("should make GET request with query", function (done) {
			var c = new Client({
				userId    : "userId",
				apiToken  : "token",
				apiSecret : "secret"
			});
			helper.nock().get("/v1/test?data=true")
			.reply(200, { test : "test" });
			c.makeRequest("get", "/test", { data : true }, function (err, r) {
				if (err) {
					return done(err);
				}
				r.test.should.equal("test");
				done();
			});
		});
		it("should  handle requests without output", function (done) {
			helper.nock().get("/v1/test").reply(200);
			client.makeRequest("get", "/test", done);
		});

		it("should make request and handle error status", function (done) {
			helper.nock().get("/v1/test").reply(400, { message : "Error" });
			client.makeRequest("get", "/test", function (err, r) {
				if (err) {
					err.message.should.equal("Error");
					return done();
				}
				done(new Error("Error is expected"));
			});
		});

		it("should make request and handle error status (without response message)", function (done) {
			helper.nock().get("/v1/test").reply(400);
			client.makeRequest("get", "/test", function (err, r) {
				if (err) {
					return done();
				}
				done(new Error("Error is expected"));
			});
		});
		it("should make POST request", function (done) {
			var data = {
				root : {
					test1 : [ "test1", "test2" ],
					test2 : "2014-11-20T00:00:00.000Z",
				}
			};
			helper.nock().post("/v1/test", data).reply(200, {
				test  : "2014-11-19T13:44:38.123Z",
				test1 : 10,
				test2 : [ "2014-11-19T13:44:38.123Z", { test : "2014-11-19T13:44:38.123Z" } ]
			});
			client.makeRequest("post", "/test", data, function (err, r) {
				if (err) {
					return done(err);
				}
				r.test.should.be.instanceof(Date);
				r.test.toISOString().should.equal("2014-11-19T13:44:38.123Z");
				r.test2[0].toISOString().should.equal("2014-11-19T13:44:38.123Z");
				r.test2[1].test.toISOString().should.equal("2014-11-19T13:44:38.123Z");
				done();
			});
		});
		it("should make PUT request", function (done) {
			var data = { data : 10 };
			helper.nock().put("/v1/test", data)
			.reply(200, { test : "test" });
			client.makeRequest("put", "/test", data, function (err, r) {
				if (err) {
					return done(err);
				}
				r.test.should.equal("test");
				done();
			});
		});
		it("should make DELETE request", function (done) {
			helper.nock().delete("/v1/test")
			.reply(200, { test : "test" });
			client.makeRequest("del", "/test", function (err, r) {
				if (err) {
					return done(err);
				}
				r.test.should.equal("test");
				done();
			});
		});
	});
	describe("#concatUserPath", function () {
		it("should return formatted url", function () {
			var client = new Client({ userId : "userId" });
			client.concatUserPath("test").should.equal("/users/userId/test");
			client.concatUserPath("/test1").should.equal("/users/userId/test1");
		});
	});
	describe("#getIdFromLocationHeader", function () {
		it("should return formatted url", function (done) {
			Client.getIdFromLocationHeader("/path1/path2/10", function (err, id) {
				if (err) {
					return done(err);
				}
				id.should.equal("10");
				Client.getIdFromLocationHeader("/path1/100/path2/11", function (err, id) {
					if (err) {
						return done(err);
					}
					id.should.equal("11");
					done();
				});
			});
		});
		it("should fail if id is missing", function (done) {
			Client.getIdFromLocationHeader("nothing", function (err, id) {
				if (err) {
					return done();
				}
				done(new Error("Error is estimated"));
			});
		});
	});
});
