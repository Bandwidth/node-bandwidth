const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');
const _ = require('lodash');
const {resolveRefs} = require('json-refs');
const prepareApiData = require('./prepare');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

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
			let text = ``;
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
					text += `\t${k}: ${schema.typ || 'any'}`;
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

function printApiName(name) {
	name = _.upperFirst(name);
	return `\t${name}: ${name}`;
}

function extractParamsFromPath(path) {
	const params = {};
	(path.match(/\{\w+\}/gi) || [])
		.map(p => p.substr(1, p.length - 2))
		.filter(p => p !== 'userId')
		.forEach(p => {
			params[p] = {type: 'string'};
		});
	return params;
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
	const paramsFromPath = extractParamsFromPath(data.path);
	const params = {
		type: 'object',
		properties: Object.assign(
			{},
			(data.query || {}).properties,
			(data.body || {}).properties,
			paramsFromPath
		)
	};
	name = _.camelCase(name);
	if (name === 'upload') {
		params.properties.content = {type: 'any'};
		params.properties.contentType = {type: 'string'};
	}
	const typeName = `${_.upperFirst(apiName)}${_.upperFirst(name)}Options`;
	const hasParams = Object.keys(params.properties).length > 0;
	const optional =
		(data.body.required || []).length === 0 &&
		Object.keys(paramsFromPath).length === 0;
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
	let paramsDesclaration = '';
	if (hasParams) {
		types.push({type: typeName, schema: params});
		paramsDesclaration = `options${optional ? '?' : ''}: ${typeName}, `;
	}
	return `\t${name}(${paramsDesclaration}cancelToken?: CancelToken): Promise<${getOutputTypes(
		`${_.upperFirst(apiName)}${_.upperFirst(name)}`,
		data,
		params
	)}>;`;
}

function printApiTypes(name, data) {
	name = _.upperFirst(name);
	return `export interface ${name} {
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
	speakSententence(id: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	playFileUrl(id: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	stopPlayFileUrl(id: string, cancelToken?: CancelToken): Promise<any>;
}

export interface Calls {
	answer(id: string, cancelToken?: CancelToken): Promise<any>;
	terminate(id: string, cancelToken?: CancelToken): Promise<any>;
	hangup(id: string, cancelToken?: CancelToken): Promise<any>;
	transfer(id: string, transferTo: string, options?: TransferOptions, cancelToken?: CancelToken): Promise<string>;
	stopGather(id: string, gatherId: string, cancelToken?: CancelToken): Promise<any>;
	speakSententence(id: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	playFileUrl(id: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	stopPlayFileUrl(id: string, cancelToken?: CancelToken): Promise<any>;
}

export interface Conferences {
	stop(id: string, cancelToken?: CancelToken): Promise<any>;
	mute(id: string, mute?: boolean, cancelToken?: CancelToken): Promise<any>;
	hold(id: string, hold?: boolean, cancelToken?: CancelToken): Promise<any>;
	deleteMember(id: string, memberId: string, cancelToken?: CancelToken): Promise<any>;
	muteMember(id: string, memberId: string, mute?: boolean, cancelToken?: CancelToken): Promise<any>;
	holdMember(id: string, memberId: string, hold?: boolean, cancelToken?: CancelToken): Promise<any>;
	speakSententence(id: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	playFileUrl(id: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	stopPlayFileUrl(id: string, cancelToken?: CancelToken): Promise<any>;
	speakSententenceToMember(id: string, memberId: string, sentence: string, options?: SpeakSententenceOptions, cancelToken?: CancelToken): Promise<any>;
	playFileUrlToMember(id: string, memberId: string, fileUrl: string, options?: PlayFileUrlOptions, cancelToken?: CancelToken): Promise<any>;
	stopPlayFileUrlToMember(id: string, memberId: string, cancelToken?: CancelToken): Promise<any>;
}

export interface PlayAudioOptions {
	fileUrl: string;
	sentence: string;
	gender: 'female' | 'male';
	locale: string;
	voice: string;
	tag: string;
	id?: string;
}

export interface SpeakSententenceOptions {
	gender: 'female' | 'male';
	locale: string;
	voice: string;
	tag: string;
}

export interface PlayFileUrlOptions {
	tag: string;
}

export interface TransferOptions {
	callTimeout: number;
	callbackTimeout: number;
	callbackUrl: string;
	callbackHttpMethod: 'GET' | 'POST';
	fallbackUrl: string;
	recordingEnabled: boolean;
	recordingFileFormat: 'wav' | 'mp3';
	recordingMaxDuration: number;
	transcriptionEnabled: boolean;
	transferCallerId: string;
	whisperAudio: PlayAudioOptions;
}

export interface BandwidthApi {
${Object.keys(apiData)
			.map(o => printApiName(o, apiData[o]))
			.join(',\n')}
}

export interface BandwidthApiOptions {
	userId: string;
	apiToken: string;
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

export interface RateLimitErrorStatic {
	new (message: string, status: number, limitReset: string): RateLimitError;
}

export interface GetBandwidthApiStatic {
	(options: BandwidthApiOptions): BandwidthApi;
	UnexpectedResponseError: UnexpectedResponseErrorStatic;
	RateLimitError: RateLimitErrorStatic;
}

declare const getBandwidthApi: GetBandwidthApiStatic;

export default getBandwidthApi;
`,
		'utf-8'
	);
}

main().catch(console.trace);
