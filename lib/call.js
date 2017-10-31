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

	/**
	 * Update properties of an active phone call.
	 * @param {String} callId The ID of the incoming call
	 * @param {Object} params The propreties to update
	 * @param {string} [params.state] The call state.
	 * Possible values:
	 * `rejected` to reject not answer,
	 * `active` to answer the call,
	 * `completed` to hangup the call,
	 * `transferring` to start and connect call to a new outbound call.
	 * @param {string} [params.recordingEnabled] Indicates if the call should be recorded.
	 * Values `true` or `false`. You can turn recording on/off and have multiple recordings on a single call.
	 * @param {string} [params.recordingFileFormat] The file format of the recorded call.
	 * Supported values are `wav` (default) and `mp3`.
	 * @param {string} [params.transferTo] Phone number or SIP address that the call is going to be transferred to.
	 * @param {string} [params.transferCallerId] This is the caller id that will be used when the call is transferred.
	 * This parameter is only considered in `transfer` state.
	 * <br> - transferring an incoming call:
	 * Allowed values are 1) "private" 2) the incoming call "from" number or 3) any Bandwidth number owned by user.
	 * <br> - transferring an outgoing call call:
	 * allowed values are 1) "private" or 2) any Bandwidth phone number owned by user.
	 * @param {string} [params.whisperAudio] Audio to be played to the caller that the call will be transferred to.
	 * @param {string} [params.callbackUrl] The server URL where the call events for the new call will be sent.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Start recording a mp3 and update the callback url
	 * var payLoad = {
	 * 	recordingEnabled: "true",
	 * 	recordingFileFormat = "mp3",
	 * 	callbackUrl: "http://yourUrl.com/callbacks/callrecording"
	 * };
	 *
	 * client.call.update("callId", payload)
	 * .then(function () {
	 * 	// keep on keeping on here;
	 * });
	 */
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

	/**
	 * Answer an incoming call
	 * @param {String} callId The ID of the incoming call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Promise
	 * client.Call.answer("callID").then(function () {});
	 *
	 * //Callback
	 * client.Call.answer("callID", function (err) {});
	 */
	this.answer = function (callId, callback) {
		return this.update(callId, { state : "active" }).asCallback(callback);
	};

	/**
	 * Reject an incoming call
	 * @param {String} callId The ID of the incoming call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Promise
	 * client.Call.reject("callID").then(function () {});
	 *
	 * //Callback
	 * client.Call.reject("callID", function (err) {});
	 */
	this.reject = function (callId, callback) {
		return this.update(callId, { state : "rejected" }).asCallback(callback);
	};

	/**
	 * Complete active call
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Promise
	 * client.Call.hangup("callID").then(function () {});
	 *
	 * //Callback
	 * client.Call.hangup("callID", function (err) {});
	 */
	this.hangup = function (callId, callback) {
		return this.update(callId, { state : "completed" }).asCallback(callback);
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
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}.
	 * @param {String} [params.whisperAudio.gender=female] The gender of the voice used to synthesize the sentence
	 * @param {String} [params.whisperAudio.voice=Susan] The voice to speak the sentence
	 * @param {String} [params.whisperAudio.locale=en_US]
	 * The locale used to get the accent of the voice used to synthesize the sentence.
	 * @param {String} [params.whisperAudio.fileUrl] The location of an audio file to play WAV and MP3 supported
	 * @param {Boolean} [params.whisperAudio.loopEnabled=false] Loop media
	 * @param {Function} [callback] Callback with the transfered call
	 * @return {CallResponse} A promise for the transfered call
	 * @example
	 * //Transfer call
	 * var speakSentence = {
	 * 	transferTo       : "+15555555555",
	 * 	transferCallerId : "private",
	 * 	whisperAudio     : {
	 * 		sentence : "You have an incoming call",
	 * 		gender   : "female",
	 * 		voice    : "julie",
	 * 		locale   : "en"
	 * 	}
	 * };
	 *
	 * //Using Promises
	 * client.Call.transfer("callId", speakSentence).then(function (res) {});
	 *
	 * var playAudio = {
	 * 	fileUrl     : "http://mysite.com/file.wav",
	 * 	loopEnabled : true
	 * }
	 * //Using callbacks
	 * client.Call.transfer("callId", playAudio, function (err, res) {});
	 *
	 * @example
	 * //Example: Transfer a call using the caller Id of the party being transferred
	 * var transferPayload = {
	 * 	transferTo       : "+18382947878",
	 * };
	 *
	 * //Using Promises
	 * client.Call.transfer("callId", transferPayload).then(function (res) {});
	 *
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
	 * This stops any speak sentence audio playback on the call
	 * @param {String} callId The ID of the call to stop file playback
	 * @return {Promise} A promise for the call information
	 * @example
	 * //Stop Audio file on call
	 * client.Call.stopSpeaking("callId").then(function (res) {});
	 */
	this.stopSpeaking = function (callId,callback) {
		return this.speakSentence(callId, "").asCallback(callback);
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
	 * This stops any stop file audio playback on the call
	 * @param {String} callId The ID of the call to stop file playback
	 * @return {Promise} A promise for the call information
	 * @example
	 * //Stop Audio file on call
	 * client.Call.stopAudioFilePlayback("callId").then(function (res) {});
	 */
	this.stopAudioFilePlayback = function (callId,callback) {
		return this.playAudioFile(callId, "").asCallback(callback);
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

	/**
	 * Turns on call recording for the active call
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Turn on recording
	 *
	 * //Promise
	 * client.Call.enableRecording("callId").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.enableRecording("callId", function (err, res) {});
	 */
	this.enableRecording = function (callId, callback) {
		return this.update(callId, { recordingEnabled : true }).asCallback(callback);
	};

	/**
	 * Turns off call recording for the active call
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Turn off recording
	 *
	 * //Promise
	 * client.Call.disableRecording("callId").then(function (res) {});
	 *
	 * //Callback
	 * client.Call.disableRecording("callId", function (err, res) {});
	 */
	this.disableRecording = function (callId, callback) {
		return this.update(callId, { recordingEnabled : false }).asCallback(callback);
	};

	this.setMaxRecordingDuration = function (callId, recordingMaxDuration, callback) {
		return this.update(callId, { recordingMaxDuration : recordingMaxDuration }).asCallback(callback);
	};

	/**
	 * Collects a series of DTMF digits from a phone call with an optional prompt.
	 * @param {String} callId The ID of the call
	 * @param {Object} params Parameters for creating a gather
	 * @param {String} [params.maxDigits] The maximum number of digits to collect (max: 30)
	 * @param {String} [params.interDigitTimeout=5] Stop gathering if a DTMF digit is not detected
	 * in this many seconds (max: 30s)
	 * @param {String} [params.terminatingDigits=#] A string of DTMF digits that end the gather operation immediately
	 * if any one of them is detected
	 * @param {String} [params.tag] A string you choose that will be included with the response and
	 * events for this gather operation.
	 * @param {String} [params.prompt.sentence] The text to speak for the prompt.
	 * Uses the same defaults as call.playAudioAdvanced. See the
	 * {@link http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio|docs}
	 * @param {String} [params.prompt.gender] The gender to use for the voice reading the prompt sentence
	 * @param {String} [params.prompt.locale] The language and region to use for the voice reading the prompt sentence
	 * @param {Boolean} [params.prompt.loopEnabled=false] When value is true, the audio will keep playing in a loop
	 * @param {Boolean} [params.prompt.bargeable=true] Make the prompt (audio or sentence) bargeable
	 * (will be interrupted at first digit gathered).
	 * @param {Strings} [params.prompt.fileUrl] Make the prompt (audio or sentence) bargeable
	 * (will be interrupted at first digit gathered).
	 * @param {Function} [callback] Callback with the newly created call
	 * @return {CallResponse} A promise for the newly created call
	 * @example
	 * //Create Gather
	 * //The gather ends if either 0, #, or * is detected
	 * var options = {
	 * 	maxDigits         : 30,
	 * 	interDigitTimeout : "30",
	 * 	terminatingDigits : "0#*",
	 * 	prompt            : {
	 * 		sentence    : "Please enter your account number and press pound",
	 * 		gender      : "male",
	 * 		voice       : "Simon",
	 * 		locale      : "en_UK",
	 * 		loopEnabled : true,
	 * 		bargeable   : true
	 * 	}
	 * };
	 * //Promise
	 * client.Call.createGather("callId", options).then(function(res) {});
	 *
	 * //Callback
	 * client.Call.createGather("callId", options, function(err, res) {});
	 */
	this.createGather = function (callId, params, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/gather",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var gather = params;
			var location = response.headers.location;
			gather.id = location.substring(location.lastIndexOf("/") + 1);
			return gather;
		})
		.asCallback(callback);
	};

	/**
	 * Get the gather DTMF parameters and results.
	 * @param {String} callId The ID of the call
	 * @param {String} gatherId The ID of the gather
	 * @param {Function} [callback] Callback with the gather
	 * @return {GatherResponse} A promise for the gather
	 */
	this.getGather = function (callId, gatherId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/gather/" + gatherId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Complete the gather.
	 * @param {String} callId The ID of the call
	 * @param {String} gatherId The ID of the gather
	 * @param {Function} [callback] Callback of the operation
	 * @return {Promise} A promise for the operation
	 */
	this.completeGather = function (callId, gatherId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/gather/" + gatherId,
			method : "POST",
			body   : { state : "completed" }
		})
		.asCallback(callback);
	};

	/**
	 * Get events for the call.
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback with the event list
	 * @return {Array.<EventResponse>} A promise for the event list
	 * @example
	 * // Promise
	 * client.Call.getEvents(callId).then(function (events) {});
	 * // Callback
	 * client.Call.getEvents(callId, function (err, events) {});
	 */
	this.getEvents = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/events",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get a single event for the call.
	 * @param {String} callId The ID of the call
	 * @param {String} eventId The ID of the event to get
	 * @param {Function} [callback] Callback with the event list
	 * @return {EventResponse} A promise for the event list
	 * @example
	 * // Promise
	 * client.Call.getEvent(callId, evenId).then(function (callEvent) {});
	 * // Callback
	 * client.Call.getEvent(callId, eventId, function (err, callEvent) {});
	 */
	this.getEvent = function (callId, eventId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/events/" + eventId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get recordings for the call.
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback with the recording list
	 * @return {Array.<RecordingResponse>} A promise for the recording list
	 * @example
	 * // Promise
	 * client.Call.getRecordings(callId).then(function (list) {});
	 * // Callback
	 * client.Call.getRecordings(callId, function (err, list) {});
	 */
	this.getRecordings = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/recordings",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Get transcriptions for the call.
	 * @param {String} callId The ID of the call
	 * @param {Function} [callback] Callback with the transcription list
	 * @return {Array.<TranscriptionResponse>} A promise for the transcription list
	 * @example
	 * // Promise
	 * client.Call.getTranscriptions(callId).then(function (list) {});
	 * // Callback
	 * client.Call.getTranscriptions(callId, function (err, list) {});
	 */
	this.getTranscriptions = function (callId, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/transcriptions",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Send DTMF (phone keypad digit presses).
	 * @param {String} callId The ID of the call
	 * @param {String} dtmfOut String containing the DTMF characters to be sent
	 * in a call.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Call.sendDtmf(callId, "1").then(function () {});
	 * // Callback
	 * client.Call.sendDtmf(callId, "1", function (err) {});
	 */
	this.sendDtmf = function (callId, dtmfOut, callback) {
		return client.makeRequest({
			path   : "calls/" + callId + "/dtmf",
			method : "POST",
			body   : { dtmfOut : dtmfOut }
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
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

/**
 * @class GatherResponse
 * @type {Object}
 * @property {String} id The unique ID of the gather.
 * @property {String} state The state of the gather.
 * @property {String} reason The reason of completing of the gather.
 * @property {String} createdTime Time of creation of the gather.
 * @property {String} completedTime TIme of completion of the gather.
 * @property {String} digits Gathered digits.
 */

/**
 * @class EventResponse
 * @type {Object}
 * @property {String} id The call event id.
 * @property {String} time The time the event occurred.
 * @property {String} name The name of the event.
 * @property {String} data Data about event.
 */

/**
 * @class RecordingResponse
 * @type {Object}
 * @property {String} id The recording id.
 * @property {String} startTime Date/time when the recording started.
 * @property {String} endTime Date/time when the recording ended.
 * @property {String} call The complete URL to the call resource this recording is associated with.
 * @property {String} media The complete URL to the media resource this recording is associated with.
 * @property {String} state The state of the recording
 */

/**
 * @class  TranscriptionResponse
 * @type {Object}
 * @property {String} id The transcription id.
 * @property {String} state The state of the transcription
 * @property {String} text The transcribed text (only first 1000 characters)
 * @property {String} time The date/time the transcription resource was created
 * @property {Number} chargeableDuration The seconds between activeTime and endTime for the recording;
 *  this is the time that is going to be used to charge the resource.
 * @property {Number} textSize The size of the transcribed text.
 * @property {String} textUrl An url to the full text
 */
