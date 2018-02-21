const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');
const _ = require('lodash');
const {resolveRefs} = require('json-refs');
const prepareApiData = require('./prepare');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const mkdir = util.promisify(fs.mkdir);

const types = [];

function findEmbededTypes(prefix, schema) {
	if (schema.type === 'object') {
		Object.keys(schema.properties || {}).forEach(k =>
			findEmbededTypes(`${prefix}${_.upperFirst(k)}`, schema.properties[k])
		);
		types.push({type: prefix, schema});
	}
}

function printProperties(prefix, properties) {
	if (!properties) {
		return '';
	}
	return Object.keys(properties)
		.map(k => {
			const schema = properties[k];
			let text = `\t/** ${schema.description || k} */\n`;
			switch (schema.type) {
				case 'object':
					text += `\t${k}: ${prefix}${_.upperFirst(k)}`;
					break;
				case 'integer':
				case 'number':
					text += `\t${k}: number`;
					break;
				case 'boolean':
					text += `\t${k}: boolean`;
					break;
				case 'string':
					if ((schema.enum || []).length > 0) {
						text += `\t${k}: ${schema.enum.map(e => `'${e}'`).join(' | ')}`;
					} else {
						text += `\t${k}: string`;
						if ((schema.format || '').startsWith('date')) {
							text += ' | Date';
						}
					}
					break;
				case 'array':
					text += `\t${k}: Array<${schema.items.type}>`;
					break;
				default:
					text += `\t${k}: ${schema.type || 'any'}`;
					break;
			}
			text += ';';
			return text;
		})
		.join('\n');
}

function printTypes() {
	types
		.filter(({schema}) => schema.type === 'object')
		.forEach(({type, schema}) => {
			Object.keys(schema.properties).forEach(k => {
				findEmbededTypes(`${type}${_.upperFirst(k)}`, schema.properties[k]);
			});
		});
	return types
		.map(
			({type, schema}) => `export interface ${type} {
${printProperties(type, schema.properties)}
}`
		)
		.join('\n');
}

function printApiName(name, data) {
	name = _.upperFirst(name);
	return `\t/** ${data._description || `${name} API`} */\n\t${name}: ${name}`;
}

function getOutputTypes(prefix, data, {properties}) {
	const outputTypes = [];
	data._responses.filter(r => r.schema).forEach(r => {
		let schema = r.schema;
		let isArray = false;
		if (schema.type === 'array') {
			schema = schema.items;
			isArray = true;
		}
		const typeName = `${prefix}${r.status === '200' ? '' : r.status}${
			isArray ? 'Item' : ''
		}`;
		outputTypes.push(`${typeName}${isArray ? '[]' : ''}`);
		if (schema.type === 'string' && schema.format === 'binary') {
			schema = {
				type: 'object',
				properties: {
					content: {type: 'any'},
					contentType: {type: 'string'}
				}
			};
		}
		types.push({type: typeName, schema});
	});
	if (
		data._responses.filter(
			r => r.status === '201' && r.headers && r.headers.Location
		)[0]
	) {
		if (outputTypes.length > 0) {
			return `string | ${outputTypes.join(' | ')}`;
		}
		return 'string'; // Id of created object
	}
	if (outputTypes.length > 0) {
		if (
			properties.page &&
			properties.size &&
			data._responses.filter(r => r.status === '200' && r.schema)[0]
		) {
			outputTypes.push(`AsyncIterator<${prefix}Item>`);
		}
		return outputTypes.join(' | ');
	}
	return 'any';
}

function printApiMethod(apiName, name, data) {
	const anyOf = data.body.anyOf;
	if (anyOf) {
		data.body = data.body.anyOf[0];
	}
	const params = {
		type: 'object',
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
	const typeName = `${_.upperFirst(apiName)}${_.upperFirst(name)}Options`;
	const hasParams = Object.keys(params.properties).length > 0;
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
	let paramsDeclaration = `${(data.pathParams || [])
		.map(p => `${p}: string, `)
		.join('')}`;
	if (hasParams) {
		types.push({type: typeName, schema: params});
		paramsDeclaration += `options${optional ? '?' : ''}: ${typeName}${
			anyOf ? ` | ${typeName}[]` : ''
		}, `;
	}
	return `\t/** ${
		data._description
	} */\n\t${name}(${paramsDeclaration}cancelToken?: CancelToken): Promise<${getOutputTypes(
		`${_.upperFirst(apiName)}${_.upperFirst(name)}`,
		data,
		params
	)}>;`;
}

function printApiTypes(name, data) {
	name = _.upperFirst(name);
	return `/** ${data._description} */\nexport interface ${name} {
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
	await writeFile(
		'./dist/index.d.ts',
		`/// <reference types="@types/async" />
/// <reference types="axios" />
import {CancelToken} from 'axios';
${Object.keys(apiData)
			.map(o => printApiTypes(o, apiData[o]))
			.join('\n\n')}

${printTypes()}

export interface Bridges {
	/** Speak a sentence to the bridge */
	speakSententence(id: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	/** Play audio file to the bridge */
	playFileUrl(id: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	/** Stop playing of audio file to the bridge */
	stopPlayFileUrl(id: string, cancelToken?: CancelToken): Promise<any>;
}

export interface Calls {
	/** Answer incoming call */
	answer(id: string, cancelToken?: CancelToken): Promise<any>;
	/** Cancel incoming call */
	terminate(id: string, cancelToken?: CancelToken): Promise<any>;
	/** Complete the active call */
	hangup(id: string, cancelToken?: CancelToken): Promise<any>;
	/** Transfer the call */
	transfer(id: string, transferTo: string, options?: TransferOptions, cancelToken?: CancelToken): Promise<string>;
	/** Stop collection of gather data */
	stopGather(id: string, gatherId: string, cancelToken?: CancelToken): Promise<any>;
	/** Speak a sentence to the call */
	speakSententence(id: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	/** Play audio file to the call */
	playFileUrl(id: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	/** Stop playing of audio file to the call */
	stopPlayFileUrl(id: string, cancelToken?: CancelToken): Promise<any>;
}

export interface Conferences {
	/** Stop the conference */
	stop(id: string, cancelToken?: CancelToken): Promise<any>;
	/** Mute or unmute the conference */
	mute(id: string, mute?: boolean, cancelToken?: CancelToken): Promise<any>;
	/** Hold or unhold the conference */
	hold(id: string, hold?: boolean, cancelToken?: CancelToken): Promise<any>;
	/** Remove a member from the conference */
	deleteMember(id: string, memberId: string, cancelToken?: CancelToken): Promise<any>;
	/** Mute or unmute the conference member */
	muteMember(id: string, memberId: string, mute?: boolean, cancelToken?: CancelToken): Promise<any>;
	/** Hold or unhold the conference member */
	holdMember(id: string, memberId: string, hold?: boolean, cancelToken?: CancelToken): Promise<any>;
	/** Speak a sentence to the conference */
	speakSententence(id: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	/** Play audio file to the conference */
	playFileUrl(id: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	/** Stop playing of audio file to the conference */
	stopPlayFileUrl(id: string, cancelToken?: CancelToken): Promise<any>;
	/** Speak a sentence to the conference member*/
	speakSententenceToMember(id: string, memberId: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	/** Play audio file to the conference member*/
	playFileUrlToMember(id: string, memberId: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	/** Stop playing of audio file to the conference member*/
	stopPlayFileUrlToMember(id: string, memberId: string, cancelToken?: CancelToken): Promise<any>;
}

export interface PlayAudioOptions {
	/** URL to audio file to play */
	fileUrl: string;
	/** A sentence to speak */
	sentence: string;
	/** A gender of voice to speak a sentence */
	gender: 'female' | 'male';
	/** A locale of voice to speak a sentence */
	locale: string;
	/** A voice name to speak a sentence */
	voice: string;
	/** Additional data for callback */
	tag: string;
}

export interface SpeakSententenceOptions {
	/** A gender of voice to speak a sentence */
	gender: 'female' | 'male';
	/** A locale of voice to speak a sentence */
	locale: string;
	/** A voice name to speak a sentence */
	voice: string;
	/** Additional data for callback */
	tag: string;
}

export interface PlayFileUrlOptions {
	/** Additional data for callback */
	tag: string;
}

export interface TransferOptions {
	/** The server URL where the call events for the new call will be sent upon transferring. */
	callbackUrl: string;
	/** Indicates if the call should be recorded. Values true or false. You can turn recording on/off and have multiple recordings on a single call. */
	recordingEnabled: boolean;
	/** The file format of the recorded call. Supported values are wav (default) and mp3. */
	recordingFileFormat: 'wav' | 'mp3';
	/** This is the caller id that will be used when the call is transferred. */
	transferCallerId: string;
	/** Audio to be played to the caller that the call will be transferred to.  */
	whisperAudio: PlayAudioOptions;
}

export interface BandwidthApi {
${Object.keys(apiData)
			.map(o => printApiName(o, apiData[o]))
			.join(',\n')}
}

export interface BandwidthApiOptions {
	/** Bandwidth API user ID (not user name) */
	userId: string;
	/** Bandwidth API token */
	apiToken: string;
	/** Bandwidth API secret */
	apiSecret: string;
}

export interface UnexpectedResponseError {
	message: string;
	status: number;
}

export interface RateLimitError {
	message: string;
	status: number;
	limitReset: string;
}

export interface UnexpectedResponseErrorStatic {
	new (message: string, status: number): UnexpectedResponseError;
}

export interface BxmlGatherOptions {
	requestUrl: string;
	requestUrlTimeout: string | number;
	terminatingDigits: string;
	maxDigits: string | number;
	interDigitTimeout: string | number;
	tag: string;
}

export interface BxmlSpeakSentenceOptions {
	gender: 'female' | 'male';
	locale: string,
	voice: string
}

export interface BxmlTransferOptions {
	transferTo: string;
	transferCallerId: string;
	callTimeout: string | number;
	requestUrl: string;
	requestUrlTimeout: string | number;
	tag: string;
}

export interface BxmlRecordOptions {
	requestUrl: string;
	requestUrlTimeout: string | number;
	fileFormat: string;
	transcribe: string | boolean;
	transcribeCallbackUrl: string;
	multiChannel: string | boolean;
	maxDuration: string | number;
	silenceTimeout: string | number;
	silenceThreshold: string | number;
	terminatingDigits: string;
}

type Verb = string
export interface BandwidthXml {
	response(verbs: Verb | Verb[]): string;
	gather(requestUrl: string, verbs?: Verb | Verb[], options?: BxmlGatherOptions): Verb;
	hangup(): Verb;
	playAudio(url: string): Verb;
	redirect(requestUrl: string, requestUrlTimeout: number): Verb;
	speakSentence(sentence: string, options?: BxmlSpeakSentenceOptions): Verb;
	transfer(transferTo: string, verbs?: Verb | Verb[], options?: BxmlTransferOptions): Verb;
	record(options?: BxmlRecordOptions): Verb;
}

declare const bandwidthXml: BandwidthXml;

export interface GetBandwidthApiStatic {
	(options: BandwidthApiOptions): BandwidthApi;
	UnexpectedResponseError: UnexpectedResponseErrorStatic;
	RateLimitError: RateLimitErrorStatic;
	bandwidthXml: BandwidthXml;
}

declare const getBandwidthApi: GetBandwidthApiStatic;

export {bandwidthXml};

export default getBandwidthApi;

`,
		'utf-8'
	);
}

main().catch(console.trace);
