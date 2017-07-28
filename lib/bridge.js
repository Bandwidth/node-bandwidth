var getNextLink = require("./headerParsingLib").getNextLink;
var Promise = require("bluebird");

/**
 * Bridge
 * @constructor
 */
var Bridge = function (client) {
	/**
	 * Create a new bridge
	 * @param {Object} params Parameters for creating a bridge
	 * @param {Boolean} [params.bridgeAudio=true] Enable/Disable two way audio path.
	 * @param {Array<String>} [params.callIds] The list of call ids in the bridge. If the list of call ids
	 * is not provided the bridge is logically created and it can be used to place calls later.
	 * @param {Function} [callback] Callback with the newly created bridge
	 * @return {BridgeResponse} A promise for the newly created bridge
	 * @example
	 * //Promise
	 * client.Bridge.create({
	 * 	bridgeAudio: true,
	 * 	callIds: ['c-qbs5kwrsyx6wsdi', 'c-zan4g74pprsq']
	 * })
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.create({
	 * 	bridgeAudio: true,
	 * 	callIds: ['c-qbsx6wsdi', 'c-zan4g7prsq']
	 * }, function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
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
	 * @return {BridgeResponse} A promise for the call information
	 * @example
	 * //Promise
	 * client.Bridge.get('brg-65dhjwrmbasiei')
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.get('brg-65dhmbasiei',
	 * 	function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
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
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list of bridges. If no value is specified the default value is 25 (maximum value 1000).
	 * @param {Function} callback A callback with the list of bridges
	 * @return {BridgeListResponse} A promise for the list of bridges
	 * @example
	 * client.Bridge.list()
	 * .then(function (response) {
	 * 	console.log(response.bridges);
	 * 	if(response.hasNextPage) {
	 * 		return response.getNextPage();
	 * 	}
	 * 	else {
	 * 		return {bridges: []};
	 * 	}
	 * })
	 * .then(function(response) {
	 * 	console.log(response.bridges);
	 * });
	 */
	this.list = function (params, callback) {
		var self = this;
		return client.makeRequest({
			path   : "bridges",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			var bridgeListResponse = {
				bridges     : response.body,
				hasNextPage : false,
				getNextPage : function (nextCallback) {
					return Promise.reject("Next page does not exist.")
					.asCallback(nextCallback);
				}
			};
			var nextLink = getNextLink(response.headers);
			if (nextLink) {
				bridgeListResponse.hasNextPage = true;
				bridgeListResponse.getNextPage = function (nextCallback) {
					return self.list(nextLink, nextCallback);
				};
			}
			return bridgeListResponse;
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
	 * @example
	 * //Promise
	 * client.Bridge.update('brg-65dasiei', {
	 * 	bridgeAudio: false
	 * })
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.update('brg-65dhjbanasiei', {
	 * 	bridgeAudio: false
	 * }, function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
	 *
	 * @example
	 * // end bridge
	 * var bridgeOptions = {
	 * 	callIds: []
	 * };
	 *
	 * client.Bridge.update("{bridgeId}", bridgeOptions)
	 * .then(function () {
	 * 	// continue
	 * });
	 *
	 * @example
	 * // Add two calls to bridge then remove one
	 * var bridgeOptions = {
	 * 	bridgeAudio : true,
	 * 	callIds: ["{callId1}","{callId2}"]
	 * };
	 *
	 * client.Bridge.update("{bridgeId}", bridgeOptions)
	 * .then(function () {
	 * 	var callIdsToRemainInBridge = {
	 * 		callIds: ["{callId1"]
	 * 	};
	 * 	return client.Bridge.update("{bridgeId}", callIdsToRemainInBridge)
	 * })
	 * .then(function () {
	 * 	//continue
	 * });
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
	 * Speak sentence to the bridge using default values
	 * @param {String} bridgeId The ID of the bridge
	 * @param {String} sentence A sentence to speak to the bridge.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence in a bridge
	 *
	 * //Promise
	 * client.Bridge.speakSentence("bridgeID", "Hello From Bandwidth").then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.speakSentence("bridgeID", "Hello From Bandwidth", function (err, res) {});
	 */
	this.speakSentence = function (bridgeId, sentence, callback) {
		return audioApi(bridgeId, { sentence : sentence }).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the bridge
	 * @param  {String} bridgeId the Id of the bridge to stop speaking
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Bridge.stopSpeaking("bridgeId").then(function (res) {});
	*/
	this.stopSpeaking = function (bridgeId, callback) {
		return this.speakSentence(bridgeId, "").asCallback(callback);
	};

	/**
	 * Play audio url to the bridge
	 * @param {String} bridgeId The ID of the bridge
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file on bridge
	 *
	 * //Promise
	 * client.Bridge.playAudioFile("bridgeID", "http://myurl.com/file.mp3").then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.playAudioFile("bridgeID", "http://myurl.com/file.wav", function (err, res) {});
	 */
	this.playAudioFile = function (bridgeId, fileUrl, callback) {
		return audioApi(bridgeId, { fileUrl : fileUrl }).asCallback(callback);
	};

	/**
	 * Play audio file or speak sentence in bridge
	 * @param {String} bridgeId The ID of the bridge
	 * @param {Object} params Parameters to play audio in bridge.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/bridges/#resourcePOSTv1usersuserIdbridgesbridgeIdaudio|docs}
	 * for list of supported locales.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/bridges/#resourcePOSTv1usersuserIdbridgesbridgeIdaudio|docs}
	 * for list of supported voices
	 * It will be considered only if sentence is not null/empty. Susan's voice will be used by default.
	 * @param {Boolean} [params.loopEnabled=false] When value is true, the audio will keep playing in a loop.
	 * Default: false.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio File on loop
	 * var options = {
	 * 	fileUrl     : "http://myurl.com/file.mp3",
	 * 	loopEnabled : true
	 * }
	 * //Promise
	 * client.Bridge.playAudioAdvanced("bridgeId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.playAudioAdvanced("bridgeId", options, function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Bridge.playAudioAdvanced("bridgeId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Bridge.playAudioAdvanced("bridgeId", options, function (err,res) {});
	 */
	this.playAudioAdvanced = function (bridgeId, params, callback) {
		return audioApi(bridgeId, params).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the bridge
	 * @param  {String} bridgeId the Id of the bridge to stop file playback
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Bridge.stopAudioFilePlayback("bridgeId").then(function (res) {});
	*/
	this.stopAudioFilePlayback = function (bridgeId, callback) {
		return this.playAudioFile(bridgeId, "").asCallback(callback);
	};

	/**
	 * Gets information about a bridge.
	 * @param  {String} bridgeId The ID of the bridge to get
	 * @param  {Function} callback A callback with the call information
	 * @return {Promise} A promise for the call information
	 * @example
	 * //Promise
	 * client.Bridge.getCalls('brg-65dhjbiei')
	 * .then(function (response) {
	 * 	console.log(response);
	 * });
	 *
	 * //Callback
	 * client.Bridge.getCalls('brg-65dhjrmbasiei',
	 * 	function (err, response) {
	 * 		if(err) {
	 * 			console.log(err);
	 * 		}
	 * 		else {
	 * 			console.log(response);
	 * 		}
	 * 	});
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
 * @class BridgeListResponse
 * @type {Object}
 * @property {Array.<BridgeResponse>} bridges Array of bridges
 * @property {function} getNextPage Calls the next page function
 * @property {boolean} hasNextPage True/False flag for next
 */

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
