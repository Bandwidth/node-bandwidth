var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("PhoneNumber API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var newTestPhoneNumber = {
			number : "+1234567890",
			name   : "my number"
		};

		var changes = {
			name : "main"
		};

		var testPhoneNumber = {
			"id"             : "phoneNumberId",
			"number"         : "+1234567890",
			"nationalNumber" : "(234) 567-890"
		};

		var phoneNumbersList = [ testPhoneNumber ];

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.post("/v1/users/" + userId + "/phoneNumbers", newTestPhoneNumber)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/phoneNumbers/fakePhoneNumberId"
					})
				.get("/v1/users/" + userId + "/phoneNumbers/" + testPhoneNumber.id)
				.reply(200, testPhoneNumber)
				.get("/v1/users/" + userId + "/phoneNumbers")
				.reply(200, phoneNumbersList)
				.post("/v1/users/" + userId + "/phoneNumbers/" + testPhoneNumber.id, changes)
				.reply(200)
				.delete("/v1/users/" + userId + "/phoneNumbers/" + testPhoneNumber.id)
				.reply(200);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should create a phoneNumber, promise style", function () {
			return client.PhoneNumber.create(newTestPhoneNumber)
			.then(function (phoneNumber) {
				phoneNumber.should.eql(newTestPhoneNumber);
			});
		});

		it("should create a phoneNumber, callback style", function (done) {
			client.PhoneNumber.create(newTestPhoneNumber, function (err, phoneNumber) {
				if (err) {
					throw err;
				}
				phoneNumber.should.eql(newTestPhoneNumber);
				done();
			});
		});

		it("should get a phoneNumber, promise style", function () {
			return client.PhoneNumber.get(testPhoneNumber.id)
			.then(function (phoneNumber) {
				phoneNumber.should.eql(testPhoneNumber);
			});
		});

		it("should get a list of phoneNumbers, promise style", function () {
			return client.PhoneNumber.list({ })
			.then(function (phoneNumbersResponse) {
				phoneNumbersResponse.phoneNumbers[0].should.eql(phoneNumbersList[0]);
			});
		});

		it("should get a list of phoneNumbers, callback style", function (done) {
			client.PhoneNumber.list({ }, function (err, phoneNumbersResponse) {
				if (err) {
					throw err;
				}
				phoneNumbersResponse.phoneNumbers[0].should.eql(phoneNumbersList[0]);
				done();
			});
		});

		it("those phoneNumbers should not have more pages", function () {
			return client.PhoneNumber.list({})
			.then(function (phoneNumbersResponse) {
				phoneNumbersResponse.hasNextPage.should.be.false;
				return phoneNumbersResponse.getNextPage()
				.catch(function (err) {
					err.should.equal("Next page does not exist.");
				});
			});
		});

		it("should remove the phoneNumber, promise style", function () {
			return client.PhoneNumber.delete(testPhoneNumber.id);
		});

		it("should update the phoneNumber, promise style", function () {
			return client.PhoneNumber.update(testPhoneNumber.id, changes);
		});

		describe("pagination tests", function () {

			before(function () {
				nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/phoneNumbers?size=25")
				.reply(200, phoneNumbersList,
					{
						"link" : "<https://api.catapult.inetwork.com/v1/users/" + userId +
						"/phoneNumbers?page=0&size=25>; rel=\"first\"," +
						"<https://api.catapult.inetwork.com/v1/users/" + userId + "/phoneNumbers>; rel=\"next\""
					});
			});

			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});

			it("should return a list of phoneNumbers with a page to the next link", function () {
				return client.PhoneNumber.list({ size : 25 })
				.then(function (phoneNumbersResponse) {
					phoneNumbersResponse.phoneNumbers.should.eql(phoneNumbersList);
					return phoneNumbersResponse.getNextPage();
				})
				.then(function (morePhoneNumbers) {
					morePhoneNumbers.phoneNumbers.should.eql(phoneNumbersList);
				});
			});
		});
	});
});
