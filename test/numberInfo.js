var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var NumberInfo = lib.NumberInfo;

describe("NumberInfo", function () {
	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#get", function () {
		var item = {
			number : "11111"
		};

		it("should return number info", function (done) {
			helper.nock().get("/v1/phoneNumbers/numberInfo/11111").reply(200, item);
			NumberInfo.get(helper.createClient(), "11111", function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});

		it("should return numberInfo info (with default client)", function (done) {
			helper.nock().get("/v1/phoneNumbers/numberInfo/11111").reply(200, item);
			NumberInfo.get("11111", function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});
	});
});
