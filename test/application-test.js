var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Application API", function () {

	describe("global methods", function () {
		var client;
		var requestSpy;
		var updateNock;
		var deleteNock;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var page = 1;
		var size = 1;

		var applicationsList = [
			{
				"id"                 : "fakeApplicationId",
				"name"               : "fakeApp",
				"incomingCallUrl"    : "http://example.com/calls.php",
				"incomingMessageUrl" : "http://example.com/messages.php",
				"autoAnswer"         : true
			},
			{
				"id"                 : "fakeApplicationId2",
				"name"               : "fakeApp2",
				"incomingCallUrl"    : "http://example.com/calls2.php",
				"incomingMessageUrl" : "http://example.com/messages2.php",
				"autoAnswer"         : true
			},
		];

		var newApplication = {
			"name"               : "NewApplication",
			"incomingCallUrl"    : "http://example.com/calls3.php",
			"incomingMessageUrl" : "http://example.com/messages3.php",
			"autoAnswer"         : true
		};

		var testApplication = {
			"id"                 : "fakeTestApplicationId",
			"name"               : "NewApplication",
			"incomingCallUrl"    : "http://example.com/calls3.php",
			"incomingMessageUrl" : "http://example.com/messages3.php",
			"autoAnswer"         : true
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
				.get("/v1/users/" + userId + "/applications")
				.reply(200, applicationsList,
					{
						"link" : "<https://api.catapult.inetwork.com/v1/users/" + userId + "/applications?page=0&size=25>; rel='first'"
					})
				.post("/v1/users/" + userId + "/applications")
				.reply(201,
					{},
					{
						"location" : "/v1/users/" + userId + "/messages/fakeApplicationId3"
					})
				.get("/v1/users/" + userId + "/applications/" + testApplication.id)
				.reply(200, testApplication)
				.get("/v1/users/" + userId + "/applications?page=" + page + "&size=" + size)
				.reply(200, applicationsList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get a list of applications, promise style", function () {
			return client.Application.list({})
			.then(function (applicationsResponse) {
				applicationsResponse.applications.should.eql(applicationsList);
			});
		});

		it("should get a list of applications, callback style", function () {
			client.Application.list({}, function (err, applicationsResponse) {
				if (err) {
					throw err;
				}
				applicationsResponse.applications.should.eql(applicationsList);
			});
		});

		it("those applications should not have more pages", function () {
			return client.Application.list({})
			.then(function (applicationsResponse) {
				applicationsResponse.hasNextPage.should.be.false;
				return applicationsResponse.getNextPage()
				.catch(function (err) {
					err.should.equal("Next page does not exist.");
				});
			});
		});

		it("should create an application, promise style", function () {
			return client.Application.create(newApplication)
			.then(function (applicationResponse) {
				applicationResponse.id.should.equal("fakeApplicationId3");
				applicationResponse.name.should.equal(newApplication.name);
				applicationResponse.incomingCallUrl.should.equal(newApplication.incomingCallUrl);
				applicationResponse.incomingMessageUrl.should.equal(newApplication.incomingMessageUrl);
				applicationResponse.autoAnswer.should.equal(newApplication.autoAnswer);
			});
		});

		it("should create an application, callback style", function () {
			client.Application.create(newApplication, function (err, applicationResponse) {
				if (err) {
					throw err;
				}
				applicationResponse.id.should.equal("fakeApplicationId3");
				applicationResponse.name.should.equal(newApplication.name);
				applicationResponse.incomingCallUrl.should.equal(newApplication.incomingCallUrl);
				applicationResponse.incomingMessageUrl.should.equal(newApplication.incomingMessageUrl);
				applicationResponse.autoAnswer.should.equal(newApplication.autoAnswer);
			});
		});

		it("should get an application, promise style", function () {
			return client.Application.get(testApplication.id)
			.then(function (applicationResponse) {
				applicationResponse.should.eql(testApplication);
			});
		});

		it("should get an application, callback style", function () {
			client.Application.get(testApplication.id, function (err, applicationResponse) {
				if (err) {
					throw err;
				}
				applicationResponse.should.eql(testApplication);
			});
		});

		describe("testing global void methods", function () {

			describe("updating applications", function () {

				beforeEach(function () {
					updateNock = nock("https://api.catapult.inetwork.com")
					.persist()
					.post("/v1/users/" + userId + "/applications/" + testApplication.id)
					.reply(200, {});
				});

				afterEach(function () {
					nock.cleanAll();
				});

				it("should update an application, promise style", function () {
					return client.Application.update(testApplication.id, { name : "newTestApplication" })
					.then(function () {
						updateNock.isDone().should.equal(true);
					});
				});

				it("should update an application, callback style", function () {
					client.Application.update(testApplication.id, { name : "anotherNewTestApplication" }, function (err, response) {
						if (err) {
							throw err;
						}
						updateNock.isDone().should.equal(true);
					});
				});
			});

			describe("deleting applications", function () {

				beforeEach(function () {
					deleteNock = nock("https://api.catapult.inetwork.com")
					.persist()
					.delete("/v1/users/" + userId + "/applications/" + testApplication.id)
					.reply(200, {});
				});

				afterEach(function () {
					nock.cleanAll();
				});

				it("should delete an application, promise style", function () {
					return client.Application.delete(testApplication.id)
					.then(function () {
						deleteNock.isDone().should.equal(true);
					});
				});

				it("should delete an application, callback style", function () {
					client.Application.delete(testApplication.id, function (err, response) {
						if (err) {
							throw err;
						}
						deleteNock.isDone().should.equal(true);
					});
				});
			});
		});

		describe("pagination tests", function () {

			before(function () {
				nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/applications")
				.reply(200, applicationsList,
					{
						"link" : "<https://api.catapult.inetwork.com/v1/users/" + userId +
						"/applications?page=0&size=25>; rel=\"first\"," +
						"<https://api.catapult.inetwork.com/v1/users/" + userId + "/applications>; rel=\"next\""
					});
			});

			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});

			it("should return a list of applications with a page to the next link", function () {
				return client.Application.list({})
				.then(function (applicationsResponse) {
					applicationsResponse.applications.should.eql(applicationsList);
					return applicationsResponse.getNextPage();
				})
				.then(function (moreApplications) {
					moreApplications.applications.should.eql(applicationsList);
				});
			});
		});
	});
});