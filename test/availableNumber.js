var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var AvailableNumber = lib.AvailableNumber;

describe("AvailableNumber", function () {
	var items = [ {
		number         : "1",
		city           : "City1",
		lata           : "Lata1",
		nationalNumber : "NationalNumber1",
		patternMatch   : "PatternMatch1",
		price          : 0.01,
		rateCenter     : "RateCenter1",
		state          : "State1"
	}, {
		number         : "2",
		city           : "City2",
		lata           : "Lata2",
		nationalNumber : "NationalNumber2",
		patternMatch   : "PatternMatch2",
		price          : 0.02,
		rateCenter     : "RateCenter2",
		state          : "State2"
	} ];

	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#searchTollFree", function () {
		it("should return numbers", function (done) {
			helper.nock().get("/v1/availableNumbers/tollFree?criteria1=1").reply(200, items);
			AvailableNumber.searchTollFree(helper.createClient(), { criteria1 : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return numbers (with default client)", function (done) {
			helper.nock().get("/v1/availableNumbers/tollFree?criteria1=1").reply(200, items);
			AvailableNumber.searchTollFree({ criteria1 : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return numbers (without query)", function (done) {
			helper.nock().get("/v1/availableNumbers/tollFree").reply(200, items);
			AvailableNumber.searchTollFree(helper.createClient(), function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return numbers (with default client, without query)", function (done) {
			helper.nock().get("/v1/availableNumbers/tollFree").reply(200, items);
			AvailableNumber.searchTollFree(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});

	describe("#searchLocal", function () {
		it("should return numbers", function (done) {
			helper.nock().get("/v1/availableNumbers/local?criteria1=1").reply(200, items);
			AvailableNumber.searchLocal(helper.createClient(), { criteria1 : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return numbers (with default client)", function (done) {
			helper.nock().get("/v1/availableNumbers/local?criteria1=1").reply(200, items);
			AvailableNumber.searchLocal({ criteria1 : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return numbers (without query)", function (done) {
			helper.nock().get("/v1/availableNumbers/local").reply(200, items);
			AvailableNumber.searchLocal(helper.createClient(), function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return numbers (with default client, without query)", function (done) {
			helper.nock().get("/v1/availableNumbers/local").reply(200, items);
			AvailableNumber.searchLocal(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});
});
