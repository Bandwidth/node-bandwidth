var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var PortIns = lib.PortIns;

describe("PortIns", function () {
	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});
	var PORTIN_PATH = "/v1/users/FakeUserId/portIns/";
	describe("#cancel", function () {
		var portInsId = "lnpin-abc123";
		var cancelBody = { state : "cancelled" };
		var errorResponse = { "message" : "The order is already cancelled and cannot be modified or cancelled" };
		describe("When Client is supplied", function () {
			var client = helper.createClient();
			describe("and the port in can be cancelled", function () {
				var result;
				var error;
				before(function () {
					helper.nock()
						.post(PORTIN_PATH + portInsId, cancelBody)
						.reply(200, "OK");
					PortIns.cancel(client, portInsId, function (err, res) {
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
			describe("and the port in can not be cancelled", function () {
				var result;
				var error;
				before(function () {
					helper.nock()
						.post(PORTIN_PATH + portInsId, cancelBody)
						.reply(503, errorResponse);
					PortIns.cancel(client, portInsId, function (err, res) {
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
		describe("When using default client", function () {
			describe("and the port in can be cancelled", function () {
				var result;
				var error;
				before(function () {
					helper.nock()
						.post(PORTIN_PATH + portInsId, cancelBody)
						.reply(200, "OK");
					PortIns.cancel(portInsId, function (err, res) {
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
			describe("and the port in can not be cancelled", function () {
				var result;
				var error;
				before(function () {
					helper.nock()
						.post(PORTIN_PATH + portInsId, cancelBody)
						.reply(503, errorResponse);
					PortIns.cancel(portInsId, function (err, res) {
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
});
