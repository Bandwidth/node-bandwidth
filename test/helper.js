var Client = require("../").Client;
var nock = require("nock");

module.exports = {
	setupGlobalOptions : function () {
		Client.globalOptions.userId = "FakeUserId";
		Client.globalOptions.apiToken = "FakeApiToken";
		Client.globalOptions.apiSecret = "FakeApiSecret";
	},

	createClient : function () {
		return new Client("FakeUserId", "FakeApiToken", "FakeApiSecret");
	},

	nock : function () {
		return nock("https://api.catapult.inetwork.com");
	}
};
