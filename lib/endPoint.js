"use strict";
var Client = require("./client");
var EndPoint = require("./endPoint");
var DOMAIN_PATH = "domains";
var ENDPOINT_PATH = "endpoints";


function EndPoint(){
}


/** Delete a endPoint.
 * @param callback callback
 * @example
 * endPoint.delete(function(err){});
 * */
//EndPoint.prototype.delete = function(callback){
//  this.client.makeRequest("delete", this.client.concatUserPath(DOMAIN_PATH) + "/" + this.domainId + "/" + ENDPOINT_PATH + this.id,  callback);
//};


module.exports = EndPoint;
