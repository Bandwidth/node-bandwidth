var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Account API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var testAccount = {
			"balance" : "100",
			"type"    : "pre-paid"
		};

		var transactionList = [
			{
				"id"          : "{transactionId1}",
				"time"        : "2013-02-21T13:39:09.122Z",
				"amount"      : "0.00750",
				"type"        : "charge",
				"units"       : "1",
				"productType" : "sms-out",
				"number"      : "{number}"
			},
			{
				"id"          : "{transactionId2}",
				"time"        : "2013-02-21T13:37:42.079Z",
				"amount"      : "0.00750",
				"type"        : "charge",
				"units"       : "1",
				"productType" : "sms-out",
				"number"      : "{number}"
			}
		];

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/account")
				.reply(200, testAccount)
				.get("/v1/users/" + userId + "/account/transactions")
				.reply(200, transactionList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get a account info, promise style", function () {
			return client.Account.get()
			.then(function (account) {
				account.should.eql(testAccount);
			});
		});

		it("should get a list of transactions, promise style", function () {
			return client.Account.getTransactions({ })
			.then(function (response) {
				response.transactions.should.eql(transactionList);
			});
		});

		it("those transactions should not have more pages", function () {
			return client.Account.getTransactions({})
			.then(function (response) {
				response.hasNextPage.should.be.false;
				return response.getNextPage()
				.catch(function (err) {
					err.should.equal("Next page does not exist.");
				});
			});
		});

		describe("pagination tests", function () {

			before(function () {
				nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/account/transactions?size=25")
				.reply(200, transactionList,
					{
						"link" : "<https://api.catapult.inetwork.com/v1/users/" + userId +
						"/account/transactions?page=0&size=25>; rel=\"first\"," +
						"<https://api.catapult.inetwork.com/v1/users/" + userId + "/account/transactions>; rel=\"next\""
					});
			});

			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});

			it("should return a list of accounts with a page to the next link", function () {
				return client.Account.getTransactions({ size : 25 })
				.then(function (response) {
					response.transactions.should.eql(transactionList);
					return response.getNextPage();
				})
				.then(function (moreTransactions) {
					moreTransactions.transactions.should.eql(transactionList);
				});
			});
		});
	});
});
