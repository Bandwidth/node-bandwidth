var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var ConferenceMember = lib.ConferenceMember;

describe("ConferenceMember", function () {
	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#update", function () {
		it("should update a member", function (done) {
			var data = { mute : true };
			helper.nock().post("/v1/users/FakeUserId/conferences/1/members/10", data).reply(200);
			var member = new ConferenceMember();
			member.id = 10;
			member.conferenceId = 1;
			member.client = helper.createClient();
			member.update(data, done);
		});

		it("should fail on remote request failing", function (done) {
			var data = { mute : true };
			helper.nock().post("/v1/users/FakeUserId/conferences/1/members/10", data).reply(400);
			var member = new ConferenceMember();
			member.id = 10;
			member.conferenceId = 1;
			member.client = helper.createClient();
			member.update(data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#playAudio", function () {
		var data = { fileUrl : "http://host1" };

		it("should play an audio to a member", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences/1/members/10/audio", data).reply(200);
			var member = new ConferenceMember();
			member.id = 10;
			member.conferenceId = 1;
			member.client = helper.createClient();
			member.playAudio(data, done);
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/conferences/1/members/10/audio", data).reply(400);
			var member = new ConferenceMember();
			member.id = 10;
			member.conferenceId = 1;
			member.client = helper.createClient();
			member.playAudio(data, function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});
});
