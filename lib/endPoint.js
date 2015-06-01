"use strict";
var Client = require("./client");
var DOMAIN_PATH = "domains";
var ENDPOINT_PATH = "endpoints";

function EndPoint(){
}

/** Delete a endPoint.
 * @param callback callback
 * @example
 * endPoint.delete(function(err){});
 * */
EndPoint.prototype.delete = function(callback){
  this.client.makeRequest("del", this.client.concatUserPath(DOMAIN_PATH) + "/" + this.domainId + "/" + ENDPOINT_PATH + "/" + this.id,  callback);
};

/** Create an auth token
* @param callback callback
* @example
* endPoint.createAuthToken(function(err, token){})
*/
EndPoint.prototype.createAuthToken = function(callback){
  var self = this;
  var request = self.client.createRequest("post", this.client.concatUserPath(DOMAIN_PATH) + "/" + this.domainId + "/" + ENDPOINT_PATH + "/" + this.id + "/tokens");
  request.type("json").send(null).end(function(res){
    if(res.ok){
    	callback(null, res.body);
    }
    else{
      self.client.checkResponse(res, callback);
    }
  });
};

module.exports = EndPoint;
