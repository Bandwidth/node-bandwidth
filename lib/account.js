"use strict";
var Client = require("./client");
var ACCOUNT_PATH = "account";

module.exports = {
  /** Get information about your account*/
  get: function(client, callback){
    if(arguments.length === 1){
      callback = client;
      client = new Client();
    }
    client.makeRequest("get", client.concatUserPath(ACCOUNT_PATH), callback);
  },
  /** Get a list of the transactions made to your account*/
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


