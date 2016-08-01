var builder = require("xmlbuilder");
/**
 * @constructor
 * Creates a new BXML Response object.
 * Call .toString() on this method to obtain the BXML string.
 */

var BXMLResponse = function () {
	this.xml = builder.create("Response", {
		encoding : "UTF-8"
	});
	/**
	 * Create a SpeakSentence tag.
	 * @param {string} sentence The sentence to have the voice say.
	 * @param {Object} params The parameters for the API SpeakSentence call.
	 * @param {string} [params.gender="female"] The gender of the speaker.
	 * @param {string} [params.locale="en_US"] The locale for the speaker.
	 * @param {string} [params.voice="julie"] The voice for the speaker.
	 * @return {BXMLResponse} this, for chaining
	 */

	this.say = function (sentence, params) {
		params = params || { };
		params.locale = params.locale || "en_US";
		params.gender = params.gender || "female";
		params.voice = params.voice || "julie";
		this.xml = this.xml.ele("SpeakSentence", params, sentence).up();
		return this;
	};

	/**
	 * Create a Gather call, which collects pressed numbers.
	 * @param {Object} params The parameters for the Gather verb.
	 * @param {string} params.requestURL Relative or absolute URL to send events to and request new BXML.
	 * @param {number} [params.requestURLTimeout=3000] Time to wait for requestURL response in ms.
	 * @param {string} [params.terminatingDigits=#] Digits to stop gather.
	 * @param {number} [params.maxDigits=128] Maximum number of digits to collect.
	 * @param {number} [params.integerDigitTimeout=5] Timeout between digits.
	 * @param {boolean} [params.bargeable=true] Boolean indicating if audio should stop when digit is pressed.
	 * @param {function} [callback] A function containing the verbs to be nested inside the Gather call.
	 * @return {BXMLResponse} this, for chaining
	 */
	this.gather = function (params, callback) {
		this.xml = this.xml.ele("Gather", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};

	/**
	 * @return {string} A string representation of the object's BXML.
	 */
	this.toString = function () {
		return this.xml.end({
			pretty : true,
			indent : "     "
		}).toString();
	};

	/**
	 * Create a new call to another phone number.
	 * @param {Object} params The parameters for the Call verb.
	 * @param {string} params.from Defines the number the call will be created from.
	 * @param {string} params.to Defines the number the call will be made to.
	 * @param {string} [params.requestUrl] URL to send event
	 * @param {number} [params.timeout] The timeout, in seconds, for the call to answer
	 * @param {number} [params.requestUrlTimeout] Timeout, in ms, to request new BXML document
	 * @param {function} [callback] A function containing the verbs to be nested inside the Call verb
	 * @return {BXMLResponse} this, for chaining
	 */
	this.call = function (params, callback) {
		this.xml = this.xml.ele("Call", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};

	/**
	 * Create a new conference call.
	 * @param {Object} params The parameters for the Conference verb.
	 * @param {string} params.from The phone number that will host the conference.
	 * @param {string} [params.statusCallbackUrl] URL to which conference callbacks will be POSTed
	 * @param {boolean} [params.joinTone=true] Determines whether or not a tone is played on join.
	 * @param {boolean} [params.leavingTone=true] Determines whether or not a tone is played on leave.
	 * @param {string} [params.tag] A string that will be included in the callback events of the conference.
	 * @param {boolean} [params.mute=false] Determines whether or not the member will join muted.
	 * @param {boolean} [params.hold=false] Determines whether or not the member will join on hold.
	 * @return {BXMLResponse} this, for chaining.
	 */

	this.conference = function (params) {
		params.joinTone = params.joinTone || true;
		params.leavingTone = params.leavingTone || true;
		this.xml = this.xml.ele("Conference", params).up();
		return this;
	};

	/**
	 * Terminates an outgoing call.
	 * @return {BXMLResponse} this, for chaining.
	 */

	this.hangup = function () {
		this.xml = this.xml.ele("Hangup").up();
		return this;
	};

	/**
	 * Plays an audio file located at a specified URL.
	 * @param {string} audio The URL of the audio to be played.
	 * @return {BXMLResponse} this, for chaining.
	 */

	this.playAudio = function (audio) {
		this.xml = this.xml.ele("PlayAudio", {}, audio).up();
		return this;
	};
	/**
	 * Records the call. At end of call, a call recording event is sent to the callback URL.
	 * @param {Object} params The parameters for the Record verb.
	 * @param {string} [params.requestUrl] URL to send event and request new BXML.
	 * @param {number} [params.requestUrlTimeout] Timeout, in ms, to wait for requestUrl response.
	 * @param {string} [params.fileFormat] The format in which to save the recording - mp3 or wav.
	 * @param {string} [params.terminatingDigits] One or more digits that will finish the recording.
	 * @param {number} [params.maxDuration=300] Time, in seconds, for max duration. Up to 3600 sec (1hr)
	 * @param {boolean} [params.transcribe=false] Boolean to indicate transcription of the recording.
	 * @param {string} [params.transcribeCallbackUrl] URL to send transcribed event.
	 * @return {BXMLResponse} this, for chaining.
	 */

	this.record = function (params) {
		this.xml = this.xml.ele("Record", params).up();
		return this;
	};

	/**
	 * Redirects the current execution to run XML at another URL.
	 * @param {Object} params The parameters for the Redirect verb.
	 * @param {string} params.requestUrl The URL to send event to and request new BXML.
	 * @param {number} params.requestUrlTimeout Timeout, in ms, to wait for requestUrl to respond.
	 * @return {BXMLResponse} this, for chaining.
	 */

	this.redirect = function (params) {
		this.xml = this.xml.ele("Redirect", params).up();
		return this;
	};
	/**
	 * Sends a text message.
	 * @param {string} message The message to send.
	 * @param {Object} params The parameters for the SendMessage verb
	 * @param {string} params.from The number to send the message from.
	 * @param {string} params.to The number to send the message to.
	 * @param {string} [params.requestUrl] The URL to send events to and request new BXML from.
	 * @param {number} [params.requestUrlTimeout=30] Timeout, in seconds, to wait for requestUrl to respond.
	 * @param {string} [params.statusCallbackUrl] URL to send the message callback to.
	 * @return {BXMLResponse} this, for chaining.
	 */
	this.sendMessage = function (message, params) {
		this.xml = this.xml.ele("SendMessage", params, message).up();
		return this;
	};

	/**
	 * Transfers the call to another number.
	 * @param {Object} params The parameters for the Transfer verb.
	 * @param {string} params.transferTo The number to transfer the call to.
	 * @param {string} [params.transferCallerId] The caller ID to use on the transferred call.
	 * @param {number} [params.callTimeout] The timeout, in seconds, for the call to be answered.
	 * @param {string} [params.requestUrl] URL to send event to and request new BXML from.
	 * @param {number} [params.requestUrlTimeout] Timeout, in msec, to wait for requestUrl to respond.
	 * @param {string} [params.tag] A string that will be included in the callback events.
	 * @param {function} callback The verbs to nest inside the Transfer verb.
	 * @return {BXMLResponse} this, for chaining.
	 */
	this.transfer = function (params, callback) {
		this.xml = this.xml.ele("Transfer", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};
};

module.exports.BXMLResponse = BXMLResponse;
