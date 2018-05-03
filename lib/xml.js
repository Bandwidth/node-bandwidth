var builder = require("xmlbuilder");

function obsolete(method) {
	console.warn(method + "() is obsolete and will be remove in next release");
}

/**
 * Creates a new BXML Response object.
 * Call .toString() on this method to obtain the BXML string.
 * @constructor
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
	 * @example
	 * //This app will speak two sentences.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("Someone will be with you shortly.");
	 * myApp = myApp.toString();
	 */

	this.speakSentence = function (sentence, params) {
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
	 * @example
	 * //This app will collect a PIN code.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.gather({
	 *     requestUrl : 'http://unico.rn/pinApiEndpoint',
	 *     maxDigits  : 4
	 * }, function () {
	 *     this.speakSentence("Please enter your PIN code.")
	 * });
	 * myApp = myApp.toString();
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
	 * OBSOLETE: Create a new call to another phone number.
	 * @param {Object} params The parameters for the Call verb.
	 * @param {string} params.from Defines the number the call will be created from.
	 * @param {string} params.to Defines the number the call will be made to.
	 * @param {string} [params.requestUrl] URL to send event
	 * @param {number} [params.timeout] The timeout, in seconds, for the call to answer
	 * @param {number} [params.requestUrlTimeout] Timeout, in ms, to request new BXML document
	 * @param {function} [callback] A function containing the verbs to be nested inside the Call verb
	 * @return {BXMLResponse} this, for chaining
	 * @example
	 * //This app will create a call and tell the callee they are being called.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.call({
	 *      from : '+19195551212',
	 *      to   : '+19195551213'
	 * }, function () {
	 *      this.speakSentence("You are recieving a call from 919 555 1212.");
	 * });
	 * myApp = myApp.toString();
	 */
	this.call = function (params, callback) {
		obsolete("call");
		this.xml = this.xml.ele("Call", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};

	/**
	 * OBSOLETE: Create a new conference call.
	 * @param {Object} params The parameters for the Conference verb.
	 * @param {string} params.from The phone number that will host the conference.
	 * @param {string} [params.statusCallbackUrl] URL to which conference callbacks will be POSTed
	 * @param {boolean} [params.joinTone=true] Determines whether or not a tone is played on join.
	 * @param {boolean} [params.leavingTone=true] Determines whether or not a tone is played on leave.
	 * @param {string} [params.tag] A string that will be included in the callback events of the conference.
	 * @param {boolean} [params.mute=false] Determines whether or not the member will join muted.
	 * @param {boolean} [params.hold=false] Determines whether or not the member will join on hold.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * //This app will create a conference call. Callers to (919) 555 1212 will be patched in.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.conference({
	 *     from : '+19195551212'
	 * });
	 * myApp = myApp.toString();
	 */

	this.conference = function (params) {
		obsolete("call");
		params.joinTone = params.joinTone || true;
		params.leavingTone = params.leavingTone || true;
		this.xml = this.xml.ele("Conference", params).up();
		return this;
	};

	/**
	 * Terminates an outgoing call.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * //This app will speak two sentences and hang up.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("We have been acquired by BigCorp.")
	 *      .hangup();
	 * myApp = myApp.toString();
	 */

	this.hangup = function () {
		this.xml = this.xml.ele("Hangup").up();
		return this;
	};

	/**
	 * Plays an audio file located at a specified URL.
	 * @param {string} audio The URL of the audio to be played.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("All agents are currently busy playing ping-pong. Please hold.")
	 *      .playAudio("http://unico.rn/assets/postglamspeedfolk.mp3");
	 * myApp = myApp.toString();
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
	 * @param {string} [params.terminatingDigits] OBSOLETE: One or more digits that will finish the recording.
	 * @param {number} [params.maxDuration=300] OBSOLETE: Time, in seconds, for max duration. Up to 3600 sec (1hr)
	 * @param {boolean} [params.transcribe=false] Boolean to indicate transcription of the recording.
	 * @param {string} [params.transcribeCallbackUrl] URL to send transcribed event.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * //This app will record a message.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
	 *      .speakSentence("Your call may be recorded for quality assurance.")
	 *      .record({
	 *            requestUrl : "http://unico.rn/recordsGetPutHere",
	 *            fileFormat : "mp3"
	 *		});
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
	 * OBSOLETE: Sends a text message.
	 * @param {string} message The message to send.
	 * @param {Object} params The parameters for the SendMessage verb
	 * @param {string} params.from The number to send the message from.
	 * @param {string} params.to The number to send the message to.
	 * @param {string} [params.requestUrl] The URL to send events to and request new BXML from.
	 * @param {number} [params.requestUrlTimeout=30] Timeout, in seconds, to wait for requestUrl to respond.
	 * @param {string} [params.statusCallbackUrl] URL to send the message callback to.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * // This app will text a customer.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.sendMessage("Get $20 off your next purchase!", {
	 * 		from : "+19195551212",
	 *		to   : "+19195551213"
	 * });
	 */
	this.sendMessage = function (message, params) {
		obsolete("sendMessage");
		this.xml = this.xml.ele("SendMessage", params, message).up();
		return this;
	};

	/**
	 * Used to direct call flow for multiple transfer
	 * @param  {String} phoneNumber The phone number to try for a transfer
	 * @return {BXMLResponse} this, for chaining.
	 */
	this.phoneNumber = function (phoneNumber) {
		this.xml = this.xml.ele("PhoneNumber", phoneNumber).up();
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
	 * @example
	 * // This app will transfer a call.
	 * var Bandwidth = require("node-bandwidth");
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Your call is somewhat important to us.")
	 *		.speakSentence("Please wait while it is being transferred.")
	 *		.transfer({
	 * 			transferTo: "+19195551213"
	 *		}, function (){
	 * 			this.speakSentence("A call is being transferred to you from Customer Service.");
	 *		});
	 * @example
	 * // Multiple transfer with speak senetence - Try 3 numbers
	 * var myApp = new Bandwidth.BXMLResponse();
	 * myApp.speakSentence("Your call is somewhat important to us.")
	 * 	.speakSentence("Please wait while it is being transferred.")
	 * 	.transfer({}, function (){
	 * 		this.phoneNumber("+13334445555");
	 * 		this.phoneNumber("+13334445556");
	 * 		this.phoneNumber("+13334445557");
	 * 		this.speakSentence("A call is being transferred to you from Customer Service.");
	 * 	});
console.log(myApp.toString());
	 */
	this.transfer = function (params, callback) {
		this.xml = this.xml.ele("Transfer", params);
		callback = callback || function () {};
		callback.call(this);
		this.xml = this.xml.up();
		return this;
	};

	/**
	 *  Pause the execution of an ongoing BXML document
	 * @param {Object} params The parameters for the Pause verb.
	 * @param {string} params.length How many seconds Bandwidth will wait silently before continuing on.
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * // This app will transfer a call.
	 * var Bandwidth = require("node-bandwidth");
	 * var r = new Bandwidth.BXMLResponse();
	 * r.pause({length: 5})
	 * console.log(r.toString());
	 */
	this.pause = function (params) {
		this.xml = this.xml.ele("Pause", params).up();
		return this;
	};

	/**
	 *  Send digits on a live call
	 * @param {string} value string containing the DTMF characters to be sent in a call (maximum of 92 characters)
	 * @return {BXMLResponse} this, for chaining.
	 * @example
	 * // This app will transfer a call.
	 * var Bandwidth = require("node-bandwidth");
	 * var r = new Bandwidth.BXMLResponse();
	 * r.dtmf('1');
	 * console.log(r.toString());
	 */
	this.sendDtmf = function (value) {
		this.xml = this.xml.ele("SendDtmf", {}, value).up();
		return this;
	};
};

module.exports = BXMLResponse;
