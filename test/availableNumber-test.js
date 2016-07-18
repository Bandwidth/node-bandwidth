var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("AvailableNumber API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var query = { areaCode : "910" };

		var foundNumberList = [ {
			"number"         : "{number1}",
			"nationalNumber" : "{national_number1}",
			"patternMatch"   : "          2 9 ",
			"city"           : "CARY",
			"lata"           : "426",
			"rateCenter"     : "CARY",
			"state"          : "NC",
			"price"          : "0.60"
		} ];

		var orderedNumberList = [ {
			"number"         : "{number1}",
			"nationalNumber" : "{national_number1}",
			"price"          : "0.60",
			"location"       : "https://.../v1/users/.../phoneNumbers/numberId1"
		} ];

		var orderedNumber = {
			"id"             : "numberId1",
			"number"         : "{number1}",
			"nationalNumber" : "{national_number1}",
			"price"          : "0.60",
			"location"       : "https://.../v1/users/.../phoneNumbers/numberId1"
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
				.get("/v1/availableNumbers/local?areaCode=910")
				.reply(200, foundNumberList)
				.post("/v1/availableNumbers/local?areaCode=910")
				.reply(200, orderedNumberList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should search available numbers", function () {
			return client.AvailableNumber.search("local", { areaCode : "910" })
			.then(function (numbers) {
				numbers[0].should.eql(foundNumberList[0]);
			});
		});

		it("should search available numbers and order them", function () {
			return client.AvailableNumber.searchAndOrder("local", { areaCode : "910" })
			.then(function (numbers) {
				numbers[0].should.eql(orderedNumber);
			});
		});
	});
});
