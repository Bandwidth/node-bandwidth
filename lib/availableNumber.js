var Client = require("./client");
var AVAILABLE_NUMBERS_PATH = "availableNumbers";

module.exports = function () {
	//for compatibility only
};

/**
 * Search for available toll free numbers
 * @param client CLient instance
 * @param query query parameters
 * @param callback callback function
 * @example
 * bandwidth.AvailableNumber.searchTollfree(client, {quantity: 20}, function(err, numbers){...});
 */
module.exports.searchTollFree = function (client, query, callback) {
	if (arguments.length === 1) {
		callback = client;
		client = new Client();
	}

	if (arguments.length === 2) {
		callback = query;
		if (client instanceof Client) {
			query = {};
		}
		else {
			query = client;
			client = new Client();
		}
	}

	client.makeRequest("get", AVAILABLE_NUMBERS_PATH + "/tollFree", query, callback);
};

/**
 * Search for available local numbers
 * @param client Client instance
 * @param query query parameters
 * @paarm callback callback function
 * @example
 * bandwidth.AvailableNumber.searchLocal(client, {state: "", zip: "", areaCode: ""},, function(err, numbers){ ... });
 */
module.exports.searchLocal = function (client, query, callback) {
	if (arguments.length === 1) {
		callback = client;
		client = new Client();
	}

	if (arguments.length === 2) {
		callback = query;
		if (client instanceof Client) {
			query = {};
		}
		else {
			query = client;
			client = new Client();
		}
	}

	client.makeRequest("get", AVAILABLE_NUMBERS_PATH + "/local", query, callback);
};
