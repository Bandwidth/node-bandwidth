var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Error API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var testError = {
			"time"     : "2012-11-15T01:29:24.512Z",
			"category" : "unavailable",
			"id"       : "userErrorId",
			"message"  : "No application is configured for number +19195556666",
			"code"     : "no-application-for-number"
		};

		var errorsList = [ testError ];

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/errors/" + testError.id)
				.reply(200, testError)
				.get("/v1/users/" + userId + "/errors")
				.reply(200, errorsList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get a error, promise style", function () {
			return client.Error.get(testError.id)
			.then(function (error) {
				error.should.eql(testError);
			});
		});

		it("should get a list of errors, promise style", function () {
			return client.Error.list({ })
			.then(function (errorsResponse) {
				errorsResponse.errors[0].should.eql(errorsList[0]);
			});
		});

		it("should get a list of errors, callback style", function (done) {
			client.Error.list({ }, function (err, errorsResponse) {
				if (err) {
					throw err;
				}
				errorsResponse.errors[0].should.eql(errorsList[0]);
				done();
			});
		});

		it("those errors should not have more pages", function () {
			return client.Error.list({})
			.then(function (errorsResponse) {
				errorsResponse.hasNextPage.should.be.false;
				return errorsResponse.getNextPage()
				.catch(function (err) {
					err.should.equal("Next page does not exist.");
				});
			});
		});

		describe("pagination tests", function () {

			before(function () {
				nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/errors?size=25")
				.reply(200, errorsList,
					{
						"link" : "<https://api.catapult.inetwork.com/v1/users/" + userId +
						"/errors?page=0&size=25>; rel=\"first\"," +
						"<https://api.catapult.inetwork.com/v1/users/" + userId + "/errors>; rel=\"next\""
					});
			});

			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});

			it("should return a list of errors with a page to the next link", function () {
				return client.Error.list({ size : 25 })
				.then(function (errorsResponse) {
					errorsResponse.errors.should.eql(errorsList);
					return errorsResponse.getNextPage();
				})
				.then(function (moreErrors) {
					moreErrors.errors.should.eql(errorsList);
				});
			});
		});
	});
});
