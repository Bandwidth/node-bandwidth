var assert = require("assert");
var td = require("testdouble");
var nock = require("nock");
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
	describe("makeIrisRequest()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.get("/v1.0/api/accounts/id/test")
				.reply(200, "<Test>test</Test>", {})
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader: function () {
					return "agent"
				}
			});
			message.__makeIrisRequest({
				auth          : {
					accountId : "id",
					userName  :  "userName",
					password  : "password"
				},
				path          : "test"
			}).then(function(result){
				result[0]["Test"]._text.should.equal("test");
				done();
			}, done);
		});
	});
	describe("createApplication()", function () {
		before(function () {
			nock.disableNetConnect();
			nock("https://dashboard.bandwidth.com")
				.persist()
				.post("/v1.0/api/accounts/id/applications", "<Application><AppName>App1</AppName><CallbackUrl>url</CallbackUrl><CallBackCreds/></Application>")
				.reply(200, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
				<ApplicationProvisioningResponse>
				  <Application>
					<ApplicationId>ApplicationId</ApplicationId>
					<ServiceType>Messaging-V2</ServiceType>
					<AppName>Demo Server</AppName>
					<CallbackUrl>https://requestb.in/1m009f61</CallbackUrl>
					<CallbackCreds />
				  </Application>
				</ApplicationProvisioningResponse>`, {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader: function () {
					return "agent"
				}
			});
			message.__createApplication({
				accountId   : "id",
				userName    :  "userName",
				password    : "password"
			}, {
				name        : "App1",
				callbackUrl : "url"
			}).then(function(id){
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
				.post("/v1.0/api/accounts/id/sites/sub/sippeers", "<SipPeer><PeerName>Location1</PeerName><IsDefaultPeer>false</IsDefaultPeer></SipPeer>")
				.reply(201, "", {"Location" : "http://host/LocationId"});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader: function () {
					return "agent"
				}
			});
			message.__createLocation({
				accountId    : "id",
				userName     :  "userName",
				password     : "password",
				subaccountId : "sub"
			}, {
				locationName      : "Location1",
				isDefaultLocation : false
			}).then(function(id){
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
				.post("/v1.0/api/accounts/id/sites/sub/sippeers/locationId/products/messaging/features/sms", "<SipPeerSmsFeature><SipPeerSmsFeatureSettings><TollFree>true</TollFree><ShortCode>false</ShortCode><Protocol>HTTP</Protocol><Zone1>true</Zone1><Zone2>false</Zone2><Zone3>false</Zone3><Zone4>false</Zone4><Zone5>false</Zone5></SipPeerSmsFeatureSettings><HttpSettings><ProxyPeerId>539692</ProxyPeerId></HttpSettings></SipPeerSmsFeature>")
				.reply(200, "", {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader: function () {
					return "agent"
				}
			});
			message.__enableSms({
				accountId       : "id",
				userName        :  "userName",
				password        : "password",
				subaccountId    : "sub"
			}, {
				enabled: true,
				tollFreeEnabled : true
			}, {
				locationId      : "locationId"
			}).then(function(){
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
					"<MmsFeature><MmsSettings><protocol>HTTP</protocol></MmsSettings><Protocols><HTTP><HttpSettings><ProxyPeerId>539692</ProxyPeerId></HttpSettings></HTTP></Protocols></MmsFeature>")
				.reply(200, "", {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader: function () {
					return "agent"
				}
			});
			message.__enableMms({
				accountId       : "id",
				userName        :  "userName",
				password        : "password",
				subaccountId    : "sub"
			}, {
				enabled         : true
			}, {
				locationId      : "locationId"
			}).then(function(){
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
					"<ApplicationsSettings><HttpMessagingV2AppId>applicationId</HttpMessagingV2AppId></ApplicationsSettings>")
				.reply(200, "", {});
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should make a request", function (done) {
			var message = new Message({
				getUserAgentHeader: function () {
					return "agent"
				}
			});
			message.__assignApplicationToLocation({
				accountId       : "id",
				userName        :  "userName",
				password        : "password",
				subaccountId    : "sub"
			}, {
				locationId      : "locationId",
				applicationId   : "applicationId"
			}).then(function(){
				done();
			}, done);
		});
	});
	describe("createMessagingApplication()", function () {
		it("should create and configure dashboard application", function (done) {
			var auth = {
				accountId       : "id",
				userName        :  "userName",
				password        : "password",
				subaccountId    : "sub"
			};
			var data = {
				smsOptions : {},
				mmsOptions : {}
			};
			var message = new Message({});
			message.__createApplication = function (a, d) {
				a.should.equal(auth);
				d.should.equal(data);
				return Promise.resolve("applcationId");
			};
			message.__createLocation = function (a, d) {
				a.should.equal(auth);
				d.should.equal(data);
				return Promise.resolve("locationId");
			};
			message.__enableSms = function (a, opt, app) {
				a.should.equal(auth);
				opt.should.equal(data.smsOptions);
				app.applicationId.should.equal("applcationId");
				app.locationId.should.equal("locationId");
				return Promise.resolve();
			};
			message.__enableMms = function (a, opt, app) {
				a.should.equal(auth);
				opt.should.equal(data.mmsOptions);
				app.applicationId.should.equal("applcationId");
				app.locationId.should.equal("locationId");
				return Promise.resolve();
			};
			message.__assignApplicationToLocation = function (a, app) {
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
						"<Order><OrderType><Quantity>1</Quantity></OrderType><SiteId>sub</SiteId><PeerId>locationId</PeerId></Order>")
					.reply(200, `<OrderResponse>
					<Order>
					  <OrderCreateDate>2017-09-18T17:36:57.274Z</OrderCreateDate>
					  <PeerId>{{location}}</PeerId>
					  <BackOrderRequested>false</BackOrderRequested>
					  <id>OrderId</id>
					  <AreaCodeSearchAndOrderType>
						<AreaCode>910</AreaCode>
						<Quantity>1</Quantity>
					  </AreaCodeSearchAndOrderType>
					  <PartialAllowed>true</PartialAllowed>
					  <SiteId>{{subaccount}}</SiteId>
					</Order>
					<OrderStatus>RECEIVED</OrderStatus>
				  </OrderResponse>`, {})
				  .get("/v1.0/api/accounts/id/orders/OrderId")
				  .reply(200, `<OrderResponse>
				  <CompletedQuantity>1</CompletedQuantity>
				  <CreatedByUser>lorem</CreatedByUser>
				  <LastModifiedDate>2017-09-18T17:36:57.411Z</LastModifiedDate>
				  <OrderCompleteDate>2017-09-18T17:36:57.410Z</OrderCompleteDate>
				  <Order>
					<OrderCreateDate>2017-09-18T17:36:57.274Z</OrderCreateDate>
					<PeerId>{{location}}</PeerId>
					<BackOrderRequested>false</BackOrderRequested>
					<AreaCodeSearchAndOrderType>
					  <AreaCode>910</AreaCode>
					  <Quantity>1</Quantity>
					</AreaCodeSearchAndOrderType>
					<PartialAllowed>true</PartialAllowed>
					<SiteId>{{subaccount}}</SiteId>
				  </Order>
				  <OrderStatus>COMPLETE</OrderStatus>
				  <CompletedNumbers>
					<TelephoneNumber>
					  <FullNumber>9102398766</FullNumber>
					</TelephoneNumber>
					<TelephoneNumber>
					  <FullNumber>9102398767</FullNumber>
					</TelephoneNumber>
				  </CompletedNumbers>
				  <Summary>1 number ordered in (910)</Summary>
				  <FailedQuantity>0</FailedQuantity>
				</OrderResponse>`);
			});
			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});
			it("should order numbers and check order's status", function(done){
				var auth = {
					accountId       : "id",
					userName        : "userName",
					password        : "password",
					subaccountId    : "sub"
				};
				var app = {
					applicationId   : "applicationId",
					locationId      : "locationId"
				};
				var query = {
					quantity : 1,
					toXml   : function () {
						return {
							"OrderType" : {
								"Quantity" : {_text: '1'}
							}
						};
					}
				};
				var message = new Message({
					getUserAgentHeader: function () {
						return "agent"
					}
				});
				message.searchAndOrderNumbers(auth, app, query).then(function (numbers) {
					numbers.should.containDeep([9102398766, 9102398767]);
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
						"<Order><OrderType><Quantity>1</Quantity></OrderType><SiteId>sub</SiteId><PeerId>locationId</PeerId></Order>")
					.reply(200, `<OrderResponse>
					<Order>
					  <OrderCreateDate>2017-09-18T17:36:57.274Z</OrderCreateDate>
					  <PeerId>{{location}}</PeerId>
					  <BackOrderRequested>false</BackOrderRequested>
					  <id>OrderId</id>
					  <AreaCodeSearchAndOrderType>
						<AreaCode>910</AreaCode>
						<Quantity>1</Quantity>
					  </AreaCodeSearchAndOrderType>
					  <PartialAllowed>true</PartialAllowed>
					  <SiteId>{{subaccount}}</SiteId>
					</Order>
					<OrderStatus>RECEIVED</OrderStatus>
				  </OrderResponse>`, {})
				  .get("/v1.0/api/accounts/id/orders/OrderId")
				  .reply(200, `<OrderResponse>
				  <CompletedQuantity>1</CompletedQuantity>
				  <CreatedByUser>lorem</CreatedByUser>
				  <LastModifiedDate>2017-09-18T17:36:57.411Z</LastModifiedDate>
				  <OrderCompleteDate>2017-09-18T17:36:57.410Z</OrderCompleteDate>
				  <Order>
					<OrderCreateDate>2017-09-18T17:36:57.274Z</OrderCreateDate>
					<PeerId>{{location}}</PeerId>
					<BackOrderRequested>false</BackOrderRequested>
					<AreaCodeSearchAndOrderType>
					  <AreaCode>910</AreaCode>
					  <Quantity>1</Quantity>
					</AreaCodeSearchAndOrderType>
					<PartialAllowed>true</PartialAllowed>
					<SiteId>{{subaccount}}</SiteId>
				  </Order>
				  <OrderStatus>FAILED</OrderStatus>
				  <CompletedNumbers/>>
				  <FailedQuantity>1</FailedQuantity>
				</OrderResponse>`);
			});
			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});
			it("should fail on ordering number", function(done){
				var auth = {
					accountId       : "id",
					userName        : "userName",
					password        : "password",
					subaccountId    : "sub"
				};
				var app = {
					applicationId   : "applicationId",
					locationId      : "locationId"
				};
				var query = {
					quantity : 1,
					toXml   : function () {
						return {
							"OrderType" : {
								"Quantity" : {_text: '1'}
							}
						};
					}
				};
				var message = new Message({
					getUserAgentHeader: function () {
						return "agent"
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
						"<Order><OrderType><Quantity>1</Quantity></OrderType><SiteId>sub</SiteId><PeerId>locationId</PeerId></Order>")
					.reply(200, `<OrderResponse>
					<Order>
					  <OrderCreateDate>2017-09-18T17:36:57.274Z</OrderCreateDate>
					  <PeerId>{{location}}</PeerId>
					  <BackOrderRequested>false</BackOrderRequested>
					  <id>OrderId</id>
					  <AreaCodeSearchAndOrderType>
						<AreaCode>910</AreaCode>
						<Quantity>1</Quantity>
					  </AreaCodeSearchAndOrderType>
					  <PartialAllowed>true</PartialAllowed>
					  <SiteId>{{subaccount}}</SiteId>
					</Order>
					<OrderStatus>RECEIVED</OrderStatus>
				  </OrderResponse>`, {})
				  .get("/v1.0/api/accounts/id/orders/OrderId")
				  .reply(200, `<OrderResponse>
				  <CompletedQuantity>1</CompletedQuantity>
				  <CreatedByUser>lorem</CreatedByUser>
				  <LastModifiedDate>2017-09-18T17:36:57.411Z</LastModifiedDate>
				  <OrderCompleteDate>2017-09-18T17:36:57.410Z</OrderCompleteDate>
				  <Order>
					<OrderCreateDate>2017-09-18T17:36:57.274Z</OrderCreateDate>
					<PeerId>{{location}}</PeerId>
					<BackOrderRequested>false</BackOrderRequested>
					<AreaCodeSearchAndOrderType>
					  <AreaCode>910</AreaCode>
					  <Quantity>1</Quantity>
					</AreaCodeSearchAndOrderType>
					<PartialAllowed>true</PartialAllowed>
					<SiteId>{{subaccount}}</SiteId>
				  </Order>
				  <OrderStatus>WAIT</OrderStatus>
				  <CompletedNumbers/>
				  <FailedQuantity/>
				</OrderResponse>`);
			});
			after(function () {
				nock.cleanAll();
				nock.enableNetConnect();
			});
			it("should fail on timeout", function(done){
				var auth = {
					accountId       : "id",
					userName        : "userName",
					password        : "password",
					subaccountId    : "sub"
				};
				var app = {
					applicationId   : "applicationId",
					locationId      : "locationId"
				};
				var query = {
					quantity : 1,
					toXml   : function () {
						return {
							"OrderType" : {
								"Quantity" : {_text: '1'}
							}
						};
					},
					timeout : 0.01
				};
				var message = new Message({
					getUserAgentHeader: function () {
						return "agent"
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
});
