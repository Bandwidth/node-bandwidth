/**
 * Voice call
 * @constructor
 */
var Call = function (client) {
	/**
	 * Create a new voice call
	 * @param {Object} params Parameters for creating a new call
	 * @param {String} params.from A Bandwidth phone number on your account the
	 * call should come from (must be in E.164 format, like +19195551212).
	 * @param {String} params.to The number to call (must be either an E.164 formated number,
	 * like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com).
	 * @param {Number} [params.callTimeout] Determine how long should the platform wait for]
	 * call answer before timing out in seconds.
	 * @param {String} [params.callbackUrl] The full server URL where the call events related to the
	 * Call will be sent to.
	 * @param {Number} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.callbackHttpMethod] Determine if the callback event should be sent via HTTP GET
	 * or HTTP POST. Values are "GET" or "POST" (if not set the default is POST).
	 * @param {String} [params.fallbackUrl] The full server URL used to send the callback
	 * event if the request to callbackUrl fails.
	 * @param {String} [params.bridgeId] The id of the bridge where the call will be added.
	 * @param {String} [params.conferenceId] Id of the conference where the call will be added.
	 * This property is required if you want to add this call to a conference.
	 * @param {String} [params.recordingEnabled] Indicates if the call should be recorded after being created.
	 * Set to "true" to enable. Default is "false".
	 * @param {String} [params.recordingMaxDuration] Indicates the maximum duration of call recording in seconds.
	 * Default value is 1 hour.
	 * @param {String} [params.transcriptionEnabled] Whether all the recordings for this call is going to be
	 * automatically transcribed.
	 * @param {String} [params.tag] A string that will be included in the callback events of the call.
	 * @param {Object} [params.sipHeaders] Map of Sip headers prefixed by "X-". Up to 5 headers can be sent per call.
	 * @param {Function} [callback] Callback with the newly created call
	 * @return {CallResponse} A promise for the newly created call
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "calls",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var call = params;
			var location = response.headers.location;
			var callId = location.substring(location.lastIndexOf("/") + 1);
			call.id = callId;
			return call;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about an active or completed call.
	 * @param  {String} callId The ID of the call to get
	 * @param  {Function} callback A callback with the call information
	 * @return {Promise} A promise for the call information
	 */
	this.get = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of active and historic calls you made or received.
	 * @param {Object} params Query parameters for listing calls
	 * @param {String} [params.bridgeId] The id of the bridge for querying a list of calls history
	 * (pagination does not apply).
	 * @param {String} [params.conferenceId] The id of the conference for querying a list of calls history
	 * @param {String} [params.from] The number to filter calls that came from (must be either an E.164
	 * formated number,like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com).
	 * @param {String} [params.to] The number to filter calls that was called to (must be either an E.164
	 * formated number,like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com).
	 * @param {Number} [params.page=0] Used for pagination to indicate the page requested for querying a list of calls.
	 * If no value is specified the default is 0.
	 * @param {Number} [params.size=25] Used for pagination to indicate the size of each page requested
	 * for querying a list of calls. If no value is specified the default value is 25 (maximum value 1000).
	 * @param {Function} callback A callback with the list of calls
	 * @return {Promise} A promise for the list of calls
	 */
	this.list = function (params, callback) {
		return client.makeRequest({
			path   : "calls",
			method : "GET",
			qs     : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	this.update = function (callId, params, callback) {
		return client.makeRequest({
			path   : "calls/" + callId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	this.answer = function (callId, callback) {
		return this.update(callId, { state : "active" }).asCallback(callback);
	};

	/**
	 * Transfer a call
	 * @param {Object} params Parameters for transfering of the call
	 * @param {String} params.transferTo Phone number or SIP address that the call
	 * is going to be transferred to.
	 * @param {String} [params.transferCallerId] The caller id that will be used when the call is transferred
	 * see the {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallId|docs}
	 * for supported options.
	 * @param {Object} [params.whisperAudio] Audio to be played to the caller that the call will be transferred to.
	 * Uses the same parameters as call.playAudioAdvanced. See the
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallId|docs}.
	 * @param {String} [params.whisperAudio.gender=female] The gender of the voice used to synthesize the sentence
	 * @param {String} [params.whisperAudio.voice=Susan] The voice to speak the sentence
	 * @param {String} [params.whisperAudio.locale=en_US]
	 * The locale used to get the accent of the voice used to synthesize the sentence.
	 * @param {Function} [callback] Callback with the transfered call
	 * @return {CallResponse} A promise for the transfered call
	 * @example
	 * //Transfer call
	 * var options = {
	 * 	transferTo       : "+15555555555",
	 * 	transferCallerId : "private",
	 * 	whipserAudio     : {
	 * 		sentence : "You will be transferred to 555-555-5555",
	 * 		gender   : "female",
	 * 		voice    : "julie",
	 * 		locale   : "en"
	 * 	};
	 *
	 * //Using Promises
	 * client.Call.transfer("callId", options).then(function (res) {});
	 *
	 * //Using callbacks
	 * client.Call.transfer("callId", options, function (err, res) {});
	 */
	this.transfer = function (callId, params, callback) {
		params.state = "transferring";
		return client.makeRequest({
			path   : "calls/" + callId,
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var location = response.headers.location;
			var callId = location.substring(location.lastIndexOf("/") + 1);
			return { id : callId };
		})
		.asCallback(callback);
	};

	function audioApi (callId, params, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/audio",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	}

	/**
	 * Speak sentence to the call using default values
	 * @param {String} callId The ID of the call
	 * @param {String} sentence A sentence to speak to the call.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence in a call
	 *
	 * //Promise
	 * client.Call.speakSentence("callID", "Hello From Bandwidth").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.speakSentence("callID", "Hello From Bandwidth", function (err, res) {});
	 */
	this.speakSentence = function (callId, sentence, callback) {
		return audioApi(callId, { sentence : sentence }).asCallback(callback);
	};

	/**
	 * Play audio url to the call
	 * @param {String} callId The ID of the call
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file on call
	 *
	 * //Promise
	 * client.Call.playAudioFile("callId", "http://myurl.com/file.mp3").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.playAudioFile("callId", "http://myurl.com/file.wav", function (err, res) {});
	 */
	this.playAudioFile = function (callId, fileUrl, callback) {
		return audioApi(callId, { fileUrl : fileUrl }).asCallback(callback);
	};

	/**
	 * Play audio file or speak sentence in call
	 * @param {String} callId The ID of the call
	 * @param {Object} params Parameters to play audio in call.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}
	 * for list of supported locales.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence. Check out
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}
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
	 * client.Call.playAudioAdvanced("callId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Call.playAudioAdvanced("callId", options, function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Call.playAudioAdvanced("callId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Call.playAudioAdvanced("callId", options, function (err,res) {});
	 */
	this.playAudioAdvanced = function (callId, params, callback) {
		return audioApi(callId, params).asCallback(callback);
	};

	this.enableRecording = function (callId, callback) {
		return this.update(callId, { recordingEnabled : true }).asCallback(callback);
	};

	this.setMaxRecordingDuration = function (callId, recordingMaxDuration, callback) {
		return this.update(callId, { recordingMaxDuration : recordingMaxDuration }).asCallback(callback);
	};
};

module.exports = Call;

/**
 * @class CallResponse
 * @type {Object}
 * @property {String} id The unique ID of the call.
 * @property {String} direction Call direction: values are 'in' for an incoming call, 'out' for an outgoing call
 * @property {String} from The phone number or SIP address that made the call.
 * Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com).
 * @property {String} to The phone number or SIP address that received the call.
 * Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com).
 * @property {String} state The call state. Described below, values are
 * 'started' 'rejected' 'active' 'completed' 'transferring'
 * @property {String} startTime Date when the call was created. Timestamp follows the ISO8601 format.
 * @property {String} activeTime Date when the call was answered. Timestamp follows the ISO8601 format.
 * @property {String} endTime Date when the call ended. Timestamp follows the ISO8601 format.
 * @property {Number} callTimeout Determine how long should the platform wait for
 * call answer before timing out in seconds
 * @property {String} callbackUrl The server URL where the call events related to the call will be sent.
 * @property {String} callbackHttpMethod Determine if the callback event should be sent via
 * HTTP GET or HTTP POST. Values are 'get' or 'post' Default is 'post'
 * @property {Number} callbackTimeout Determine how long should the platform wait for
 * callbackUrl's response before timing out (milliseconds).
 * @property {String} fallbackUrl The server URL used to send the call events if the request to callbackUrl fails.
 * @property {Number} chargeableDuration The number of seconds the call will be billed for.
 * @property {String} transferTo	Phone number or SIP address that the call is going to be transferred to.
 * @property {String} transferCallerId	This is the caller id that will be used when
 * the call is transferred. This parameter is only considered in transfer state.
 * @property {String} whisperAudio	Audio to be played to the caller that the call will be transferred to.
 * @property {String} bridgeId	The id of the bridge where the call will be added.
 * @property {String} bridge	The URL of the bridge, if any, that contains the call.
 * @property {String} conferenceId	The id of the conference where the call will be added.
 * This property is required if you want to add this call to a conference.
 * @property {String} conference	The complete URL of the conference resource the call is associated with.
 * @property {String} events The URL to retrieve the events related to the call.
 * @property {String} recordingEnabled=false	Indicates if the call should be recorded
 * after being created. Set to 'true' to enable. Default is 'false'
 * @property {String} recordingFileFormat=wav The file format of the recorded call.
 * Supported values are 'wav' (default) and 'mp3'.
 * @property {Number} recordingMaxDuration=3600	Indicates the maximum duration of
 * call recording in seconds. Default value is 1 hour.
 * @property {Boolean} transcriptionEnabled	Whether all the recordings for
 * this call should be be automatically transcribed.
 * tag Any string, it will be included in the callback events of the call.
 * @property {Number} page=0 Used for pagination to indicate the page requested for
 * querying a list of calls. If no value is specified the default is 0.
 * @property {Number} size=25 Used for pagination to indicate the size of each page requested
 * for querying a list of calls. If no value is specified the default value is 25 (maximum value 1000).
 * @property {Object} sipHeaders Map of Sip headers prefixed by "X-".
 * Up to 5 headers can be sent per call. Max length for header and value is 256 characters.
 */
