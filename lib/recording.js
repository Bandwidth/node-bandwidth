
var Recording = function (client) {

	this.get = function (recordingId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId,
			method : "GET"
		})
		.then(function (response) {
			return response[0].body;
		})
		.nodeify(callback);
	};

	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "recordings",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response[0].body;
		})
		.nodeify(callback);
	};
};

module.exports = Recording;
