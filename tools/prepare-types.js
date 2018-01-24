const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');
const _ = require('lodash');
const {resolveRefs} = require('json-refs');
const prepareApiData = require('./prepare');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const types = [];

function printTypes() {
	return types
		.map(
			({type}) => `interface ${type} {

}`
		)
		.join('\n\n');
}

function printApiName(name, data) {
	name = _.upperFirst(name);
	return `\t// ${data._description}\n\t${name}: ${name}`;
}

function extractParamsFromPath(path) {
	const params = {};
	path
		.match(/\{\w+\}/gi)
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
		const typeName = `${prefix}${r.status}`;
		outputTypes.push(`${typeName}${isArray ? '[]' : ''}`);
		types.push({type: typeName, schema});
	});
	if (outputTypes.length > 0) {
		if (
			properties.page &&
			properties.size &&
			data._responses.filter(r => r.status === '200' && r.schema)[0]
		) {
			outputTypes.push(`AsyncIterator<${prefix}200>`);
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
	const typeName = `${_.upperFirst(apiName)}${_.upperFirst(name)}Options`;
	const hasParams = Object.keys(params.properties).length > 0;
	const optional =
		(data.body.required || []).length === 0 &&
		Object.keys(paramsFromPath).length === 0;
	let paramsDesclaration = '';
	if (hasParams) {
		types.push({type: typeName, schema: params});
		paramsDesclaration = `options${optional ? '?' : ''}: ${typeName}, `;
	}
	return `\t// ${
		data._description
	}\n\t${name}(${paramsDesclaration}cancelToken?: CancelToken): Promise<${getOutputTypes(
		`${_.upperFirst(apiName)}${_.upperFirst(name)}`,
		data,
		params
	)}>;`;
}

function printApiTypes(name, data) {
	name = _.upperFirst(name);
	return `interface ${name} {
${Object.keys(data)
		.filter(m => !m.startsWith('_'))
		.map(m => printApiMethod(name, m, data[m]))
		.join('\n\n')}
}`;
}

async function main() {
	const openApiText = await readFile('openapi.yml', 'utf-8');
	const apiData = prepareApiData(
		(await resolveRefs(yaml.safeLoad(openApiText))).resolved
	);
	await writeFile(
		'./dist/index.d.ts',
		`${Object.keys(apiData)
			.map(o => printApiTypes(o, apiData[o]))
			.join('\n\n')}

${printTypes()}

export interface BandwidthApi {
${Object.keys(apiData)
			.map(o => printApiName(o, apiData[o]))
			.join(',\n\n')}
}

export interface BandwidthApiOptions {
	// User Id
	userId: string;

	// Api Token
	apiToken: string;

	// Api Secret
	apiSecret: string;
}

export declare class UnexpectedResponseError {
	constructor(message: string, status: number);
	message: string;
	status: number;
}

export declare class RateLimitError extends UnexpectedResponseError {
	constructor(message: string, status: number, limitReset: string);
	message: string;
	status: number;
	limitReset: string;
}

export default interface GetBandwidthApi {
	(options: BandwidthApiOptions): BandwidthApi;
}
`,
		'utf-8'
	);
}

main().catch(console.trace);
