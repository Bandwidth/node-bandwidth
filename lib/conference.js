/**
 * Conference
 * @constructor
 */
var Conference = function (client) {
	/**
	 * Create a new conference
	 * @param {Object} params Parameters for creating a conference
	 * @param {String} params.from The phone number that will host the conference.
	 * @param {String} [params.callbackUrl] The complete URL where the events related to the
	 * Conference will be sent to.
	 * @param {String} [params.callbackHttpMethod=post] Determine if the callback event should be sent
	 * via HTTP GET or HTTP POST.
	 * @param {String} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.fallbackUrl] Determine how long should the platform wait
	 * for callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.profile] Determines how DTMF is used. Values are:
	 *`interpret_digits`: the conference will handle DTMF with the default behavior, or `passthru_digits`:
	 * allows the application to receive DTMF events and use the `gather` API.
	 * @param {String} [params.tag] A string that will be included in the callback events
	 * of the conference.
	 * @param {Function} [callback] Callback with the newly created conference
	 * @return {ConferenceResponse} A promise for the newly created conference
	 * @example
	 * // Promise
	 * client.Conference.create({from: "+1234567890"}).then(function(conference){});
	 * // Callback
	 * client.Conference.create({from: "+1234567890"}, function(err, conference){});
	 */
	this.create = function (params, callback) {
		return client.makeRequest({
			path   : "conferences",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var conference = params;
			var location = response.headers.location;
			conference.id = location.substring(location.lastIndexOf("/") + 1);
			return conference;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about a conference.
	 * @param  {String} conferenceId The ID of the conference to get
	 * @param  {Function} [callback] A callback with the conference information
	 * @return {ConferenceResponse} A promise for the conference information
	 * @example
	 * // Promise
	 * client.Conference.get("conferenceId").then(function(conference){});
	 * // Callback
	 * client.Conference.get("conferenceId", function(err, conference){});
	 */
	this.get = function (conferenceId, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Update the conference
	 * @param  {String} conferenceId The ID of the conference
	 * @param {Object} params Changed parameters of the conference
	 * @param {String} [params.state] Conference state. Possible state values are:
	 * "completed" to terminate the conference.
	 * @param {String} [params.hold] If "true", all member can't hear or speak in the conference.
	 * If "false", all members can hear and speak in the conference (unless set at the member level).
	 * @param {String} [params.mute] If "true", all member can't speak in the conference.
	 * If "false", all members can speak in the conference (unless set at the member level).
	 * @param {String} [params.callbackUrl] The complete URL where the events related to the
	 * Conference will be sent to.
	 * @param {String} [params.callbackHttpMethod=post] Determine if the callback event should be sent
	 * via HTTP GET or HTTP POST.
	 * @param {String} [params.callbackTimeout] Determine how long should the platform wait for
	 * callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.fallbackUrl] Determine how long should the platform wait
	 * for callbackUrl's response before timing out in milliseconds.
	 * @param {String} [params.tag] A string that will be included in the callback events
	 * of the conference.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.update("conferenceID", {mute: "true"}).then(function(){});
	 * // Callback
	 * client.Conference.update("conferenceID", {mute: "true"}, function(err){});
	 */
	this.update = function (conferenceId, params, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Remove the conference
	 * @param  {String} conferenceId The ID of the conference
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.remove("conferenceID").then(function(){});
	 * // Callback
	 * client.Conference.remove("conferenceID", function(err){});
	 */
	this.remove = function (conferenceId, callback) {
		return this.update(conferenceId, { state : "completed" }, callback);
	};

	function audioApi (conferenceId, memberId, params, callback) {
		var path = "conferences/" + conferenceId;
		if (typeof memberId === "string") {
			path = path + "/members/" + memberId;
		}
		else {
			callback = params;
			params = memberId;
		}
		path += "/audio";
		return client.makeRequest({
			path   : path,
			method : "POST",
			body   : params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	}

	/**
	 * Speak sentence to the conference using default values
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} sentence A sentence to speak to the conference.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence in a conference
	 *
	 * //Promise
	 * client.Conference.speakSentence("conferenceID", "Hello From Bandwidth").then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.speakSentence("conferenceID", "Hello From Bandwidth", function (err, res) {});
	 */
	this.speakSentence = function (conferenceId, sentence, callback) {
		return audioApi(conferenceId, { sentence : sentence }).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the conference
	 * @param  {String} conferenceId the Id of the conference to stop speaking
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Conference.stopSpeaking("conferenceId").then(function (res) {});
	*/
	this.stopSpeaking = function (conferenceId, callback) {
		return this.speakSentence(conferenceId, "").asCallback(callback);
	};

	/**
	 * Play audio url to the conference
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file on conference
	 *
	 * //Promise
	 * client.Conference.playAudioFile("conferenceID", "http://myurl.com/file.mp3").then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioFile("conferenceID", "http://myurl.com/file.wav", function (err, res) {});
	 */
	this.playAudioFile = function (conferenceId, fileUrl, callback) {
		return audioApi(conferenceId, { fileUrl : fileUrl }).asCallback(callback);
	};

	/**
	 * Play audio file or speak sentence in conference
	 * @param {String} conferenceId The ID of the conference
	 * @param {Object} params Parameters to play audio in conference.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence.
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
	 * client.Conference.playAudioAdvanced("conferenceId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Conference.playAudioAdvanced("conferenceId", options).then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
	 */
	this.playAudioAdvanced = function (conferenceId, params, callback) {
		return audioApi(conferenceId, params).asCallback(callback);
	};

	/**
	 * This stops any file audio playback on the conference
	 * @param  {String} conferenceId the Id of the conference to stop file playback
	 * @return {Promise} A promise of the operation
	 * @example
	 * //Promise
	 * client.Conference.stopAudioFilePlayback("conferenceId").then(function (res) {});
	*/
	this.stopAudioFilePlayback = function (conferenceId, callback) {
		return this.playAudioFile(conferenceId, "").asCallback(callback);
	};

	/**
	 * Gets information about a conference members.
	 * @param  {String} conferenceId The ID of the conference to get memebers
	 * @param  {Function} callback A callback with member list
	 * @return {Promise} A promise for member list
	 * @example
	 * // Promise
	 * client.Conference.getMembers("conferenceId").then(function(members){});
	 * // Callback
	 * client.Conference.getMembers("conferenceId", function(err, members){});
	 */
	this.getMembers = function (conferenceId, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members",
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Gets information about a single conference member.
	 * @param  {String} conferenceId The ID of the conference
	 * @param  {String} memberId The ID of the member
	 * @param  {Function} callback A callback with the member
	 * @return {Promise} A promise for the member
	 * @example
	 * // Promise
	 * client.Conference.getMember("conferenceId", "memberId").then(function(member){});
	 * // Callback
	 * client.Conference.getMember("conferenceId", "memberId", function(err, member){});
	 */
	this.getMember = function (conferenceId, memberId, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members/" + memberId,
			method : "GET"
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

	/**
	 * Add members to a conference.
	 * @param {Object} params Parameters for new member
	 * @param {String} params.callId The callId must refer to an active call that was created
	 * using this conferenceId.
	 * @param {String} [params.joinTone] If "true", will play a tone when the member joins the conference.
	 * If "false", no tone is played when the member joins the conference.
	 * @param {String} [params.leavingTone] If "true", will play a tone when the member leaves the conference.
	 * If "false", no tone is played when the member leaves the conference.
	 * @param {String} [params.mute] If "true", member can't speak in the conference. If "false",
	 * this members can speak in the conference (unless set at the conference level).
	 * @param {String} [params.hold] If "true", member can't hear or speak in the conference.
	 * If "false", member can hear and speak in the conference (unless set at the conference level).
	 * @param {Function} [callback] Callback with the added member
	 * @return {ConferenceResponse} A promise for the added member
	 * @example
	 * // Promise
	 * client.Conference.createMember("conferenceId", {callId: "callID"}).then(function(member){});
	 * // Callback
	 * client.Conference.createMember("conferenceId", {callId: "callID"}, function(err, member){});
	 */
	this.createMember = function (conferenceId, params, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members",
			method : "POST",
			body   : params
		})
		.then(function (response) {
			var conference = params;
			var location = response.headers.location;
			conference.id = location.substring(location.lastIndexOf("/") + 1);
			return conference;
		})
		.asCallback(callback);
	};

	/**
	 * Update the conference member
	 * @param  {String} conferenceId The ID of the conference
	 * @param  {String} memberId The ID of the member
	 * @param {Object} params Changed parameters of the member
	 * @param {String} [params.joinTone] If "true", will play a tone when the member joins the conference.
	 * If "false", no tone is played when the member joins the conference.
	 * @param {String} [params.leavingTone] If "true", will play a tone when the member leaves the conference.
	 * If "false", no tone is played when the member leaves the conference.
	 * @param {String} [params.mute] If "true", member can't speak in the conference. If "false",
	 * this members can speak in the conference (unless set at the conference level).
	 * @param {String} [params.hold] If "true", member can't hear or speak in the conference.
	 * If "false", member can hear and speak in the conference (unless set at the conference level).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.updateMember("conferenceID", "memberId", {mute: "true"}).then(function(){});
	 * // Callback
	 * client.Conference.updateMember("conferenceID", "memberId", {mute: "true"}, function(err){});
	 */
	this.updateMember = function (conferenceId, memberId, params, callback) {
		return client.makeRequest({
			path   : "conferences/" + conferenceId + "/members/" + memberId,
			method : "POST",
			body   : params
		})
		.then(function () {
			return;
		})
		.asCallback(callback);
	};

	/**
	 * Remove the conference member
	 * @param  {String} conferenceId The ID of the conference
	 * @param  {String} memberId The ID of the member
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * // Promise
	 * client.Conference.removeMember("conferenceID", "memberId").then(function(){});
	 * // Callback
	 * client.Conference.removeMember("conferenceID", "memberId", function(err){});
	 */
	this.removeMember = function (conferenceId, memberId, callback) {
		return this.updateMember(conferenceId, memberId, { state : "completed" }, callback);
	};

	/**
	 * Speak sentence to the conference member using default values
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} memberId The ID of the member
	 * @param {String} sentence A sentence to speak to the member.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Speak sentence
	 *
	 * //Promise
	 * client.Conference.speakSentenceToMember("conferenceID", "memberID", Hello From Bandwidth")
	 *   .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.speakSentenceToMember("conferenceID", "memberID", "Hello From Bandwidth",
	 *   function (err, res) {});
	 */
	this.speakSentenceToMember = function (conferenceId, memberId, sentence, callback) {
		return audioApi(conferenceId, memberId, { sentence : sentence }).asCallback(callback);
	};

	/**
	 * Play audio url to the conference member
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} memberId The ID of the member
	 * @param {String} fileUrl The http location of an audio file to play (WAV and MP3 supported).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 * @example
	 * //Play Audio file
	 *
	 * //Promise
	 * client.Conference.playAudioFileToMember("conferenceID", "memberId", http://myurl.com/file.mp3")
	 *   .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioFileToMember("conferenceID", "memberId", http://myurl.com/file.wav",
	 *    function (err, res) {});
	 */
	this.playAudioFileToMember = function (conferenceId, memberId, fileUrl, callback) {
		return audioApi(conferenceId, memberId, { fileUrl : fileUrl }).asCallback(callback);
	};

	/**
	 * Play audio file or speak sentence to the conference member
	 * @param {String} conferenceId The ID of the conference
	 * @param {String} memberId The ID of the member
	 * @param {Object} params Parameters to play audio.
	 * @param {String} [params.fileUrl] The http location of an audio file to play (WAV and MP3 supported).
	 * @param {String} [params.sentence] The sentence to speak.
	 * @param {String} [params.gender=female] The gender of the voice used to synthesize the sentence.
	 * It will be considered only if sentence is not null. The female gender will be used by default.
	 * @param {String=} [params.locale=en_US] The locale used to get the accent of the voice used to
	 * synthesize the sentence.
	 * It will be considered only if sentence is not null/empty. The en_US will be used by default.
	 * @param {String} [params.voice=Susan] The voice to speak the sentence.
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
	 * client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options)
	 *  .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options,
	 *   function (err,res) {});
	 * @example
	 * //Speak sentence with options
	 * var options = {
	 * 	sentence : "hola de Bandwidth",
	 * 	gender   : "male",
	 * 	locale   : "es",
	 * 	voice    : "Jorge"
	 * }
	 * //Promise
	 * client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options)
	 *   .then(function (res) {});
	 *
	 * //Callback
	 * client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
	 */
	this.playAudioAdvancedToMember = function (conferenceId, memberId, params, callback) {
		return audioApi(conferenceId, memberId, params).asCallback(callback);
	};
};

module.exports = Conference;

/**
 * @class ConferenceResponse
 * @type {Object}
 * @property {String} id The unique ID of the conference.
 * @property {String} state Conference state. Possible state values are described here.
 * @property {String} from The phone number that will host the conference.
 * @property {String} createdTime The time that the Conference was created (UTC).
 * @property {String} completedTime The time that the Conference was completed (UTC).
 * @property {Number} activeMembers The number of active conference members.
 * @property {String} hold If "true", all member can't hear or speak in the conference.
 * If "false", all members can hear and speak in the conference (unless set at the member level).
 * @property {String} mute If "true", all member can't speak in the conference.
 * If "false", all members can speak in the conference (unless set at the member level).
 * @property {String} callbackUrl The complete URL where the events related to the
 * Conference will be sent to.
 * @property {String} profile If "interpret_digits": the conference will handle DTMF with the default behavior
 * or if "passthru_digits": allows the application to receive DTMF events and use the `gather` API.
 * @property {String} callbackHttpMethod Determine if the callback event should be sent
 * via HTTP GET or HTTP POST.
 * @property {String} callbackTimeout Determine how long should the platform wait for
 * callbackUrl's response before timing out in milliseconds.
 * @property {String} fallbackUrl Determine how long should the platform wait
 * for callbackUrl's response before timing out in milliseconds.
 * @property {String} tag A string that will be included in the callback events
 * of the conference.
 */
