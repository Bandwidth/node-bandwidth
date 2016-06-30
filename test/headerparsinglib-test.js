var getNextLink = require("../lib/headerParsingLib").getNextLink;

describe("Utility Library", function () {

	describe("getNextLink works as intended if the response has a next link", function () {

		var response;

		before (function () {
			response = {
				"headers" : {
					"link" : "<https://api.catapult.inetwork.com/v1/users/someUser/applications?page=0&size=25>; rel=\"first\"," +
							"<https://api.catapult.inetwork.com/v1/users/someUser/applications>; rel=\"next\""
				}
			};
		});

		it("returns a link", function () {
			getNextLink(response.headers).should.be.ok;
		});
	});

	describe("getNextLink works as intended if the response does not have a next link", function () {

		var response;

		before(function () {
			response = {
				"headers" : {
					"link" : "<https://api.catapult.inetwork.com/v1/users/someUser/applications?page=0&size=25>; rel=\"first\""
				}
			};
		});

		it("returns null", function () {
			(getNextLink(response.headers) === null).should.be.true;
		});
	});

	describe("getNextLink works as intended if the response does not have any links", function () {

		var response;

		before(function () {
			response = {
				"headers" : {}
			};
		});

		it("returns null", function () {
			(getNextLink(response.headers) === null).should.be.true;
		});
	});
});