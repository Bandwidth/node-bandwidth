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

		var rejectCallPayload = {
			state : "rejected"
		};

		var hangupCallPayload = {
			state : "completed"
		};

		var transferCallPayload = {
			transferTo       : "+1234567891",
			transferCallerId : "private",
			state            : "transferring"
		};

		var sampleSentence = "Hello world";
		var speakSentencePayload = {
			sentence : sampleSentence
		};

		var stopSpeakingPayload = {
			sentence : ""
		};

		var audioUrl = "http://somewhere/something.mp3";
		var playAudioPayload = {
			fileUrl : audioUrl
		};

		var stopFilePlaybackPayload = {
			fileUrl : ""
		};

		var enableRecordingPayload = {
			recordingEnabled : true
		};

		var disableRecordingPayload = {
			recordingEnabled : false
		};

		var maxRecordingDuration = 90;
		var setRecordingMaxDurationPayload = {
			recordingMaxDuration : maxRecordingDuration
		};

		var fromDateTime = "2012-10-04";
		var toDateTime = "2012-10-06";

		var newTestGather = {
			maxDigits         : "5",
			terminatingDigits : "*",
			interDigitTimeout : "7",
			prompt            : {
				sentence : "Please enter your 5 digit code"
			}
		};

		var testGather = {
			id            : "gatherId",
			state         : "completed",
			reason        : "max-digits",
			createdTime   : "2014-02-12T19:33:56Z",
			completedTime : "2014-02-12T19:33:59Z",
			call          : "https://api.catapult.inetwork.com/v1/users/{userId}/calls/{callId}",
			digits        : "123"
		};

		var completeGather = {
			state : "completed"
		};

		var testEvent = {
			"id"   : "callEventId1",
			"time" : "2012-09-19T13:55:41.343Z",
			"name" : "create"
		};

		var eventList = [ testEvent ];

		var recordingList = [
			{
				"endTime"   : "2013-02-08T12:06:55.007Z",
				"id"        : "{recordingId1}",
				"media"     : "https://.../v1/users/.../media/{callId}-1.wav",
				"call"      : "https://.../v1/users/.../calls/{callId}",
				"startTime" : "2013-02-08T12:05:17.807Z",
				"state"     : "complete"
			}
		];

		var transcriptionList = [
			{
				"chargeableDuration" : 60,
				"id"                 : "{transcription-id}",
				"state"              : "completed",
				"time"               : "2014-10-09T12:09:16Z",
				"text"               : "{transcription-text}",
				"textSize"           : 3627,
				"textUrl"            : "{url-to-full-text}"
			}
		];

		var dtmfOut = {
			"dtmfOut" : "1234"
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
				.post("/v1/users/" + userId + "/calls/" + testCall.id, rejectCallPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id, hangupCallPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id, transferCallPayload)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/calls/transferedCallId"
					})
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/audio", speakSentencePayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/audio", stopSpeakingPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/audio", playAudioPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id, setRecordingMaxDurationPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/audio", stopFilePlaybackPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/gather", newTestGather)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/calls/" + testCall.id + "/gather/gatherId"
					})
				.get("/v1/users/" + userId + "/calls/" + testCall.id + "/gather/" + testGather.id)
				.reply(200, testGather)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/gather/" + testGather.id, completeGather)
				.reply(200)
				.get("/v1/users/" + userId + "/calls/" + testCall.id + "/events/" + testEvent.id)
				.reply(200, testEvent)
				.get("/v1/users/" + userId + "/calls/" + testCall.id + "/events")
				.reply(200, eventList)
				.get("/v1/users/" + userId + "/calls/" + testCall.id + "/recordings")
				.reply(200, recordingList)
				.get("/v1/users/" + userId + "/calls/" + testCall.id + "/transcriptions")
				.reply(200, transcriptionList)
				.post("/v1/users/" + userId + "/calls/" + testCall.id + "/dtmf", dtmfOut)
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

		it("should reject a call", function () {
			return client.Call.reject(testCall.id);
		});

		it("should complete a call", function () {
			return client.Call.hangup(testCall.id);
		});

		it("should transfer a call", function () {
			return client.Call.transfer(testCall.id, { transferTo : "+1234567891", transferCallerId : "private" })
			.then(function (call) {
				call.id.should.eql("transferedCallId");
			});
		});

		it("should speak a sentence to the call, promise style", function () {
			return client.Call.speakSentence(testCall.id, sampleSentence);
		});

		it("should speak a sentence to the call, callback style", function (done) {
			client.Call.speakSentence(testCall.id, sampleSentence, done);
		});

		it("should stop audio file playback, promise style", function () {
			return client.Call.stopSpeaking(testCall.id);
		});

		it("should stop audio file playback, callback style", function (done) {
			client.Call.stopSpeaking(testCall.id, done);
		});

		it("should play an audio file on sentence to the call, promise style", function () {
			return client.Call.playAudioFile(testCall.id, audioUrl);
		});

		it("should play an audio file on sentence to the call, callback style", function (done) {
			client.Call.playAudioFile(testCall.id, audioUrl, done);
		});

		it("should play an audio with custom params to the call, promise style", function () {
			return client.Call.playAudioAdvanced(testCall.id, { fileUrl : audioUrl });
		});

		it("should play an audio with custom params to the call, callback style", function (done) {
			client.Call.playAudioAdvanced(testCall.id, { fileUrl : audioUrl }, done);
		});

		it("should stop audio file playback, promise style", function () {
			return client.Call.stopAudioFilePlayback(testCall.id);
		});

		it("should stop audio file playback, callback style", function (done) {
			client.Call.stopAudioFilePlayback(testCall.id, done);
		});

		describe("Recording toggle", function () {

			describe("turn recording on", function () {

				before(function () {
					nock("https://api.catapult.inetwork.com")
					.persist()
					.post("/v1/users/" + userId + "/calls/" + testCall.id, enableRecordingPayload)
					.reply(200);
				});

				after(function () {
					nock.cleanAll();
					nock.enableNetConnect();
				});

				it("should enable recording on a call", function () {
					return client.Call.enableRecording(testCall.id);
				});

			});

			describe("turn recording off", function () {

				before(function () {
					nock("https://api.catapult.inetwork.com")
					.persist()
					.post("/v1/users/" + userId + "/calls/" + testCall.id, disableRecordingPayload)
					.reply(200);
				});

				after(function () {
					nock.cleanAll();
					nock.enableNetConnect();
				});

				it("should disable recording on a call", function () {
					return client.Call.disableRecording(testCall.id);
				});

			});
		});

		it("should set the maximum recording duration on a call", function () {
			return client.Call.setMaxRecordingDuration(testCall.id, maxRecordingDuration);
		});

		it("should create a call, callback style", function (done) {
			new Promise(function (resolve) {
				client.Call.create(newTestCall, function (err, call) {
					if (err) {
						throw err;
					}
					call.should.eql(newTestCall);
					done();
				});
			});
		});

		it("should get a call, promise style", function () {
			return client.Call.get(testCall.id)
			.then(function (call) {
				call.should.eql(testCall);
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
			new Promise(function (resolve) {
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

		it("should create a gather for the call", function () {
			return client.Call.createGather(testCall.id, newTestGather)
			.then(function (gather) {
				gather.should.eql(newTestGather);
			});
		});

		it("should get a gather", function () {
			return client.Call.getGather(testCall.id, testGather.id)
			.then(function (gather) {
				gather.should.eql(testGather);
			});
		});

		it("should complete a gather", function () {
			return client.Call.completeGather(testCall.id, testGather.id);
		});

		it("should get events", function () {
			return client.Call.getEvents(testCall.id)
			.then(function (list) {
				list.should.eql(eventList);
			});
		});

		it("should get a single event", function () {
			return client.Call.getEvent(testCall.id, testEvent.id)
			.then(function (callEvent) {
				callEvent.should.eql(testEvent);
			});
		});

		it("should get recordings", function () {
			return client.Call.getRecordings(testCall.id)
			.then(function (list) {
				list.should.eql(recordingList);
			});
		});

		it("should get transcriptions", function () {
			return client.Call.getTranscriptions(testCall.id)
			.then(function (list) {
				list.should.eql(transcriptionList);
			});
		});

		it("should send dtmf string", function () {
			return client.Call.sendDtmf(testCall.id, dtmfOut.dtmfOut);
		});
	});
});
