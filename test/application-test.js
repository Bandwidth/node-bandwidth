var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Application API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var applicationsList = [
			{
				"id"                 : "fakeApplicationId",
				"name"               : "fakeApp",
				"incomingCallUrl"    : "http://example.com/calls.php",
				"incomingMessageUrl" : "http://example.com/messages.php",
				"autoAnswer"         : true
			},
			{
				"id"                 : "fakeApplicationId2",
				"name"               : "fakeApp2",
				"incomingCallUrl"    : "http://example.com/calls2.php",
				"incomingMessageUrl" : "http://example.com/messages.php",
				"autoAnswer"         : true
			},
		];

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/applications")
				.reply(200, applicationsList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get a list of applications, promise style", function () {
			return client.Application.get("")
			.then(function (applications) {
				applications[0].id.should.equal(applicationsList[0].id);
				applications[0].name.should.equal(applicationsList[0].name);
				applications[0].incomingCallUrl.should.equal(applicationsList[0].incomingCallUrl);
				applications[0].incomingMessageUrl.should.equal(applicationsList[0].incomingMessageUrl);

				applications[1].id.should.equal(applicationsList[1].id);
				applications[1].name.should.equal(applicationsList[1].name);
				applications[1].incomingCallUrl.should.equal(applicationsList[1].incomingCallUrl);
				applications[1].incomingMessageUrl.should.equal(applicationsList[1].incomingMessageUrl);
			});
		});

		it("should get a list of applications, callback style", function () {
			client.Application.get("", function (err, applications) {
				if (err) {
					throw err;
				}
				applications[0].id.should.equal(applicationsList[0].id);
				applications[0].name.should.equal(applicationsList[0].name);
				applications[0].incomingCallUrl.should.equal(applicationsList[0].incomingCallUrl);
				applications[0].incomingMessageUrl.should.equal(applicationsList[0].incomingMessageUrl);

				applications[1].id.should.equal(applicationsList[1].id);
				applications[1].name.should.equal(applicationsList[1].name);
				applications[1].incomingCallUrl.should.equal(applicationsList[1].incomingCallUrl);
				applications[1].incomingMessageUrl.should.equal(applicationsList[1].incomingMessageUrl);
			});
		});
	});
});