"use strict";
var Client = require("./client");
var RECORDING_PATH = "recordings";

module.exports = {
  /** Retrieve a specific call recording information, identified by recordingId
   * @param client Client instance
   * @param id Id of recording
   * @param callback callback
   * @example
   * bandwidth.Recording.get(client, "id", function(err, recording){});
   * */
  get: function(client, id, callback){
    if(arguments.length === 2){
      callback = id;
      id = client;
      client = new Client();
    }
    client.makeRequest("get", client.concatUserPath(RECORDING_PATH) + "/" +  id, callback);
  },

  /** List a user's call recordings
   * @param client Client instance
   * @param query query parameters
   * @param callback callback
   * @example
   * bandwidth.Recording.list(client, function(err, list){});
   * */
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
