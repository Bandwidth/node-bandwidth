var nock = require("nock");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("PhoneNumber API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var phoneNumberList = [
      {
	"id"             : "{numberId1}",
	"application"    : "https://catapult.inetwork.com/v1/users/users/u-ly123/applications/a-j321",
	"number"         :"{number1}",
	"nationalNumber" :"{national_number1}",
	"name"           : "home phone",
	"createdTime"    : "2013-02-13T17:46:08.374Z",
	"state"          : "NC",
	"price"          : "0.60",
	"numberState"    : "enabled"
      },
      {
	"id"             : "{numberId2}",
	"application"    : "https://catapult.inetwork.com/v1/users/users/u-ly123/applications/a-j123",
	"number"         :"{number2}",
	"nationalNumber" :"{national_number2}",
	"name"           : "work phone",
	"createdTime"    : "2013-02-13T18:32:05.223Z",
	"state"          : "NC",
	"price"          : "0.60",
	"numberState"    : "enabled"
      }
    ];

		before(function () {
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret
			});
			nock.disableNetConnect();

			nock(baseUrl)
				.persist()
				.post("/v1/users/" + userId + "/phoneNumbers")
				.reply(201, {},
          {
	"Location" : "/v1/users/" + userId + "/phoneNumbers/fakeNumberId"
          }
        )
				.get("/v1/users/" + userId + "/phoneNumbers")
				.reply(200, phoneNumberList);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
		});

		it("should get a list of phone numbers, promise style", function (done) {
			client.PhoneNumber.list()
			.then(function (numberResponse) {
				numberResponse[0].id.should.equal(phoneNumberList[0].id);
				numberResponse[0].application.should.equal(phoneNumberList[0].application);
				numberResponse[0].number.should.equal(phoneNumberList[0].number);
				numberResponse[0].nationalNumber.should.equal(phoneNumberList[0].nationalNumber);
				numberResponse[0].name.should.equal(phoneNumberList[0].name);
				numberResponse[0].createdTime.should.equal(phoneNumberList[0].createdTime);
				numberResponse[0].state.should.equal(phoneNumberList[0].state);
				numberResponse[0].price.should.equal(phoneNumberList[0].price);
				numberResponse[0].numberState.should.equal(phoneNumberList[0].numberState);

				numberResponse[1].id.should.equal(phoneNumberList[1].id);
				numberResponse[1].application.should.equal(phoneNumberList[1].application);
				numberResponse[1].number.should.equal(phoneNumberList[1].number);
				numberResponse[1].nationalNumber.should.equal(phoneNumberList[1].nationalNumber);
				numberResponse[1].name.should.equal(phoneNumberList[1].name);
				numberResponse[1].createdTime.should.equal(phoneNumberList[1].createdTime);
				numberResponse[1].state.should.equal(phoneNumberList[1].state);
				numberResponse[1].price.should.equal(phoneNumberList[1].price);
				numberResponse[1].numberState.should.equal(phoneNumberList[1].numberState);
			})
			.done(done);
		});

		it("should get a list of phone numbers, callback style", function (done) {
			client.PhoneNumber.list(null, function (err, numberResponse) {
				if (err) {
					throw err;
				}

				numberResponse[0].id.should.equal(phoneNumberList[0].id);
				numberResponse[0].application.should.equal(phoneNumberList[0].application);
				numberResponse[0].number.should.equal(phoneNumberList[0].number);
				numberResponse[0].nationalNumber.should.equal(phoneNumberList[0].nationalNumber);
				numberResponse[0].name.should.equal(phoneNumberList[0].name);
				numberResponse[0].createdTime.should.equal(phoneNumberList[0].createdTime);
				numberResponse[0].state.should.equal(phoneNumberList[0].state);
				numberResponse[0].price.should.equal(phoneNumberList[0].price);
				numberResponse[0].numberState.should.equal(phoneNumberList[0].numberState);

				numberResponse[1].id.should.equal(phoneNumberList[1].id);
				numberResponse[1].application.should.equal(phoneNumberList[1].application);
				numberResponse[1].number.should.equal(phoneNumberList[1].number);
				numberResponse[1].nationalNumber.should.equal(phoneNumberList[1].nationalNumber);
				numberResponse[1].name.should.equal(phoneNumberList[1].name);
				numberResponse[1].createdTime.should.equal(phoneNumberList[1].createdTime);
				numberResponse[1].state.should.equal(phoneNumberList[1].state);
				numberResponse[1].price.should.equal(phoneNumberList[1].price);
				numberResponse[1].numberState.should.equal(phoneNumberList[1].numberState);

				done();
			});
		});

		it("phone number should be allocated", function (done) {
			client.PhoneNumber.allocate()
      .then(function (response) {
	done();
      });
		});
	});
});
