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

	/**
	 * Create a transcription
	 * @param  {String} recordingId The ID of the recording
	 * @param  {Function} [callback] Callback with the create transcription
	 * @return {TranscriptionResponse} A promise for the created transcription
	 * @example
	 *
	 * // Promise
	 * client.Recording.createTranscription(recordingId).then(function(transcription){});
	 *
	 * // Callback
	 * client.Recording.createTranscription(recordingId, function(err, transcription){});
	 */
	this.createTranscription = function (recordingId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId + "/transcriptions",
			method : "POST",
			body   : {}
		})
		.then(function (response) {
			var location = response.headers.location;
			return { id : location.substring(location.lastIndexOf("/") + 1) };
		})
		.asCallback(callback);
	};

	/**
	 * Get information about the transcription
	 * @param  {String} recordingId The ID of the recording
	 * @param  {String} transcriptionId The ID of the transcription
	 * @param  {Function} [callback] Callback with the  transcription
	 * @return {TranscriptionResponse} A promise for the transcription
	 * @example
	 *
	 * // Promise
	 * client.Recording.getTranscription(recordingId, transcriptionId).then(function(transcription){});
	 *
	 * // Callback
	 * client.Recording.getTranscription(recordingId, transcriptionId, function(err, transcription){});
	 */
	this.getTranscription = function (recordingId, transcriptionId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId + "/transcriptions/" + transcriptionId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get list of all transcriptions for recording
	 * @param  {String} recordingId The ID of the recording
	 * @param  {Function} [callback] Callback with the  transcriptions
	 * @return {TranscriptionResponse} A promise for the transcriptions
	 * @example
	 *
	 * // Promise
	 * client.Recording.getTranscriptions(recordingId).then(function(transcriptions){});
	 *
	 * // Callback
	 * client.Recording.getTranscriptions(recordingId, function(err, transcriptions){});
	 */
	this.getTranscriptions = function (recordingId, callback) {
		return client.makeRequest({
			path   : "recordings/" + recordingId + "/transcriptions",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Recording;
