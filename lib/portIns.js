var Client = require("./client");
var PORTIN_PATH = "portIns";

module.exports = {

	/**
	 * Cancels a portin based on portInsID
	 * @param client Client instance
 	 * @param portInsId Id of portIn
 	 * @param callback callback function
 	 * @example
 	 * bandwidth.PortIns.cancel(client, "portInsId", function(err, number){});
	 */
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
