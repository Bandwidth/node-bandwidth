"use strict";
var ACCOUNT_PATH = "account";

module.exports = {
  /** Get information about your account
   * @param client optional Client instance
   * @param callback {Function} callback function
   * @example
   *  bandwidth.Account.get(client, function(err, account) { ...});
   */
  get: function(client, callback){
    client.makeRequest("get", client.concatUserPath(ACCOUNT_PATH), callback);
  },
  /** Get a list of the transactions made to your account
   * @param client optional Client instance
   * @param query optional query parameters
   * @param callback {Function} callback function
   * @example
   *  bandwidth.Account.getTransactions(client, function(err, transactions){ ...});
   */
  getTransactions: function(client, query, callback){
    if(arguments.length === 2){
      callback = query;
      query = {};
    }

    client.makeRequest("get", client.concatUserPath(ACCOUNT_PATH) + "/transactions", query,  callback);
  }
};


