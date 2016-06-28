var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Call API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var newTestCall = {
			from : "+12345678901",
			to   : "+12345678902",
		};

		var testCall = {
			"id"                 : "fakeCallId",
			"direction"          : "out",
			"from"               : "{fromNumber}",
			"to"                 : "{number}",
			"recordingEnabled"   : false,
			"callbackUrl"        : "",
			"state"              : "completed",
			"startTime"          : "2013-02-08T13:15:47.587Z",
			"activeTime"         : "2013-02-08T13:15:52.347Z",
			"endTime"            : "2013-02-08T13:15:55.887Z",
			"chargeableDuration" : 60,
			"events"             : "https://.../calls/fakeCallId/events",
			"sipHeaders"         : {
				"X-Header-1" : "value-1",
				"X-Header-2" : "value2"
			}
		};

		var callsList = [
			{
				"id"                 : "fakeCallId1",
				"direction"          : "out",
				"from"               : "{fromNumber}",
				"to"                 : "{toNumber1}",
				"recordingEnabled"   : false,
				"callbackUrl"        : "",
				"state"              : "completed",
				"startTime"          : "2013-02-08T13:15:47.587Z",
				"activeTime"         : "2013-02-08T13:15:52.347Z",
				"endTime"            : "2013-02-08T13:15:55.887Z",
				"chargeableDuration" : 60,
				"events"             : "https://.../calls/fakeCallId1/events"
			},
			{
				"id"               : "fakeCallId2",
				"direction"        : "out",
				"from"             : "{fromNumber}",
				"to"               : "{toNumber2}",
				"recordingEnabled" : false,
				"callbackUrl"      : "",
				"state"            : "active",
				"startTime"        : "2013-02-08T13:15:47.587Z",
				"activeTime"       : "2013-02-08T13:15:52.347Z",
				"events"           : "https://.../calls/fakeCallId2/events"
			}
		];

		var answerCallPayload = {
			state : "active"
		};

		var sampleSentence = "Hello world";
		var speakSentencePayload = {
			sentence : sampleSentence
		};

		var audioUrl = "http://somewhere/something.mp3";
		var playAudioPayload = {
			fileUrl : audioUrl
		};

		var enableRecordingPayload = {
			recordingEnabled : true
		};

		var maxRecordingDuration = 90;
		var setRecordingMaxDurationPayload = {
			recordingMaxDuration : maxRecordingDuration
		};

		var fromDateTime = "2012-10-04";
		var toDateTime = "2012-10-06";

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.post("/v1/users/" + userId + "/calls", newTestCall)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/calls/fakeCallId"
					})
				.get("/v1/users/" + userId + "/calls/" + testCall.id)
				.reply(200, testCall)
				.get("/v1/users/" + userId + "/calls?fromDateTime=" + fromDateTime + "&" + "toDateTime=" + toDateTime)
				.reply(200, callsList)
				.post("/v1/users/" + userId + "/calls/" + testCall.id, answerCallPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/audio", speakSentencePayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/audio", playAudioPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id, enableRecordingPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id, setRecordingMaxDurationPayload)
				.reply(200);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should create a call, promise style", function () {
			return client.Call.create(newTestCall)
			.then(function (call) {
				call.should.eql(newTestCall);
			});
		});

		it("should answer a call", function () {
			return client.Call.answer(testCall.id);
		});

		it("should speak a sentence on a call", function () {
			return client.Call.speakSentence(testCall.id, sampleSentence);
		});

		it("should play an audio file on sentence on a call", function () {
			return client.Call.playAudio(testCall.id, audioUrl);
		});

		it("should enable recording on a call", function () {
			return client.Call.enableRecording(testCall.id);
		});

		it("should set the maximum recording duration on a call", function () {
			return client.Call.setMaxRecordingDuration(testCall.id, maxRecordingDuration);
		});

		it("should create a call, callback style", function (done) {
			client.Call.create(newTestCall, function (err, call) {
				if (err) {
					throw err;
				}
				call.should.eql(newTestCall);
				done();
			});
		});

		it("should get a call, promise style", function () {
			return client.Call.get(testCall.id)
			.then(function (call) {
				call.should.eql(testCall)
			});
		});

		it("should get a list of calls, promise style", function () {
			return client.Call.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			})
			.then(function (calls) {
				calls[0].should.eql(callsList[0]);
				calls[1].should.eql(callsList[1]);
			});
		});

		it("should get a list of calls, callback style", function (done) {
			client.Call.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			}, function (err, calls) {
				if (err) {
					throw err;
				}
				calls[0].should.eql(callsList[0]);
				calls[1].should.eql(callsList[1]);
				done();
			});
		});

	});
});
