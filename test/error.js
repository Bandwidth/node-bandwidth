var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var BWError = require("../lib/error");

describe("BWError", function () {

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
			id       : "100",
			message  : "prepay",
			category : "bad_request"
		};

		it("should return BWError info", function (done) {
			helper.nock().get("/v1/users/FakeUserId/errors/100").reply(200, item);
			BWError.get(helper.createClient(), "100", function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});

		it("should return BWError info (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/errors/100").reply(200, item);
			BWError.get("100", function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});
	});

	describe("#list", function () {

		var items = [
			{ id : 1, message : "BWError1" },
			{ id : 2, message : "BWError2" } ];

		it("should return BWErrors", function (done) {
			helper.nock().get("/v1/users/FakeUserId/errors?page=1").reply(200, items);
			BWError.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return transactions (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/errors?page=1").reply(200, items);
			BWError.list({ page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return transactions (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/errors").reply(200, items);
			BWError.list(helper.createClient(), function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return transactions (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/errors").reply(200, items);
			BWError.list(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});
});
