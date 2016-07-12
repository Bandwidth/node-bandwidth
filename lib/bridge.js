/**
 * Bridge
 * @constructor
 */
var Bridge = function (client) {
	/**
	 * Create a new bridge
	 * @param {Object} params Parameters for creating a bridge
	 * @param {Boolean} params.bridgeAudio Enable/Disable two way audio path (default = true).
	 * @param {Array<String>} params.callIds The list of call ids in the bridge. If the list of call ids
	 * is not provided the bridge is logically created and it can be used to place calls later.
	 * @param {Function} [callback] Callback with the newly created bridge
	 * @return {BridgeResponse} A promise for the newly created bridge
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "bridges",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var bridge = params;
			var location = response.headers.location;
			bridge.id = location.substring(location.lastIndexOf("/") + 1);
			return bridge;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about a bridge.
	 * @param  {String} bridgeId The ID of the bridge to get
	 * @param  {Function} callback A callback with the call information
	 * @return {Promise} A promise for the call information
	 */
	this.get = function (bridgeId, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of bridges.
	 * @param {Object} params Query parameters for listing bridges
	 * @param {Number} [params.page=0] Used for pagination to indicate the page requested for querying
	 * a list of bridges.
	 * If no value is specified the default is 0.
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list of bridges. If no value is specified the default value is 25 (maximum value 1000).
	 * @param {Function} callback A callback with the list of bridges
	 * @return {Promise} A promise for the list of bridges
	 */
	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "bridges",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Update the bridge
	 * @param  {String} bridgeId The ID of the bridge
	 * @param {Object} params Changed parameters of the bridge
	 * @param {Boolean} params.bridgeAudio Enable/Disable two way audio path (default = true).
	 * @param {Array<String>} params.callIds The list of call ids in the bridge.
	 * @param {Function} [callback] Callback with the newly created bridge
	 * @return {BridgeResponse} A promise for the operation
	 */
	this.update = function (bridgeId, params, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	function audioApi (bridgeId, params, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId + "/audio",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	}

	/**
	 * Speak sentence to the bridge
	 * @param {String} bridgeId The ID of the bridge
	 * @param {String} sentence A sentence to speak to the bridge.
	 * @param {Object} params Optional parameters for the operation.
	 * @param {Function} [callback] Callback for the operation
	 * @return {BridgeResponse} A promise for the operation
	 */
	this.speakSentence = function (bridgeId, sentence, params, callback) {
		if (!params) {
			params = {};
		}
		params.sentence = sentence;
		return audioApi(bridgeId, params).asCallback(callback);
	};

	/**
	 * Play audio url to the bridge
	 * @param {String} bridgeId The ID of the bridge
	 * @param {String} fileUrl Url to audio file to play.
	 * @param {Object} params Optional parameters for the operation.
	 * @param {Function} [callback] Callback for the operation
	 * @return {BridgeResponse} A promise for the operation
	 */
	this.playAudio = function (bridgeId, fileUrl, params, callback) {
		if (!params) {
			params = {};
		}
		params.fileUrl = fileUrl;
		return audioApi(bridgeId, params).asCallback(callback);
	};

	/**
	 * Gets information about a bridge.
	 * @param  {String} bridgeId The ID of the bridge to get
	 * @param  {Function} callback A callback with the call information
	 * @return {Promise} A promise for the call information
	 */
	this.getCalls = function (bridgeId, callback) {
		return client.makeRequest({
			path   : "bridges/" + bridgeId + "/calls",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};
};

module.exports = Bridge;

/**
 * @class BridgeResponse
 * @type {Object}
 * @property {String} id The unique ID of the bridge.
 * @property {String} state Bridge state. Possible state values are described here.
 * @property {Array<String>} callIds List of call Ids that will be in the bridge.
 * @property {Boolean} bridgeAudio Enable/Disable two way audio path.
 * @property {String} completedTime The time when the bridge was completed.
 * @property {String} createdTime The time that bridge was created.
 * @property {String} activatedTime The time that the bridge got into active state.
 */
