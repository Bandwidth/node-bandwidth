"use strict";
var NUMBER_INFO_PATH = "phoneNumbers/numberInfo";

module.exports = {
  /** Get the CNAM info of a number
   * @param client Client instance
   * @param number Phone number
   * @param callback callback function
   * @example
   * bandwidth.NumberInfo.get(client, "number", function(err, info){});
   * */
  get: function(client, number, callback){
    client.makeRequest("get", NUMBER_INFO_PATH + "/" + encodeURIComponent(number), callback);
  }
};


