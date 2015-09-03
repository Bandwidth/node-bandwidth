var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var EndPoint = lib.EndPoint;

describe("EndPoint", function () {
	var DOMAIN_PATH = "/v1/users/FakeUserId/domains/";

	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#delete", function () {
		it("should remove an endpoint", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200);
			var endPoint = new EndPoint();
			endPoint.domainId = 1;
			endPoint.id = 10;
			endPoint.client = helper.createClient();
			endPoint.delete(done);
		});
	});

	describe("#createAuthToken - success", function () {
		it("should create an auth token", function (done) {
			var tokenData = {
				token   : "1234567890",
				expires : 86400
			};
			helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints/10/tokens").reply(200, tokenData);
			var endPoint = new EndPoint();
			endPoint.domainId = 1;
			endPoint.id = 10;
			endPoint.client = helper.createClient();
			endPoint.createAuthToken(function (err, data) {
				data.should.eql(tokenData);
				done(err);
			});
		});
	});

	describe("#createAuthToken - failure", function () {
		it("should fail", function (done) {
			helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints/10/tokens").reply(400);
			var endPoint = new EndPoint();
			endPoint.domainId = 1;
			endPoint.id = 10;
			endPoint.client = helper.createClient();
			endPoint.createAuthToken(function (err, data) {
				err.should.not.eql(null);
				done();
			});
		});
	});

	describe("#update", function () {
		var endPoint;
		var domainId = "rd-lrz25ny";
		var endpointId = "re-kx2kk";
		var ENDPOINT_PATH = DOMAIN_PATH + domainId + "/endpoints/" + endpointId;
		var updateBody = { enabled : "false" };
		var errorResponse = { message : "There are lots of potential errors" };
		before(function () {
			endPoint = new EndPoint();
			endPoint.domainId = domainId;
			endPoint.id = endpointId;
			endPoint.client = helper.createClient();
		});

		describe("When endpoint is updated successfully", function () {
			var result;
			var error;

			before(function () {
				helper.nock()
					.post(ENDPOINT_PATH, updateBody)
					.reply(200, "OK");
				endPoint.update(updateBody, function (err, res) {
					error = err;
					result = res;
				});
			});

			it("should callback with an empty object", function () {
				result.should.eql({});
			});
			it("should not callback with an error", function () {
				var isNull = error === null;
				isNull.should.be.true;
			});

		});
		describe("When enpoint is not update successfully", function () {
			var result;
			var error;

			before(function () {
				helper.nock()
					.post(ENDPOINT_PATH, updateBody)
					.reply(400, errorResponse);
				endPoint.update(updateBody, function (err, res) {
					error = err;
					result = res;
				});
			});
			it("should callback with an error", function () {
				error.message.should.eql(errorResponse.message);
			});
			it("should not callback with a result", function () {
				var isUndefined = typeof result === "undefined";
				isUndefined.should.be.true;
			});
		});
	});
});
