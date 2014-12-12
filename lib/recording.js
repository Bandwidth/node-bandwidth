"use strict";
var Client = require("./client");
var RECORDING_PATH = "recordings";

module.exports = {
  /** Retrieve a specific call recording information, identified by recordingId */
  get: function(client, id, callback){
    if(arguments.length === 2){
      callback = id;
      id = client;
      client = new Client();
    }
    client.makeRequest("get", client.concatUserPath(RECORDING_PATH) + "/" +  id, callback);
  },

  /** List a user's call recordings */
  list: function(client, query, callback){
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
    else if(arguments.length === 1){
      callback = client;
      client = new Client();
    }
    client.makeRequest("get", client.concatUserPath(RECORDING_PATH), query, callback);
  }
};
