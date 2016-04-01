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

		it("should get a recording", function (done) {
			client.Recording.get(testRecording.id)
			.then(function (recording) {
				recording.id.should.equal(testRecording.id);
				recording.media.should.equal(testRecording.media);
				recording.startTime.should.equal(testRecording.startTime);
				recording.endTime.should.equal(testRecording.endTime);
			})
			.done(done);
		});

		it("should get a list of messages, promise style", function (done) {
			client.Recording.list()
			.then(function (recordings) {
				recordings[0].id.should.equal(recordingList[0].id);
				recordings[0].media.should.equal(recordingList[0].media);
				recordings[0].startTime.should.equal(recordingList[0].startTime);
				recordings[0].endTime.should.equal(recordingList[0].endTime);

				recordings[1].id.should.equal(recordingList[1].id);
				recordings[1].media.should.equal(recordingList[1].media);
				recordings[1].startTime.should.equal(recordingList[1].startTime);
				recordings[1].endTime.should.equal(recordingList[1].endTime);
			})
			.done(done);
		});

	});
});
