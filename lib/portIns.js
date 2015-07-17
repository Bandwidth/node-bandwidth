"use strict";

var Client = require("./client");
var PORTIN_PATH = "portIns";

module.exports = {

	cancel : function (client, portInsId, callback) {
		if (arguments.length === 2) {
			callback = portInsId;
			portInsId = client;
			client = new Client();
		}
		var data = {
			state : "cancelled"
		};
		client.makeRequest("post", client.concatUserPath(PORTIN_PATH) + "/" + portInsId, data, callback);
	}
};