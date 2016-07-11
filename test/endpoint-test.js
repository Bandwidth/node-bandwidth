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
				.post("/v1/users/" + userId + "/domains/"  + domainId + "/endpoints/fakeEndpointId/tokens")
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
			return client.Endpoint.createAuthToken(domainId, "fakeEndpointId")
			.then(function (token) {
				token.should.eql(tokenValue);
			});
		});

		describe("Endpoint list", function () {

			it("should list endpoints on domain when no parameters are sent", function () {});
			it("should list endpoints on domain when parameters are sent", function () {});
			it("hould return a list of endpoints with a page to the next link ", function () {});

		});

	});
});
