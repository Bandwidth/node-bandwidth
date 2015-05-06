var Client = require("../").Client;
var nock = require("nock");
module.exports = {
  createClient: function(){
    return new Client("FakeUserId", "FakeApiToken", "FakeApiSecret");
  },

  nock: function(){
    return nock("https://api.catapult.inetwork.com");
  }
};
