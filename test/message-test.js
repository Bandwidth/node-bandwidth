var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Message API", function () {

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

		var testMessage = {
			"id"        : "fakeMessageId",
			"messageId" : "fakeMessageId",
			"from"      : "+12345678901",
			"to"        : "+12345678902",
			"text"      : "Good morning, this is a test message",
			"time"      : "2012-10-05T20:37:38.048Z",
			"direction" : "out",
			"state"     : "sent",
			"media"     : []
		};

		var messagesList = [
			{
				"id"        : "fakeMessageId1",
				"messageId" : "fakeMessageId1",
				"from"      : "+12345678901",
				"to"        : "+12345678902",
				"text"      : "Good morning, this is a test message",
				"time"      : "2012-10-05T20:37:38.048Z",
				"direction" : "out",
				"state"     : "sent",
				"media"     : []
			},
			{
				"id"        : "fakeMessageId2",
				"messageId" : "fakeMessageId2",
				"from"      : "+12345678902",
				"to"        : "+12345678901",
				"text"      : "I received your test message",
				"time"      : "2012-10-05T20:38:11.023Z",
				"direction" : "in",
				"state"     : "received",
				"media"     : []
			},
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
				.post("/v1/users/" + userId + "/messages", newTestMessage.id)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/messages/fakeMessageId"
					})
				.get("/v1/users/" + userId + "/messages/" + testMessage.id)
				.reply(200, testMessage)
				.get("/v1/users/" + userId + "/messages?fromDateTime=" + fromDateTime + "&" + "toDateTime=" + toDateTime)
				.reply(200, messagesList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should send a message, promise style", function (done) {
			client.Message.send(newTestMessage)
			.then(function (message) {
				message.to.should.equal(newTestMessage.to);
				message.from.should.equal(newTestMessage.from);
				message.text.should.equal(newTestMessage.text);
				message.id.should.equal("fakeMessageId");
			})
			.done(done);
		});

		it("should send a message, callback style", function (done) {
			client.Message.send(newTestMessage, function (err, message) {
				if (err) {
					throw err;
				}
				message.to.should.equal(newTestMessage.to);
				message.from.should.equal(newTestMessage.from);
				message.text.should.equal(newTestMessage.text);
				message.id.should.equal("fakeMessageId");
				done();
			});
		});

		it("should get a message, promise style", function (done) {
			client.Message.get(testMessage.id)
			.then(function (message) {
				message.to.should.equal(testMessage.to);
				message.from.should.equal(testMessage.from);
				message.text.should.equal(testMessage.text);
				message.time.should.equal(testMessage.time);
				message.id.should.equal(testMessage.id);
			})
			.done(done);
		});

		it("should get a list of messages, promise style", function (done) {
			client.Message.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			})
			.then(function (messageResponse) {

				var messages = messageResponse.messages;

				messages[0].to.should.equal(messagesList[0].to);
				messages[0].from.should.equal(messagesList[0].from);
				messages[0].text.should.equal(messagesList[0].text);
				messages[0].id.should.equal(messagesList[0].id);

				messages[1].to.should.equal(messagesList[1].to);
				messages[1].from.should.equal(messagesList[1].from);
				messages[1].text.should.equal(messagesList[1].text);
				messages[1].id.should.equal(messagesList[1].id);
			})
			.done(done);
		});

		it("should get a list of messages, callback style", function (done) {
			client.Message.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			}, function (err, messageResponse) {
				if (err) {
					throw err;
				}

				var messages = messageResponse.messages;

				messages[0].to.should.equal(messagesList[0].to);
				messages[0].from.should.equal(messagesList[0].from);
				messages[0].text.should.equal(messagesList[0].text);
				messages[0].id.should.equal(messagesList[0].id);

				messages[1].to.should.equal(messagesList[1].to);
				messages[1].from.should.equal(messagesList[1].from);
				messages[1].text.should.equal(messagesList[1].text);
				messages[1].id.should.equal(messagesList[1].id);
				done();
			});
		});

	});
});
