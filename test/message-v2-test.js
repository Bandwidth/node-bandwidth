var assert = require("assert");
var nock = require("nock");
var Client = require("../lib/client");
var Message = require("../lib/v2/message");
var templates = require("./templates.json");

// jscs:disable disallowDanglingUnderscores

describe("Message v2 API", function () {
	describe("createIrisRequestOptions()", function () {
		it("should return options for request()", function () {
			var message = new Message({
				getUserAgentHeader : function () {
					return "agent";
				}
			});
			var options = message._createIrisRequestOptions({
				auth   : {
					accountId : "id",
					userName  :  "userName",
					password  : "password"
				},
				path   : "test",
				body   : {
					"Test" : { _text : "test" }
				},
				method : "DELETE"
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
			var result = message._handleResponse({
				body       : "<Test>test</Test>",
				statusCode : 200
			});
			var body = result[0];
			body.Test._text.should.equal("test");
		})	;
		it("should handle iris error 1", function () {
			var message = new Message({});
			assert.throws(function () {
				message._handleResponse({
					body       : templates.irisError1,
					statusCode : 200
				});
			}, "Code: Description");
		});
		it("should handle iris error 2", function () {
			var message = new Message({});
			assert.throws(function () {
				message._handleResponse({
					body       : templates.irisError2,
					statusCode : 200
				});
			}, "Code: Description");
		});
		it("should handle iris error 3", function () {
			var message = new Message({});
			assert.throws(function () {
				message._handleResponse({
					body       : templates.irisError3,
					statusCode : 200
				});
			}, "Code: Description");
		});
		it("should handle iris error 4", function () {
			var message = new Message({});
			assert.throws(function () {
				message._handleResponse({
					body       : templates.irisError4,
					statusCode : 200
				});
			}, "Code: Description");
		});
		it("should handle iris undefined error", function () {
			var message = new Message({});
			assert.throws(function () {
				message._handleResponse({
					body       : "",
					statusCode : 400
				});
			}, "Http code 400");
		});
	});
	describe("makeIrisRequest()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.get("/v1.0/api/accounts/id/test")
				.reply(200, "<Test>test</Test>", {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader : function () {
					return "agent";
				}
			});
			message._makeIrisRequest({
				auth : {
					accountId : "id",
					userName  :  "userName",
					password  : "password"
				},
				path : "test"
			}).then(function (result) {
				result[0].Test._text.should.equal("test");
				done();
			}, done);
		});
	});
	describe("createApplication()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.post("/v1.0/api/accounts/id/applications", templates.createApplicationRequest)
				.reply(200, templates.createApplicationResponse, {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader : function () {
					return "agent";
				}
			});
			message._createApplication({
				accountId : "id",
				userName  :  "userName",
				password  : "password"
			}, {
				name        : "App1",
				callbackUrl : "url"
			}).then(function (id) {
				id.should.equal("ApplicationId");
				done();
			}, done);
		});
	});
	describe("createLocation()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.post("/v1.0/api/accounts/id/sites/sub/sippeers", templates.createLocationRequest)
				.reply(201, "", { "Location" : "http://host/LocationId" });
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader : function () {
					return "agent";
				}
			});
			message._createLocation({
				accountId    : "id",
				userName     : "userName",
				password     : "password",
				subaccountId : "sub"
			}, {
				locationName      : "Location1",
				isDefaultLocation : false
			}).then(function (id) {
				id.should.equal("LocationId");
				done();
			}, done);
		});
	});
	describe("enableSms()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.post("/v1.0/api/accounts/id/sites/sub/sippeers/locationId/products/messaging/features/sms",
					templates.enableSmsRequest)
				.reply(200, "", {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader : function () {
					return "agent";
				}
			});
			message._enableSms({
				accountId    : "id",
				userName     :  "userName",
				password     : "password",
				subaccountId : "sub"
			}, {
				enabled         : true,
				tollFreeEnabled : true
			}, {
				locationId : "locationId"
			}).then(function () {
				done();
			}, done);
		});
	});
	describe("enableMms()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.post("/v1.0/api/accounts/id/sites/sub/sippeers/locationId/products/messaging/features/mms",
					templates.enableMmsRequest)
				.reply(200, "", {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader : function () {
					return "agent";
				}
			});
			message._enableMms({
				accountId    : "id",
				userName     : "userName",
				password     : "password",
				subaccountId : "sub"
			}, {
				enabled : true
			}, {
				locationId : "locationId"
			}).then(function () {
				done();
			}, done);
		});
	});
	describe("assignApplicationToLocation()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.post("/v1.0/api/accounts/id/sites/sub/sippeers/locationId/products/messaging/applicationSettings",
					templates.assignApplicationToLocationRequest)
				.reply(200, "", {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader : function () {
					return "agent";
				}
			});
			message._assignApplicationToLocation({
				accountId    : "id",
				userName     : "userName",
				password     : "password",
				subaccountId : "sub"
			}, {
				locationId    : "locationId",
				applicationId : "applicationId"
			}).then(function () {
				done();
			}, done);
		});
	});
	describe("createMessagingApplication()", function () {
		it("should create and configure dashboard application", function (done) {
			var auth = {
				accountId    : "id",
				userName     : "userName",
				password     : "password",
				subaccountId : "sub"
			};
			var data = {
				smsOptions : {},
				mmsOptions : {}
			};
			var message = new Message({});
			message._createApplication = function (a, d) {
				a.should.equal(auth);
				d.should.equal(data);
				return Promise.resolve("applcationId");
			};
			message._createLocation = function (a, d) {
				a.should.equal(auth);
				d.should.equal(data);
				return Promise.resolve("locationId");
			};
			message._enableSms = function (a, opt, app) {
				a.should.equal(auth);
				opt.should.equal(data.smsOptions);
				app.applicationId.should.equal("applcationId");
				app.locationId.should.equal("locationId");
				return Promise.resolve();
			};
			message._enableMms = function (a, opt, app) {
				a.should.equal(auth);
				opt.should.equal(data.mmsOptions);
				app.applicationId.should.equal("applcationId");
				app.locationId.should.equal("locationId");
				return Promise.resolve();
			};
			message._assignApplicationToLocation = function (a, app) {
				a.should.equal(auth);
				app.applicationId.should.equal("applcationId");
				app.locationId.should.equal("locationId");
				return Promise.resolve();
			};
			message.createMessagingApplication(auth, data, done);
		});
	});
	describe("searchAndOrderNumbers()", function () {
		describe("success", function () {
			before(function () {
				nock.disableNetConnect();
				nock("https://dashboard.bandwidth.com")
					.persist()
					.post("/v1.0/api/accounts/id/orders",
						templates.createOrderRequest)
					.reply(200, templates.createOrderResponse, {})
				.get("/v1.0/api/accounts/id/orders/OrderId")
				.reply(200, templates.orderResponseSuccess);
			});
			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});
			it("should order numbers and check order's status", function (done) {
				var auth = {
					accountId    : "id",
					userName     : "userName",
					password     : "password",
					subaccountId : "sub"
				};
				var app = {
					applicationId : "applicationId",
					locationId    : "locationId"
				};
				var query = {
					quantity : 1,
					toXml    : function () {
						return {
							"OrderType" : {
								"Quantity" : { _text : "1" }
							}
						};
					}
				};
				var message = new Message({
					getUserAgentHeader : function () {
						return "agent";
					}
				});
				message.searchAndOrderNumbers(auth, app, query).then(function (numbers) {
					numbers.should.containDeep([ 9102398766, 9102398767 ]);
					done();
				}, done);
			});

		});
		describe("fail", function () {
			before(function () {
				nock.disableNetConnect();
				nock("https://dashboard.bandwidth.com")
					.persist()
					.post("/v1.0/api/accounts/id/orders",
						templates.createOrderRequest)
					.reply(200, templates.createOrderResponse, {})
				.get("/v1.0/api/accounts/id/orders/OrderId")
				.reply(200, templates.orderResponseFail);
			});
			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});
			it("should fail on ordering number", function (done) {
				var auth = {
					accountId    : "id",
					userName     : "userName",
					password     : "password",
					subaccountId : "sub"
				};
				var app = {
					applicationId : "applicationId",
					locationId    : "locationId"
				};
				var query = {
					quantity : 1,
					toXml    : function () {
						return {
							"OrderType" : {
								"Quantity" : { _text : "1" }
							}
						};
					}
				};
				var message = new Message({
					getUserAgentHeader : function () {
						return "agent";
					}
				});
				message.searchAndOrderNumbers(auth, app, query, function (err) {
					if (!err) {
						return done("It should failed");
					}
					done();
				});
			});

		});
		describe("timeout", function () {
			before(function () {
				nock.disableNetConnect();
				nock("https://dashboard.bandwidth.com")
					.persist()
					.post("/v1.0/api/accounts/id/orders",
						templates.createOrderRequest)
					.reply(200, templates.createOrderResponse, {})
				.get("/v1.0/api/accounts/id/orders/OrderId")
				.reply(200, templates.orderResponseWait);
			});
			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});
			it("should fail on timeout", function (done) {
				var auth = {
					accountId    : "id",
					userName     : "userName",
					password     : "password",
					subaccountId : "sub"
				};
				var app = {
					applicationId : "applicationId",
					locationId    : "locationId"
				};
				var query = {
					quantity : 1,
					toXml    : function () {
						return {
							"OrderType" : {
								"Quantity" : { _text : "1" }
							}
						};
					},
					timeout  : 0.01
				};
				var message = new Message({
					getUserAgentHeader : function () {
						return "agent";
					}
				});
				message.searchAndOrderNumbers(auth, app, query, function (err) {
					if (!err) {
						return done("It should failed");
					}
					done();
				});
			});

		});
	});
	describe("send()", function () {
		var messageToSend = {
			from          : "+12345678901",
			to            : [ "+12345678902" ],
			text          : "Hello",
			applicationId : "applicationId"
		};
		before(function () {
			nock.disableNetConnect();
			nock("https://messaging.bandwidth.com")
			.persist()
			.post("/api/v2/users/userId/messages", messageToSend)
			.reply(201,
				{
					id        : "14762070468292kw2fuqty55yp2b2",
					time      : "2016-09-14T18:20:16Z",
					to        : [
						"+12345678902",
					],
					from      : "+12345678901",
					text      : "Hey, check this out!",
					tag       : "test message",
					owner     : "+12345678901",
					direction : "out"
				}, {});

		});
		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should send a message()", function (done) {
			var client = new Client({
				userId    : "userId",
				apiToken  : "apiToken",
				apiSecret : "apiSecret"
			});
			var message = new Message(client);
			message.send(messageToSend).then(function (result) {
				result.id.should.equal("14762070468292kw2fuqty55yp2b2");
				done();
			}, done);
		});
	});
});
