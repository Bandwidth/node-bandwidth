var nock = require("nock");
var CatapultClient = require("../index");
var baseUrl = "https://api.catapult.inetwork.com";

describe("Message API", function () {

	var client;

	var userId = "fakeUserId";
	var apiToken = "fakeApiToken";
	var apiSecret = "fakeapiSecret";

	var newTestMessage = {
		from : "+12345678901",
		to   : "+12345678902",
		text : "Hello world."
	};

	var otherTestMessage = {
		from : "+12345678902",
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

	var someOtherTestMessage = {
		"id"        : "fakeMessageId2",
		"messageId" : "fakeMessageId2",
		"from"      : "+12345678902",
		"to"        : "+12345678901",
		"text"      : "I received your test message",
		"time"      : "2012-10-05T20:38:11.023Z",
		"direction" : "in",
		"state"     : "received",
		"media"     : []
	};

	var messagesList = [ testMessage, someOtherTestMessage ];

	var fromDateTime = "2012-10-04";
	var toDateTime = "2012-10-06";

	describe("global methods using single page response", function () {

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.post("/v1/users/" + userId + "/messages", newTestMessage)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/messages/fakeMessageId"
					})
				.post("/v1/users/" + userId + "/messages", [ newTestMessage, otherTestMessage ])
				.reply(202,
					[
						{
							result   : "accepted",
							location : "https://api.catapult.inetwork.com/v1/users/" + userId +
								"/messages/fakeMessageId"
						},
						{
							result : "error",
							error  : {
								category : "bad-request",
								code     : "blank-property",
								message  : "The 'message' resource property 'to' must contain at least" +
									" one non-whitespace character",
								details  : []
							}
						}
					]
				)
				.get("/v1/users/" + userId + "/messages/" + testMessage.id)
				.reply(200, testMessage)
				.get("/v1/users/" + userId + "/messages?fromDateTime=" + fromDateTime + "&" + "toDateTime=" + toDateTime)
				.reply(200, messagesList)
				.patch("/v1/users/" + userId + "/messages/" + testMessage.id, { text : "" })
				.reply(200);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should send a message, promise style", function () {
			return client.Message.send(newTestMessage)
			.then(function (message) {
				message.should.eql(newTestMessage);
			});
		});

		it("should send a message, callback style", function (done) {
			new Promise(function (resolve) {
				client.Message.send(newTestMessage, function (err, message) {
					if (err) {
						throw err;
					}
					message.should.eql(newTestMessage);
					done();
				});
			});
		});

		it("should send multiple messages", function () {
			return client.Message.sendMultiple([ newTestMessage, otherTestMessage ])
			.then(function (messages) {
				messages[0].message.should.eql(newTestMessage);
				messages[1].error.should.eql({
					category : "bad-request",
					code     : "blank-property",
					message  : "The 'message' resource property 'to' must contain at " +
						"least one non-whitespace character",
					details  : []
				});
			});
		});

		it("should get a message, promise style", function () {
			return client.Message.get(testMessage.id)
			.then(function (message) {
				message.should.eql(testMessage);
			});
		});

		it("should get a list of messages, promise style", function () {
			return client.Message.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			})
			.then(function (messageResponse) {
				var messages = messageResponse.messages;
				messages.should.eql(messagesList);
			});
		});

		it("should contain the nextLink in response", function () {
			return client.Message.list({
				fromDateTime : fromDateTime,
				toDateTime   : toDateTime
			})
			.then(function (messageResponse) {
				var nextLink = messageResponse.nextLink;
				nextLink.should.eql({});
			});
		});

		it("should get a list of messages, callback style", function (done) {
			new Promise(function (resolve) {
				client.Message.list({
					fromDateTime : fromDateTime,
					toDateTime   : toDateTime
				}, function (err, messageResponse) {
					if (err) {
						throw err;
					}
					var messages = messageResponse.messages;
					messages.should.eql(messagesList);
					done();
				});
			});
		});

		it("should patch a message, promise style", function () {
			return client.Message.patch(testMessage.id, { text : "" });
		});

		it("should patch a message, callback style", function (done) {
			client.Message.patch(testMessage.id, { text : "" }, done);
		});
	});

	describe("list function with a multiple page response", function () {

		before(function () {
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/messages")
				.reply(200, messagesList, {
					"link" : "<https://api.catapult.inetwork.com" +
						"/v1/users/" + userId + "/messages?" + "sortKeyLT=1>; rel=\"next\""
				})
				.get("/v1/users/" + userId + "/messages?sortKeyLT=1")
				.reply(200, []);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get the next page of messages (if it exists)", function () {
			//Simulating a response which has 1 page of messages
			return client.Message.list()
			.then(function (messageResponse) {

				var messages = messageResponse.messages;

				messages[0].should.eql(messagesList[0]);
				messages[1].should.eql(messagesList[1]);

				return messageResponse.getNextPage();
			})
			.then(function (otherMessageResponse) {

				messages = otherMessageResponse.messages;

				(messages[0] === undefined).should.be.true;

				return otherMessageResponse.getNextPage();
			})
			.catch(function (err) {
				err.should.eql("Next page does not exist.");
			});
		});

		it("should return the nextLink header", function () {
			//Simulating a response which has 1 page of messages
			return client.Message.list()
			.then(function (messageResponse) {

				var nextLink = messageResponse.nextLink;
				nextLink.should.eql({ sortKeyLT : "1" });
			});
		});
	});

	describe("list function with no messages available", function () {

		before(function () {
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/messages")
				.reply(200, []);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should not get the next page of messages", function () {
			//Simulating a response which has 0 pages of messages
			return client.Message.list()
			.then(function (messageResponse) {

				var messages = messageResponse.messages;
				(messages[0] === undefined).should.be.true;

				return messageResponse.getNextPage();
			})
			.catch(function (err) {
				err.should.eql("Next page does not exist.");
			});
		});
	});
});
