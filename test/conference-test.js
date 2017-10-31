var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Conference API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var newTestConference = {
			from : "+1234567890"
		};

		var changes = {
			state : "completed"
		};

		var testConference = {
			"id"    : "conferenceId",
			"state" : "completed",
			"from"  : "+1234567890"
		};

		var conferencesList = [ testConference	];

		var newTestMember = {
			callId : "callId"
		};

		var testMember = {
			"id"    : "memberId",
			"state" : "active",
			"call"  : "http://.../callId"
		};

		var memberList = [ testMember ];

		var tag = "tag";
		var sampleSentence = "Hello world";
		var speakSentencePayload = {
			sentence : sampleSentence
		};

		var speakSentencePayloadWithTag = {
			sentence : sampleSentence,
			tag      : tag
		};

		var audioUrl = "http://somewhere/something.mp3";
		var playAudioPayload = {
			fileUrl : audioUrl
		};

		var playAudioPayloadWithTag = {
			fileUrl : audioUrl,
			tag     : tag
		};

		var stopFilePlaybackPayload = {
			fileUrl : ""
		};

		var stopSpeakingPayload = {
			sentence : ""
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
				.post("/v1/users/" + userId + "/conferences", newTestConference)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/conferences/fakeConferenceId"
					})
				.get("/v1/users/" + userId + "/conferences/" + testConference.id)
				.reply(200, testConference)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id, changes)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/audio", speakSentencePayload)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/audio", playAudioPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/audio", speakSentencePayloadWithTag)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/audio", stopSpeakingPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/audio", playAudioPayloadWithTag)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/audio", stopFilePlaybackPayload)
				.reply(200)
				.get("/v1/users/" + userId + "/conferences/" + testConference.id + "/members")
				.reply(200, memberList)
				.get("/v1/users/" + userId + "/conferences/" + testConference.id + "/members/" + testMember.id)
				.reply(200, testMember)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/members", newTestMember)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/conferences/fakeConferenceId/members/" + testMember.id
					})
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/members/" + testMember.id, changes)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/members/" +
					testMember.id + "/audio", speakSentencePayload)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/members/" +
					testMember.id + "/audio", playAudioPayload)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/members/" +
					testMember.id + "/audio", speakSentencePayloadWithTag)
				.reply(200)
				.post("/v1/users/" + userId + "/conferences/" + testConference.id + "/members/" +
					testMember.id + "/audio", playAudioPayloadWithTag)
				.reply(200);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should create a conference, promise style", function () {
			return client.Conference.create(newTestConference)
			.then(function (conference) {
				conference.should.eql(newTestConference);
			});
		});

		it("should get a conference, promise style", function () {
			return client.Conference.get(testConference.id)
			.then(function (conference) {
				conference.should.eql(testConference);
			});
		});

		it("should update a conference, promise style", function () {
			return client.Conference.update(testConference.id, changes);
		});

		it("should remove a conference, promise style", function () {
			return client.Conference.remove(testConference.id);
		});

		it("should speak a sentence to the conference, promise style", function () {
			return client.Conference.speakSentence(testConference.id, sampleSentence);
		});

		it("should stop a sentence from speaking, promise style", function () {
			return client.Conference.stopSpeaking(testConference.id);
		});

		it("should play an audio file on sentence to the conference, promise style", function () {
			return client.Conference.playAudioFile(testConference.id, audioUrl);
		});

		it("should play an audio with custom params to the conference, promise style", function () {
			return client.Conference.playAudioAdvanced(testConference.id, { fileUrl : audioUrl });
		});

		it("should stop an audio file playback, promise style", function () {
			return client.Conference.stopAudioFilePlayback(testConference.id);
		});

		it("should get a list of members, promise style", function () {
			return client.Conference.getMembers(testConference.id)
			.then(function (members) {
				members.should.eql(memberList);
			});
		});

		it("should get a member, promise style", function () {
			return client.Conference.getMember(testConference.id, testMember.id)
			.then(function (member) {
				member.should.eql(member);
			});
		});

		it("should add a member, promise style", function () {
			return client.Conference.createMember(testConference.id, newTestMember)
			.then(function (member) {
				member.should.eql(newTestMember);
			});
		});

		it("should update a member, promise style", function () {
			return client.Conference.updateMember(testConference.id, testMember.id, changes);
		});

		it("should remove a member, promise style", function () {
			return client.Conference.removeMember(testConference.id, testMember.id);
		});

		it("should speak a sentence to the member, promise style", function () {
			return client.Conference.speakSentenceToMember(testConference.id, testMember.id, sampleSentence);
		});

		it("should play an audio file on sentence to the member, promise style", function () {
			return client.Conference.playAudioFileToMember(testConference.id, testMember.id, audioUrl);
		});

		it("should play an audio with custom params to the member, promise style", function () {
			return client.Conference.playAudioAdvancedToMember(testConference.id, testMember.id, { fileUrl : audioUrl });
		});
	});
});
