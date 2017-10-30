var assert = require("assert");
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
	describe("handleResponse()", function () {
		it("should return parsed response", function () {
			var message = new Message({});
			var result = message.__handleResponse({
				body: "<Test>test</Test>",
				statusCode: 200
			});
			var body = result[0];
			body["Test"]._text.should.equal("test");
		});
		it("should handle iris error 1", function () {
			var message = new Message({});
			assert.throws(function () {
				message.__handleResponse({
					body: "<Response><ErrorCode>Code</ErrorCode><Description>Description</Description></Response>",
					statusCode: 200
				})
			}, "Code: Description");
		});
		it("should handle iris error 2", function () {
			var message = new Message({});
			assert.throws(function () {
				message.__handleResponse({
					body: "<Response><Error><Code>Code</Code><Description>Description</Description></Error></Response>",
					statusCode: 200
				})
			}, "Code: Description");
		});
		it("should handle iris error 3", function () {
			var message = new Message({});
			assert.throws(function () {
				message.__handleResponse({
					body: "<Response><Errors><Code>Code</Code><Description>Description</Description></Errors></Response>",
					statusCode: 200
				})
			}, "Code: Description");
		});
		it("should handle iris error 4", function () {
			var message = new Message({});
			assert.throws(function () {
				message.__handleResponse({
					body: "<Response><resultCode>Code</resultCode><resultMessage>Description</resultMessage></Response>",
					statusCode: 200
				})
			}, "Code: Description");
		});
		it("should handle iris undefined error", function () {
			var message = new Message({});
			assert.throws(function () {
				message.__handleResponse({
					body: "",
					statusCode: 400
				})
			}, "Http code 400");
		});
	});
});
