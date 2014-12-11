"use strict";
var Client = require("./client");
var AVAILABLE_NUMBERS_PATH = "availableNumbers";

module.exports = {
  /** Search for available toll free numbers  */
  searchTollFree: function(client, query, callback){
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
    client.makeRequest("get", client.concatUserPath(AVAILABLE_NUMBERS_PATH) + "/tollFree", query, callback);
  },

  /** Search for available local numbers */
  searchLocal: function(client, query, callback){
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
    client.makeRequest("get", client.concatUserPath(AVAILABLE_NUMBERS_PATH) + "/local", query, callback);
  }
};


