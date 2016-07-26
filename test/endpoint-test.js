var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Endpoint API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var domainId = "domainId";

		var newTestEndpoint = {
			name        : "endpoint1",
			description : "New endpoint",
			domainId    : domainId,
			credentials : { "password" : "123456" }
		};

		var testEndpoint = {
			id          : "endpointId1",
			name        : "endpoint1",
			description : "New endpoint",
			sipUri      : "endpoint1@doname.bwapp.bwsipp.io",
			credentials : {
				realm    : "doname.bwapp.bwsipp.io",
				username : "jsmith-mobile"
			}
		};

		var endpointList = [
			{
				id          : "endpointId1",
				name        : "endpoint1",
				description : "New endpoint",
				sipUri      : "endpoint1@doname.bwapp.bwsipp.io",
				credentials : {
					realm    : "doname.bwapp.bwsipp.io",
					username : "jsmith-mobile"
				}
			},
			{
				id          : "endpointId2",
				name        : "endpoint2",
				description : "New endpoint",
				sipUri      : "endpoint2@doname.bwapp.bwsipp.io",
				credentials : {
					realm    : "doname.bwapp.bwsipp.io",
					username : "jsmith-mobile2"
				}
			}
		];

		var changes = { enabled : false };

		var tokenValue = { token : "token" };

		var authTokenParams = { expires : 3600 };

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com")
				.persist()
				.post("/v1/users/" + userId + "/domains/" + domainId + "/endpoints", newTestEndpoint)
				.reply(201,
					{},
					{
						"Location" : "/v1/users/" + userId + "/domains/" + domainId + "/endpoints/fakeEndpointId"
					})
				.get("/v1/users/" + userId + "/domains/" + domainId + "/endpoints")
				.reply(200, endpointList)
				.delete("/v1/users/" + userId + "/domains/"  + domainId + "/endpoints/fakeEndpointId")
				.reply(200)
				.post("/v1/users/" + userId + "/domains/"  + domainId + "/endpoints/fakeEndpointId", changes)
				.reply(200)
				.get("/v1/users/" + userId + "/domains/"  + domainId + "/endpoints/fakeEndpointId")
				.reply(200, testEndpoint)
				.post("/v1/users/" + userId + "/domains/"  + domainId + "/endpoints/fakeEndpointId/tokens", authTokenParams)
				.reply(201, tokenValue);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should create an endpoint", function () {
			return client.Endpoint.create(domainId, newTestEndpoint)
			.then(function (endpoint) {
				endpoint.should.eql(newTestEndpoint);
			});
		});

		it("should remove the endpoint", function () {
			return client.Endpoint.delete(domainId, "fakeEndpointId");
		});

		it("should update the endpoint", function () {
			return client.Endpoint.update(domainId, "fakeEndpointId", changes);
		});

		it("should create auth token for the endpoint", function () {
			return client.Endpoint.createAuthToken(domainId, "fakeEndpointId", authTokenParams)
			.then(function (token) {
				token.should.eql(tokenValue);
			});
		});

		it("should return a single endpoint", function () {
			return client.Endpoint.get(domainId, "fakeEndpointId").then(function (endpoint) {
				endpoint.should.eql(testEndpoint);
			});
		});

		it("should get a list of endpoints, Promise", function () {
			return client.Endpoint.list(domainId)
			.then(function (response) {
				response.endpoints.should.eql(endpointList);
			});
		});

		it("should get a list of endpoints, callback", function (done) {
			client.Endpoint.list(domainId, function (err, response) {
				if (err) {
					return done(err);
				}
				response.endpoints.should.eql(endpointList);
				done();
			});
		});

		it("those endpoints should not have more pages", function () {
			return client.Endpoint.list(domainId)
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
				.get("/v1/users/" + userId + "/domains/" + domainId +
						"/endpoints?size=25")
				.reply(200, endpointList,
					{
						"link" : "<https://api.catapult.inetwork.com/v1/users/" + userId + "/domains/" + domainId +
						"/endpoints?page=0&size=25>; rel=\"first\"," +
						"<https://api.catapult.inetwork.com/v1/users/" + userId + "/endpoints>; rel=\"next\""
					});
			});

			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});

			it("should return a list of endpoints with a page to the next link", function () {
				return client.Endpoint.list(domainId, { size : 25 })
				.then(function (response) {
					response.endpoints.should.eql(endpointList);
					return response.getNextPage();
				})
				.then(function (more) {
					more.endpoints.should.eql(endpointList);
				});
			});
		});

	});
});
