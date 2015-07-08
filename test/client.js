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
		var options;
		beforeEach(function () {
			options = Client.globalOptions;
		});
		afterEach(function () {
			Client.globalOptions = options;
		});

		it("should create client instance", function () {
			Client.globalOptions = { "apiVersion" : "1", "apiEndPoint" : "2" };
			var client = new Client("1", "2", "3");
			client.should.be.instanceof(Client);
		});
		it("should create client instance", function () {
			Client.globalOptions = { "apiVersion" : "1", "apiEndPoint" : "2" };
			var client = new Client("1", "2", "3");
			Client("1", "2", "3").should.be.instanceof(Client);
		});
		it("should create client instance", function () {
			Client.globalOptions = { "apiVersion" : "1", "apiEndPoint" : "2" };
			var client = new Client("1", "2", "3");
			Client("1", "2", "3", { "apiVersion" : "1", "apiEndPoint" : "2" }).should.be.instanceof(Client);
		});
		it("should create client instance (userId is null and options is not an Object)", function () {
			Client.globalOptions = { "apiVersion" : "1", "apiEndPoint" : "2" };
			var client = new Client(null, "2", "3", "1");
			client.should.be.instanceof(Client);
		});
		it("should throw missing credentials error when userId is null", function () {
			try {
				Client.globalOptions = {};
				var client = new Client(null, "2", "3", { "apiVersion" : "1" });
				throw new Error("An error is expected");
			}
			catch (err) {
				err.should.be.instanceof(errors.MissingCredentialsError);
			}
		});
		it("should fail if auth data are missing", function () {
			try {
				Client.globalOptions = {};
				new Client();
				throw new Error("An error is expected");
			}
			catch (err) {
				err.should.be.instanceof(errors.MissingCredentialsError);
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
			var client = new Client({ userId : "userId", apiToken : "apiToken", apiSecret : "apiSecret" });
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
				done(new Error("Error is expected"));
			});
		});
	});
});
