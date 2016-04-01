
/**
 * Retrieve information about call recordings
 * @constructor
 */
var Recording = function (client) {

	/**
	 * Get a recording
	 * @param  {String} recordingId The ID of the recording to retrieve
	 * @param  {Function} [callback] Callback with the recording object
	 * @return {RecordingResponse} A promise for the recording object
	 */
	this.get = function (recordingId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get a list of recordings
	 * @param  {Object} params [description]
	 * @param  {Function} [callback] Callback with the recording objects
	 * @return {RecordingResponse} A promise for the recording objects
	 */
	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "recordings",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Recording;
