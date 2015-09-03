var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Recording = lib.Recording;

describe("Recording", function () {
	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#list", function () {
		var items = [ {
			id    : "1",
			call  : "call1",
			media : "media1"
		}, {
			id    : "2",
			call  : "call2",
			media : "media2"
		} ];

		it("should return list of recordings", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings?page=1").reply(200, items);
			Recording.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return empty list of recordings", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings?page=1").reply(200);
			Recording.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql([]);
				done();
			});
		});

		it("should return list of recordings (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings?page=1").reply(200, items);
			Recording.list({ page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return list of recordings (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings").reply(200, items);
			Recording.list(helper.createClient(),  function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should return list of recordings (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings").reply(200, items);
			Recording.list(function (err, list) {
				if (err) {
					return done(err);
				}

				list.forEach(function (i) {
					delete i.client;
				});

				list.should.eql(items);
				done();
			});
		});

		it("should fail if request failed", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings").reply(500);
			Recording.list(helper.createClient(),  function (err, list) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#get", function () {
		var item = {
			id    : "1",
			call  : "call1",
			media : "media1"
		};

		it("should return a recording", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings/1").reply(200, item);
			Recording.get(helper.createClient(), "1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should return a recording (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings/1").reply(200, item);
			Recording.get("1", function (err, i) {
				if (err) {
					return done(err);
				}

				delete i.client;
				i.should.eql(item);
				done();
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings/1").reply(500);
			Recording.get(helper.createClient(), "1", function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#createTranscription", function () {
		it("should create a transcription", function (done) {
			var item = { id : "101" };
			helper.nock().post("/v1/users/FakeUserId/recordings/1/transcriptions")
				.reply(201, "", {
					"Location" : "/v1/users/FakeUserId/recordings/1/transcriptions/101"
				});
			helper.nock().get("/v1/users/FakeUserId/recordings/1/transcriptions/101").reply(200, item);
			var recording = new Recording();
			recording.id = 1;
			recording.client = helper.createClient();
			recording.createTranscription(function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});

		it("should fail to create a transcription if location is invalid", function (done) {
			var item = { id : "101" };
			helper.nock().post("/v1/users/FakeUserId/recordings/1/transcriptions")
				.reply(201, "", {
					"Location" : "fakeLocation"
				});
			helper.nock().get("/v1/users/FakeUserId/recordings/1/transcriptions/101").reply(200, item);
			var recording = new Recording();
			recording.id = 1;
			recording.client = helper.createClient();
			recording.createTranscription(function (err, i) {
				if (err) {
					err.message.should.equal("Missing id in response");
					return done();
				}

				done(new Error("An error is expected"));
			});
		});

		it("should fail on remote request failing", function (done) {
			helper.nock().post("/v1/users/FakeUserId/recordings/1/transcriptions").reply(500);
			var recording = new Recording();
			recording.id = 1;
			recording.client = helper.createClient();
			recording.createTranscription(function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});

	describe("#getTranscription", function () {
		var item = {
			id : "101"
		};
		it("should return a transcription", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings/1/transcriptions/101").reply(200, item);
			var recording = new Recording();
			recording.id = 1;
			recording.client = helper.createClient();
			recording.getTranscription("101", function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getTranscriptions", function () {
		var items = [ {
			id : "101"
		}, {
			id : "102"
		} ];
		it("should return transcriptions", function (done) {
			helper.nock().get("/v1/users/FakeUserId/recordings/1/transcriptions").reply(200, items);
			var recording = new Recording();
			recording.id = 1;
			recording.client = helper.createClient();
			recording.getTranscriptions(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});
});
