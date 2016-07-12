var nock = require("nock");
var Client = require("../lib/client");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Client", function () {

	var accountResponse = {
		balance     : "20.00",
		accountType : "pre-pay"
	};

	var availableNumbersResponse = [
		{
			number         : "+15555555555",
			nationalNumber : "(555) 555-5555",
			city           : "ALHAMBRA",
			rateCenter     : "ALHAMBRA",
			state          : "CA",
			price          : "0.00"
		},
		{
			number         : "+15555555556",
			nationalNumber : "(555) 555-5556",
			city           : "ALHAMBRA",
			rateCenter     : "ALHAMBRA",
			state          : "CA",
			price          : "0.00"
		}
	];

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

		it("should make requests to the default baseUrl", function () {
			return client.makeRequest({
				path : "account"
			}).then(function (res) {
				res.body.should.eql(accountResponse);
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
	});

	describe("when no user path is needed", function () {
		var client;

		before(function () {
			client = new Client({
				userId   : "fakeUserId",
				apiToken : "fakeApiToken",
				apiKey   : "fakeApiKey"
			});

			nock(baseUrl)
				.persist()
				.get("/v1/availableNumbers/local?state=CA")
				.reply(200, availableNumbersResponse);
		});

		after(function () {
			nock.cleanAll();
		});

		it("should make requests to the default baseUrl with no user path", function () {
			return client.makeRequestNoUser({
				path : "availableNumbers/local",
				qs   : { state : "CA" }
			}).then(function (res) {
				res.body.should.eql(availableNumbersResponse);
			});
		});
	});
});
