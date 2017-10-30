var td = require("testdouble");
var Message = require("../lib/v2/message");

describe("Message v2 API", function () {
	describe("createIrisRequestOptions()", function () {
		it("should return options for request()", function () {
			var message = new Message({
				getUserAgentHeader: function () {
					return "agent"
				}
			});
			var options = message.__createIrisRequestOptions({
				auth          : {
					accountId : "id",
					userName  :  "userName",
					password  : "password"
				},
				path          : "test",
				body          : {"Test" : {_text : "test"}},
				method        : "DELETE"
			});
			options.should.containDeep({
				url                : "https://dashboard.bandwidth.com/v1.0/api/accounts/id/test",
				headers            : {
					"User-Agent"   : "agent",
					"Content-Type" : "application/xml"
				},
				method             : "DELETE",
				auth               : {
					user : "userName",
					pass : "password"
				},
				json               : false,
				body               : "<Test>test</Test>",
				rejectUnauthorized : false,
				encoding           : undefined,
				qs                 : undefined
			});
		});
	});
});
