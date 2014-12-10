var superagent = require("superagent");
var errors = require("./errors");


function Client(userId, apiToken, apiSecret, options){
  if(!(this instanceof Client)){
    return new Client(userId, apiToken, apiSecret, options);
  }
  if(typeof options !== "object" && arguments.length === 4){
    //compability with previous version of lib
    var opts = {apiEndPoint: (userId)?("https://" + userId):null};
    userId = apiToken;
    apiToken = apiSecret;
    apiSecret = options;
  }
  if(arguments.length === 1){
    options = arguments[0];
    userId = options.userId;
  }
  options = options || {};
  if(!userId){
    userId = Client.globalOptions.userId;
  }
  if(!apiToken){
    apiToken = options.apiToken || Client.globalOptions.apiToken;
  }
  if(!apiSecret){
    apiSecret = options.apiSecret || Client.globalOptions.apiSecret;
  }
  if(!options.apiEndPoint){
    options.apiEndPoint = Client.globalOptions.apiEndPoint;
  }
  if(!options.apiVersion){
    options.apiVersion = Client.globalOptions.apiVersion;
  }
  this.prepareRequest = function(req){
    return req.auth(apiToken, apiSecret).accept("json");
  };

  this.concatUserPath = function(path){
    return "/users/" + userId + ((path[0] == "/")?path:("/" + path));
  }

  this.prepareUrl = function(path){
    return options.apiEndPoint + "/" + options.apiVersion + ((path[0] == "/")?path:("/" + path));
  };
}

Client.globalOptions = {
  apiEndPoint: "https://api.catapult.inetwork.com",
  apiVersion: "v1",
  apiToken: "",
  apiSecret: "",
  userId: ""
};

Client.getIdFromLocationHeader = function(location, callback){
  var index = location.lastIndexOf("/");
  if(index < 0){
    return callback(new Error("Missing id in response"));
  }
  var id = location.substr(index + 1);
  callback(null, id);
};

Client.prototype.createRequest = function(method, path){
  return this.prepareRequest(superagent[method](this.prepareUrl(path)));
};

Client.prototype.makeRequest = function(method, path){
  var callback = arguments[arguments.length - 1];
  var request = this.createRequest(method, path);
  if(arguments.length > 3){
    var data = arguments[2];
   if(method === "get"){
      request.query(data);
   }
   else{
      request.type("json").send(data);
   }
  }
  var self = this;
  request.buffer().end(function(res){
    self.checkResponse(res, callback);
  });
};

Client.prototype.checkResponse = function(res, callback){
  if(res.ok){
    return callback(null, processResponse(res.body));
  }
  if(res.body){
    var message = res.body.message || res.body.code;
    if(message){
      return callback(new errors.BandwidthError(message));
    }
  }
  return callback(new errors.BandwidthError("Http code " + res.status, res.status));
};

function processResponse(obj){
  if(Array.isArray(obj)){
    var i, l = obj.length, list = new Array(l);
    for(i = 0; i < l; i ++){
      list[i] = processResponse(obj[i]);
    }
    return list;
  }
  else if(typeof obj === "object"){
    var k, res = {};
    for(k in obj){
      res[k] = processResponse(obj[k]);
    }
    return res;
  }
  else if(typeof obj === "string" && /^\d{4}\-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{3})?Z$/.test(obj)){
    return new Date(obj);
  }
  return obj;
}

module.exports = Client;
