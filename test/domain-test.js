var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Domain API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var newTestDomain = {
			name        : "domain1",
			description : "New domain",
		};

		var testDomain = {
			"id"          : "fakeDomainId",
			"name"        : "domain11",
			"description" : "New domain",
			"endpoints"   : "https://.../domains/fakeDomainId/endpoints"
		};

		var domainsList = [
			{
				"id"          : "fakeDomainId1",
				"name"        : "domain11",
				"description" : "New domain1",
				"endpoints"   : "https://.../domains/fakeDomainId1/endpoints"
			},
			{
				"id"          : "fakeDomainId2",
				"name"        : "domain12",
				"description" : "New domain2",
				"endpoints"   : "https://.../domains/fakeDomainId2/endpoints"
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
				.post("/v1/users/" + userId + "/domains", newTestDomain)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/domains/fakeDomainId"
					})
				.get("/v1/users/" + userId + "/domains")
				.reply(200, domainsList)
				.delete("/v1/users/" + userId + "/domains/" + testDomain.id)
				.reply(200);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should create a domain", function () {
			return client.Domain.create(newTestDomain)
			.then(function (domain) {
				domain.should.eql(newTestDomain);
			});
		});

		it("should return domain list", function () {
			return client.Domain.list({})
			.then(function (domainsResponse) {
				domainsResponse.domains.should.eql(domainsList);
			});
		});

		it("those domains should not have more pages", function () {
			return client.Domain.list({})
			.then(function (domainsResponse) {
				domainsResponse.hasNextPage.should.be.false;
				return domainsResponse.getNextPage()
				.catch(function (err) {
					err.should.equal("Next page does not exist.");
				});
			});
		});

		it("should remove the domain", function () {
			return client.Domain.delete(testDomain.id);
		});

		describe("pagination tests", function () {

			before(function () {
				nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/domains?size=25")
				.reply(200, domainsList,
					{
						"link" : "<https://api.catapult.inetwork.com/v1/users/" + userId +
						"/domains?page=0&size=25>; rel=\"first\"," +
						"<https://api.catapult.inetwork.com/v1/users/" + userId + "/domains>; rel=\"next\""
					});
			});

			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});

			it("should return a list of applications with a page to the next link", function () {
				return client.Domain.list({ size : 25 })
				.then(function (domainsResponse) {
					domainsResponse.domains.should.eql(domainsList);
					return domainsResponse.getNextPage();
				})
				.then(function (moreDomains) {
					moreDomains.domains.should.eql(domainsList);
				});
			});
		});
	});
});
