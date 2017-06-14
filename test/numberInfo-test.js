var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("NumberInfo API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var number = "234567890";

		var testNumberInfo = {
			"created" : "2013-09-23T16:31:15Z",
			"name"    : "Name",
			"number"  : "{number}",
			"updated" : "2013-09-23T16:42:18Z"
		};

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/phoneNumbers/numberInfo/" + number)
				.reply(200, testNumberInfo);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get a number info, promise style", function () {
			return client.NumberInfo.get(number)
			.then(function (numberInfo) {
				numberInfo.should.eql(testNumberInfo);
			});
		});
	});
});
