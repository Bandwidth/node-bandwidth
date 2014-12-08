var Client = require("./client");
var ERROR_PATH = "errors";

module.exports = {
  get: function(client, id, callback){
    if(arguments.length === 2){
      callback = id;
      id = client;
      client = new Client();
    }
    client.makeRequest("get", client.concatUserPath(ERROR_PATH) + "/" + id, callback);
  },
  list: function(client, query, callback){
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
    client.makeRequest("get", client.concatUserPath(ERROR_PATH), query, callback);
  }
};


