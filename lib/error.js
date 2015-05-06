"use strict";
var ERROR_PATH = "errors";

module.exports = {
  /** Gets information about one user error
   *  @param client Client instance
   *  @param id Id of error
   *  @param callback callback
   *  @example
   *  bandwidth.Error.get(client, "id", function(err, errorData){});
   * */
  get: function(client, id, callback){
    client.makeRequest("get", client.concatUserPath(ERROR_PATH) + "/" + id, callback);
  },
  /** Gets all the user errors for a user
   * @param client Client instance
   * @param query query parameters
   * @param callback callback
   * @example
   * bandwidth.Error.list(client, function(err, list){});
   * */
  list: function(client, query, callback){
    if(arguments.length === 2){
      callback = query;
      query = {};
    }

    client.makeRequest("get", client.concatUserPath(ERROR_PATH), query, callback);
  }
};


