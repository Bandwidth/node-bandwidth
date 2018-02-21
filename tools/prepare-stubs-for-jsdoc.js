const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');
const _ = require('lodash');
const {resolveRefs} = require('json-refs');
const prepareApiData = require('./prepare');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const mkdir = util.promisify(fs.mkdir);

function getExamplesComments(data) {
	if (data._example) {
		return ['@example', data._example];
	}
	return [];
}

function getReturnsComments(data) {
	let description = data._responses[0].description || 'Promise';
	if (
		data._responses.length === 1 &&
		data._responses[0].status === '201' &&
		!data._responses[0].schema
	) {
		description = 'Id of created instance';
	}
	return [`@returns {Promise} ${description}`];
}

function getParamsComments(prefix, data, required) {
	let name = `${prefix}.${data.name}`;
	let type = (data.type || 'any')
		.replace('integer', 'number')
		.replace('any', '*');
	if (!required) {
		name = `[${name}]`;
	}
	let description = data.description || data.name || '';
	if (type.indexOf('|') >= 0) {
		description += ` Valid values are ${type
			.split('|')
			.map(v => v.trim())
			.join(', ')}`;
		type = 'string';
	}
	switch (type) {
		case 'object':
			return _.flatten(
				Object.keys(data.properties || {}).map(k => {
					const property = data.properties[k];
					property.name = property.name || k;
					return getParamsComments(
						`${prefix}${data.name ? `.${data.name}` : ''}`,
						property,
						(data.required || []).indexOf(property.name) >= 0
					);
				}),
				true
			);
		case 'array':
			return [`@param {${type}[]} ${name} ${description}`];
		default:
			return [`@param {${type}} ${name} ${description}`];
	}
}

function getFunctionComments(name, data, params, optionalParams) {
	const cancelToken =
		'@param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)';
	let list = ['@description', data._description, ''].concat(
		(data.pathParams || []).map(p => `@param {string} ${p} ${p}`)
	);
	if (Object.keys(params.properties).length > 0) {
		list = list.concat(
			[`@param {object} ${optionalParams ? '[options]' : 'options'} Options`],
			getParamsComments('options', params)
		);
	}
	return list.concat(
		[cancelToken],
		getReturnsComments(data),
		[''],
		getExamplesComments(data)
	);
}

function printApiMethod(apiName, name, data) {
	const anyOf = data.body.anyOf;
	if (anyOf) {
		data.body = data.body.anyOf[0];
	}
	const params = {
		type: 'object',
		required: (data.body || {}).required,
		properties: Object.assign(
			{},
			(data.query || {}).properties,
			(data.body || {}).properties
		)
	};
	name = _.camelCase(name);
	if (name === 'upload') {
		params.properties.content = {type: 'any'};
		params.properties.contentType = {type: 'string'};
	}
	const optional = (data.body.required || []).length === 0;
	const binaryResponse =
		data._responses.filter(r => {
			const schema = r.schema || {};
			return schema.type === 'string' && schema.format === 'binary';
		}).length > 0;
	if (binaryResponse && params.properties) {
		params.properties.responseType = {
			type: `'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'`
		};
	}
	return `\t/**
${getFunctionComments(name, data, params, optional)
		.map(l => `\t* ${l}`)
		.join('\n')}
\t*/\n\t${name}(${(data.pathParams || []).map(p => `${p}, `).join('')}${
		Object.keys(params.properties).length > 0 ? 'options, ' : ''
	}cancelToken = null){}`;
}

function printApiTypes(name, data) {
	name = _.upperFirst(name);
	return `/** ${data._description || `${name} API`} */\nclass ${name} {
${Object.keys(data)
		.filter(m => !m.startsWith('_'))
		.map(m => printApiMethod(name, m, data[m]))
		.join('\n')}
}`;
}

async function main() {
	const openApiText = await readFile('openapi.yml', 'utf-8');
	const apiData = prepareApiData(
		(await resolveRefs(yaml.safeLoad(openApiText))).resolved
	);
	await mkdir('./dist').catch(() => {});
	await mkdir('./docs').catch(() => {});
	await writeFile(
		'./dist/index.stub.js',
		`
${Object.keys(apiData)
			.map(o => printApiTypes(o, apiData[o]))
			.join('\n\n')}

/** Bandwidth Api (internal class) */
class BandwidthApi {
${Object.keys(apiData)
			.map(o => {
				const description = apiData[o]._description || `${o} API`;
				return `\t/**
\t@description
\t${description}
\t@type {${o}}
\t*/
\t${o} = new ${o}();`;
			})
			.join('\n\n')}

}

/** Bandwidth API request error */
export class UnexpectedResponseError {
	message = '';
	status = 400;
}

/** Bandwidth API rate limit error */
export class RateLimitError {
	message = '';
	status = 400;
	limitReset = '';
}

/** Bandwidth XML (internal class) */
class BandwidthXml {
	/** Response
	 * @param {string | string[]} verbs One on more Bandwidth XML verbs
	 * @return {string} Bandwidth XML response string
	 * @example
	 * const xml = bandwidthXml.response(bandwidthXml.hangup());
	*/
	response(verbs) {}

	/** Verb 'Gather'
	 * @param {string} requestUrl Absolute URL to send events to and request new BXML
	 * @param {string[]} verbs Nestable Verbs
	 * @param {object} options Optional options
	 * @param {number} [options.requestUrlTimeout] Integer time in milliseconds to wait for requestUrl response (Default value is 30000).
	 * @param {string} [options.terminatingDigits] Digits to stop gather
	 * @param {number} [options.maxDigits] Quantity of digits to collect
	 * @param {number} [options.interDigitTimeout] Integer time indicating the timeout between digits (Default value is 5 seconds).
	 * @param {boolean} [options.bargeable] Always considered 'true'. Boolean to indicate if audio playback should be stopped when digit is pressed (Default value is ‘true’).
	 * @param {string} [options.tag] A string that will be included in the callback events of the gather.
	 * @return {string} verb's xml
	 */
	gather(requestUrl, verbs, options) {}

	/** Verb 'Hangup'
	 * @return {string} verb's xml
	 */
	hangup() {}

	/** Verb 'PlayAudio'
	 * @param {string} url Url to media file
	 * @return {string} verb's xml
	 */
	playAudio(url) {}

	/** Verb 'Redirect'
	 * @param {string} requestUrl Absolute URL to send event and request new BXML.
	 * @param {number} requestUrlTimeout Time (milliseconds) to wait for requestUrl response.
	 * @return {string} verb's xml
	 */
	redirect(requestUrl, requestUrlTimeout) {}

	/** Verb 'SpeakSentence'
	 * @param {string} sentence Sentence to say
	 * @param {object} options Optional options
	 * @param {string} [options.gender] Select the gender of the speaker
	 * @param {string} [options.locale] Select the accent of the speaker
	 * @param {string} [options.voice] Select the voice of the speaker, limited by gender.
	 * @return {string} verb's xml
	 */
	speakSentence(sentence, options) {}

	/** Verb 'Transfer'
	 * @param {string|string[]} transferTo Defines the number the call will be transferred to.
	 * @param {string[]} verbs Nestable Verbs
	 * @param {object} options Optional options
	 * @param {string} [options.transferCallerId]  This is the caller id that will be used when the call is transferred.
	 * @param {number} [options.callTimeout]  This is the timeout (seconds) for the callee to answer the call.
	 * @param {string} [options.requestUrl] Relative or absolute URL to send event and request new BXML when transferred call hangs up.
	 * @param {number} [options.requestUrlTimeout] Timeout (milliseconds) to request new BXML.
	 * @param {string} [options.tag] A string that will be included in the callback events of the transfer.
	 * @return {string} verb's xml
	 */
	transfer(transferTo, verbs, options) {}

	/** Verb 'Record'
	 * @param {object} options Optional options
	 * @param {string} [options.requestUrl] Relative or absolute URL to send event
	 * @param {number} [options.requestUrlTimeout] Timeout (milliseconds) to request new BXML.
	 * @param {string} [options.fileFormat] The format that the recording will be saved
	 * @param {boolean} [options.transcribe] A boolean value to indicate that recording must be transcribed.
	 * @param {string} [options.transcribeCallbackUrl] Absolute URL to send transcribed event.
	 * @param {boolean} [options.multiChannel] Record the caller and called party voices on 2 separate channels in the same file.
	 * @param {number} [options.maxDuration] Number of seconds to record the caller’s voice. Default 60.
	 * @param {number} [options.silenceTimeout] Number of seconds of silence detected before ending the recording.
	 * @param {number} [options.silenceThreshold] This setting controls when the silence timeout is effective. Set this number higher in noisy environments to detect voice and “silence”.
	 * @param {string} [options.terminatingDigits] Digit that the caller presses to indicate that the recording can be stopped. It can be any one of 0-9*#.
	 * @return {string} verb's xml
	 */
	record(options) {}
};

/** Bandwidth Xml
 * @type {BandwidthXml}
*/
export const bandwidthXml = new BandwidthXml();


/** Return Bandwidth API instance
 * @type {function}
 * @param {object} options Options
 * @param {string} options.userId Your Bandwidth user ID (not user name)
 * @param {string} options.apiToken Your API Token
 * @param {string} options.apiSecret Your API Secret
 * @param {string} [options.baseUrl] The Bandwidth API base URL
 * @returns {BandwidthApi} instance of BandwidthAPI
*/
function getBandwidthApi(options) {};

class Bridges {
	/** Speak a sentence to the bridge
	 * @param {string} id Bridge Id
	 * @param {string} sentence Sentence to speak
	 * @param {object} options Optional options
	 * @param {string} [options.gender] A gender of voice to speak a sentence
	 * @param {string} [options.locale] A locale of voice to speak a sentence
	 * @param {string} [options.voice] A voice name to speak a sentence
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	 * @example
	 * await api.Bridges.speakSententence('bridgeId', 'Hello');
	 */
	speakSententence() {}
	/** Play audio file to the bridge
	 * @param {string} id Bridge Id
	 * @param {string} fileUrl Url to media file
	 * @param {object} options Optional options
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
 	 * @example
	 * await api.Bridges.playFileUrl('callId', 'https://url/to/file');
	*/
	playFileUrl(){}

	/** Stop playing of audio file to the bridge
	 * @param {string} id Bridge Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	 * @example
	 * await api.Bridges.stopPlayFileUrl('callId');
	*/
	stopPlayFileUrl(){}
}

class Calls {
	/** Answer incoming call
	 * @param {string} id Call Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	 * @example
	 * await api.Calls.answer('callId');
	*/
	answer() {}
	/** Cancel incoming call
	 * @param {string} id Call Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @example
	 * await api.Calls.terminate('callId');
	 * @returns {Promise} Promise
	*/
	terminate() {}
	/** Complete the active call
	 * @param {string} id Call Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @example
	 * await api.Calls.hangup('callId');
	 * @returns {Promise} Promise
	*/
	hangup() {}
	/** Transfer the call
	 * @param {string} id Call Id
	 * @param {string} transferTo Phone number to transfer the call
	 * @param {object} options Optional options
	 * @param {string} [options.callbackUrl] The server URL where the call events for the new call will be sent upon transferring.
	 * @param {boolean} [options.recordingEnabled] Indicates if the call should be recorded. Values true or false. You can turn recording on/off and have multiple recordings on a single call.
	 * @param {string} [options.recordingFileFormat] The file format of the recorded call. Supported values are wav (default) and mp3.
	 * @param {string} [options.transferCallerId] This is the caller id that will be used when the call is transferred.
	 * @param {object} [options.whisperAudio] Audio to be played to the caller that the call will be transferred to.
	 * @param {string} [options.whisperAudio.gender] A gender of voice to speak a sentence
	 * @param {string} [options.whisperAudio.locale] A locale of voice to speak a sentence
	 * @param {string} [options.whisperAudio.voice] A voice name to speak a sentence
	 * @param {string} [options.whisperAudio.tag] Additional data for callback
	 * @param {string} [options.whisperAudio.fileUrl] Url to media file
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @example
	 * const transferedCallId = await api.Calls.transfer('callId', '+12345678901');
	 * @returns {Promise} Id of created call
	*/
	transfer() {}
	/** Stop collection of gather data
	 * @param {string} id Call Id
	 * @param {string} gatherId Gather Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @example
	 * await api.Calls.stopGather('callId', 'gatherId');
	 * @returns {Promise} Promise
	*/
	stopGather() {}
	/** Speak a sentence to the call
	 * @param {string} id Call Id
	 * @param {string} sentence Sentence to speak
	 * @param {object} options Optional options
	 * @param {string} [options.gender] A gender of voice to speak a sentence
	 * @param {string} [options.locale] A locale of voice to speak a sentence
	 * @param {string} [options.voice] A voice name to speak a sentence
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	 * @example
	 * await api.Calls.speakSententence('callId', 'Hello');
	 */
	speakSententence() {}
	/** Play audio file to the call
	 * @param {string} id Call Id
	 * @param {string} fileUrl Url to media file
	 * @param {object} options Optional options
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	 * @example
	 * await api.Calls.playFileUrl('callId', 'https://url/to/file');
	 */
	playFileUrl() {}
	/** Stop playing of audio file to the call
	 * @param {string} id Bridge Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	 * @example
	 * await api.Calls.stopPlayFileUrl('callId');
	 */
	stopPlayFileUrl() {}
}

class Conferences {
	/** Stop the conference
	 * @param {string} id Conference Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	stop() {}
	/** Mute or unmute the conference
	 * @param {string} id Conference Id
	 * @param {boolean} [mute] true if mute and false if unmute, default: true
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	mute() {}
	/** Hold or unhold the conference
	 * @param {string} id Conference Id
	 * @param {boolean} [hold] true if hold and false if unhold, default: true
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	hold() {}
	/** Remove a member from the conference
	 * @param {string} id Conference Id
	 * @param {string} memberId Confernece member id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	deleteMember() {}
	/** Mute or unmute the conference member
	 * @param {string} id Conference Id
	 * @param {string} memberId Confernece member id
	 * @param {boolean} [mute] true if mute and false if unmute, default: true
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	muteMember() {}
	/** Hold or unhold the conference member
	 * @param {string} id Conference Id
	 * @param {string} memberId Confernece member id
	 * @param {boolean} [hold] true if hold and false if unhold, default: true
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	holdMember() {}
	/** Speak a sentence to the conference
	 * @param {string} id Conference Id
	 * @param {string} sentence Sentence to speak
	 * @param {object} options Optional options
	 * @param {string} [options.gender] A gender of voice to speak a sentence
	 * @param {string} [options.locale] A locale of voice to speak a sentence
	 * @param {string} [options.voice] A voice name to speak a sentence
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	speakSententence() {}
	/** Play audio file to the conference
	 * @param {string} id Conference Id
	 * @param {string} fileUrl Url to media file
	 * @param {object} options Optional options
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	playFileUrl() {}
	/** Stop playing of audio file to the conference
	 * @param {string} id Conference Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	stopPlayFileUrl() {}
	/** Speak a sentence to the conference member
	 * @param {string} id Conference Id
	 * @param {string} memberId Conference member Id
	 * @param {string} sentence Sentence to speak
	 * @param {object} options Optional options
	 * @param {string} [options.gender] A gender of voice to speak a sentence
	 * @param {string} [options.locale] A locale of voice to speak a sentence
	 * @param {string} [options.voice] A voice name to speak a sentence
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	speakSententenceToMember() {}
	/** Play audio file to the conference member
	 * @param {string} id Conference Id
	 * @param {string} memberId Conference member Id
	 * @param {string} fileUrl Url to media file
	 * @param {object} options Optional options
	 * @param {string} [options.tag] Additional data for callback
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	playFileUrlToMember() {}
	/** Stop playing of audio file to the conference member
	 * @param {string} id Conference Id
	 * @param {string} memberId Conference member Id
	 * @param {axios.CancelToken} [cancelToken] Optional cancel token (read more here https://github.com/axios/axios#cancellation)
	 * @returns {Promise} Promise
	*/
	stopPlayFileUrlToMember() {}
}


`,
		'utf-8'
	);
}

main().catch(console.trace);
