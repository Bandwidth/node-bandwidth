var nock = require("nock");
var Client = require("../lib/client");
var RateLimitError = require("../lib/RateLimitError");
var UnexpectedResponseError = require("../lib/unexpectedResponseError");

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
				.reply(200, accountResponse)
				.post("/v1/users/fakeUserId/201endpoint")
				.reply(201,{},{})
				.post("/v1/users/fakeUserId/202endpoint")
				.reply(202,{},{});
		});

		after(function () {
			nock.cleanAll();
		});

		it("should make requests to the default baseUrl", function () {
			return client.makeRequest({
				path : "account"
			}).then(function (res) {
				res.body.should.eql(accountResponse);
			});
		});

		it("should not error on 200 responses", function () {
			return client.makeRequest({
				path : "account"
			}).then(function (res) {
				res.statusCode.should.eql(200);
			});
		});

		it("should not error on 201 responses", function () {
			return client.makeRequest({
				path   : "201endpoint",
				method : "POST"
			}).then(function (res) {
				res.statusCode.should.eql(201);
			});
		});

		it("should not error on 202 responses", function () {
			return client.makeRequest({
				path   : "202endpoint",
				method : "POST"
			}).then(function (res) {
				res.statusCode.should.eql(202);
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

		it("should make requests to the custom baseUrl", function () {
			var accountResponse = {
				balance     : "20.00",
				accountType : "pre-pay"
			};

			nock(baseUrl).get("/v1/users/fakeUserId/account").reply(200, accountResponse);
			return client.makeRequest({
				path : "account"
			}).then(function (res) {
				res.body.should.eql(accountResponse);
			});
		});

	});

	describe("using path without user", function () {
		var client;
		var oldBaseUrl;

		before(function () {
			client = new Client({
				userId   : "fakeUserId",
				apiToken : "fakeApiToken",
				apiKey   : "fakeApiKey"
			});
		});

		after(function () {
			nock.cleanAll();
		});

		it("should make requests without user data in the path", function () {
			var numbersResponse = [];
			nock(baseUrl).get("/v1/availableNumbers").reply(200, numbersResponse);
			return client.makeRequest({
				path            : "availableNumbers",
				pathWithoutUser : true
			}).then(function (res) {
				res.body.should.eql(numbersResponse);
			});
		});

	});

	describe("in error cases", function () {
		var client;
		var limitReset = 1501782812222;

		var rateLimitBody = {
			"category" : "too-many-requests",
			"code"     : "rate-limit-reached",
			"details"  : [
				{
					"name"  : "requestPath",
					"value" : "availableNumbers/local"
				},
				{
					"name"  : "remoteAddress",
					"value" : "107.197.154.30"
				},
				{
					"name"  : "rateLimitResetTime",
					"value" : "1501782812222"
				},
				{
					"name"  : "requestMethod",
					"value" : "GET"
				}
			]
		};

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
				.get("/v1/users/fakeUserId/RateLimit")
				.reply(429, rateLimitBody, { "X-RateLimit-Reset" : limitReset })
				.get("/v1/users/fakeUserId/RateLimitError")
				.reply(429, rateLimitBody)
				.get("/v1/users/fakeUserId/unknown2")
				.reply(404, {});
		});

		after(function () {
			nock.cleanAll();
		});

		it("should throw exceptions on unexpected HTTP responses", function () {
			return client.makeRequest({
				path : "account"
			}).then(function (res) {
				throw new Error("It should have thrown an exception!");
			}).catch(function (err) {
				err.statusCode.should.equal(401);
				err.message.should.equal("Something bad happened...");
			});
		});

		it("should throw exceptions on unexpected HTTP responses with no response body", function () {
			return client.makeRequest({
				path : "unknown"
			}).then(function (res) {
				throw new Error("It should have thrown an exception!");
			}).catch(function (err) {
				err.statusCode.should.equal(404);
				err.message.should.equal("");
			});
		});

		it("should throw exceptions on unexpected HTTP responses with an empty response body", function () {
			return client.makeRequest({
				path : "unknown2"
			}).then(function (res) {
				throw new Error("It should have thrown an exception!");
			}).catch(function (err) {
				err.statusCode.should.equal(404);
				err.message.should.equal("");
			});
		});

		it("should return RateLimit Error on 429", function () {
			return client.makeRequest({
				path : "RateLimit"
			})
			.then(function (res) {
				throw new Error("It should have been an exception");
			})
			.catch(function (err) {
				err.statusCode.should.equal(429);
				err.limitReset.should.equal(limitReset);
				err.message.should.deepEqual(rateLimitBody);
				err.should.be.instanceOf(RateLimitError);
			});
		});

		it("should return UnexpectedResponseError Error on 429 when X-RateLimit-Reset is not present", function () {
			return client.makeRequest({
				path : "RateLimitError"
			})
			.then(function (res) {
				throw new Error("It should have been an exception");
			})
			.catch(function (err) {
				err.statusCode.should.equal(429);
				err.should.be.instanceOf(UnexpectedResponseError);
			});
		});
	});
});
