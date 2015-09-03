var Client = require("./client");
var NUMBER_INFO_PATH = "phoneNumbers/numberInfo";

module.exports = {
	/** Get the CNAM info of a number
	 * @param client Client instance
	 * @param number Phone number
	 * @param callback callback function
	 * @example
	 * bandwidth.NumberInfo.get(client, "number", function(err, info){});
	 */
	get : function (client, number, callback) {
		if (arguments.length === 2) {
			callback = number;
			number = client;
			client = new Client();
		}

		client.makeRequest("get", NUMBER_INFO_PATH + "/" + encodeURIComponent(number), callback);
	}
};
