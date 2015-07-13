var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Account = lib.Account;

describe("Account", function () {

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
			accountType : "prepay",
			balance     : 100
		};

		it("should return account info", function (done) {
			helper.nock().get("/v1/users/FakeUserId/account").reply(200, item);
			Account.get(helper.createClient(), function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});

		it("should return account info (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/account").reply(200, item);
			Account.get(function (err, i) {
				if (err) {
					return done(err);
				}

				i.should.eql(item);
				done();
			});
		});
	});

	describe("#getTransaction", function () {
		var items = [ { id : 1, amount : 30, type : "charge" },
			{ id : 2, amount : 20, type : "payment" } ];
		it("should return transactions", function (done) {
			helper.nock().get("/v1/users/FakeUserId/account/transactions?page=1").reply(200, items);
			Account.getTransactions(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return transactions (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/account/transactions?page=1").reply(200, items);
			Account.getTransactions({ page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return transactions (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/account/transactions").reply(200, items);
			Account.getTransactions(helper.createClient(), function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return transactions (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/account/transactions").reply(200, items);
			Account.getTransactions(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});
});
