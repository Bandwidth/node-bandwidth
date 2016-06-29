var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Recording API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var newTestMessage = {
			from : "+12345678901",
			to   : "+12345678902",
			text : "Hello world."
		};

		var testRecording = {
			"endTime"   : "2013-02-08T13:17:12.181Z",
			"id"        : "fakeRecordingId",
			"media"     : "https://.../v1/users/.../media/c-bonay3r4mtwbplurq4nkt7q-1.wav",
			"call"      : "https://.../v1/users/.../calls/{callId}",
			"startTime" : "2013-02-08T13:15:47.587Z",
			"state"     : "complete"
		};

		var recordingList = [
			{
				"endTime"   : "2013-02-08T13:17:12.181Z",
				"id"        : "fakeRecordingId1",
				"media"     : "https://.../v1/users/.../media/c-bonay3r4mtwbplurq4nkt7q-1.wav",
				"call"      : "https://.../v1/users/.../calls/{callId}",
				"startTime" : "2013-02-08T13:15:47.587Z",
				"state"     : "complete"
			},
			{
				"endTime"   : "2013-02-08T13:17:12.181Z",
				"id"        : "fakeRecordingId2",
				"media"     : "https://.../v1/users/.../media/c-bonay3r4mtwbplurq4nkt7q-1.wav",
				"call"      : "https://.../v1/users/.../calls/{callId}",
				"startTime" : "2013-02-08T13:15:47.587Z",
				"state"     : "complete"
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
				.get("/v1/users/" + userId + "/recordings/" + testRecording.id)
				.reply(200, testRecording)
				.get("/v1/users/" + userId + "/recordings")
				.reply(200, recordingList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get a recording", function () {
			return client.Recording.get(testRecording.id)
			.then(function (recording) {
				recording.should.eql(testRecording);
			});
		});

		it("should get a list of messages, promise style", function () {
			return client.Recording.list()
			.then(function (recordings) {
				recordings.should.eql(recordingList);
			});
		});

	});
});
