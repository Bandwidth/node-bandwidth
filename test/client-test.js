var nock = require("nock");
var Client = require("../lib/client");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Client", function () {

	var accountResponse = {
		balance     : "20.00",
		accountType : "pre-pay"
	};

	before(function () {
		nock.disableNetConnect();
	});

	after(function () {
		nock.enableNetConnect();
	});

	describe("using default options", function () {
		var client;

		before(function () {
			client = new Client({
				userId   : "fakeUserId",
				apiToken : "fakeApiToken",
				apiKey   : "fakeApiKey"
			});

			nock(baseUrl)
				.persist()
				.get("/v1/users/fakeUserId/account")
				.reply(200, accountResponse);
		});

		after(function () {
			nock.cleanAll();
		});

		it("should make requests to the default baseUrl", function (done) {
			client.makeRequest({
				path : "account"
			}).then(function (res) {
				res[0].body.should.eql(accountResponse);
				done();
			}).catch(function (err) {
				done(err);
			});
		});
	});

	describe("using custom options", function () {
		var client;
		var oldBaseUrl;

		before(function () {
			oldBaseUrl = baseUrl;
			baseUrl = "https://stage.catapult.inetwork.com";
			client = new Client({
				userId   : "fakeUserId",
				apiToken : "fakeApiToken",
				apiKey   : "fakeApiKey",
				baseUrl  : baseUrl
			});
		});

		after(function () {
			nock.cleanAll();
			baseUrl = oldBaseUrl;
		});

		it("should make requests to the custom baseUrl", function (done) {
			var accountResponse = {
				balance     : "20.00",
				accountType : "pre-pay"
			};

			nock(baseUrl).get("/v1/users/fakeUserId/account").reply(200, accountResponse);
			client.makeRequest({
				path : "account"
			}).then(function (res) {
				res[0].body.should.eql(accountResponse);
			}).done(done);
		});

	});

	describe("in error cases", function () {
		var client;

		before(function () {
			client = new Client({
				userId   : "fakeUserId",
				apiToken : "fakeApiToken",
				apiKey   : "fakeApiKey"
			});

			nock(baseUrl)
				.persist()
				.get("/v1/users/fakeUserId/account")
				.reply(401, { message : "Something bad happened..." })
				.get("/v1/users/fakeUserId/unknown")
				.reply(404)
				.get("/v1/users/fakeUserId/unknown2")
				.reply(404, {});
		});

		after(function () {
			nock.cleanAll();
		});

		it("should throw exceptions on unexpected HTTP responses", function (done) {
			client.makeRequest({
				path : "account"
			}).then(function (res) {
				done("It should have thrown an exception!");
			}).catch(function (err) {
				err.statusCode.should.equal(401);
				err.message.should.equal("Something bad happened...");
				done();
			});
		});

		it("should throw exceptions on unexpected HTTP responses with no response body", function (done) {
			client.makeRequest({
				path : "unknown"
			}).then(function (res) {
				done("It should have thrown an exception!");
			}).catch(function (err) {
				err.statusCode.should.equal(404);
				err.message.should.equal("");
				done();
			});
		});

		it("should throw exceptions on unexpected HTTP responses with an empty response body", function (done) {
			client.makeRequest({
				path : "unknown2"
			}).then(function (res) {
				done("It should have thrown an exception!");
			}).catch(function (err) {
				err.statusCode.should.equal(404);
				err.message.should.equal("");
				done();
			});
		});
	});
});
