var Client = require("./client");
var ACCOUNT_PATH = "account";

module.exports = {
  get: function(client, callback){
    if(arguments.length === 1){
      callback = client;
      client = new Client();
    }
    client.makeRequest("get", client.concatUserPath(ACCOUNT_PATH), callback);
  },
  getTransactions: function(client, query, callback){
    if(arguments.length === 1){
      callback = client;
      client = new Client();
    }
    if(arguments.length === 2){
      callback = query;
      if(client instanceof Client){
        query = {};
      }
      else{
        query = client;
        client = new Client();
      }
    }
    client.makeRequest("get", client.concatUserPath(ACCOUNT_PATH) + "/transactions", query,  callback);
  }
};


