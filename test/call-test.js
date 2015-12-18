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
				.reply(200, callsList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should create a call, promise style", function (done) {
			client.Call.create(newTestCall)
			.then(function (call) {
				call.to.should.equal(newTestCall.to);
				call.from.should.equal(newTestCall.from);
				call.id.should.equal("fakeCallId");
			})
			.done(done);
		});

		it("should create a call, callback style", function (done) {
			client.Call.create(newTestCall, function (err, call) {
				if (err) {
					throw err;
				}
				call.to.should.equal(newTestCall.to);
				call.from.should.equal(newTestCall.from);
				call.id.should.equal("fakeCallId");
				done();
			});
		});

		it("should get a call, promise style", function (done) {
			client.Call.get(testCall.id)
			.then(function (call) {
				call.to.should.equal(testCall.to);
				call.from.should.equal(testCall.from);
				call.id.should.equal(testCall.id);
			})
			.done(done);
		});

		it("should get a list of calls, promise style", function (done) {
			client.Call.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			})
			.then(function (calls) {
				calls[0].to.should.equal(callsList[0].to);
				calls[0].from.should.equal(callsList[0].from);
				calls[0].id.should.equal(callsList[0].id);

				calls[1].to.should.equal(callsList[1].to);
				calls[1].from.should.equal(callsList[1].from);
				calls[1].id.should.equal(callsList[1].id);
			})
			.done(done);
		});

		it("should get a list of calls, callback style", function (done) {
			client.Call.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			}, function (err, calls) {
				if (err) {
					throw err;
				}
				calls[0].to.should.equal(callsList[0].to);
				calls[0].from.should.equal(callsList[0].from);
				calls[0].id.should.equal(callsList[0].id);

				calls[1].to.should.equal(callsList[1].to);
				calls[1].from.should.equal(callsList[1].from);
				calls[1].id.should.equal(callsList[1].id);
				done();
			});
		});

	});
});
