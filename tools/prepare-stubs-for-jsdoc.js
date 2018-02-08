const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');
const _ = require('lodash');
const {resolveRefs} = require('json-refs');
const prepareApiData = require('./prepare');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const mkdir = util.promisify(fs.mkdir);

function getExamplesComments() {
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
	let type = (data.type || 'any').replace('integer', 'number');
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
	return ['@description', data._description, '']
		.concat(
			[`@param {object} ${optionalParams ? '[options]' : 'options'} Options`],
			getParamsComments('options', params),
			[cancelToken]
		)
		.concat(getReturnsComments(data), [''])
		.concat(getExamplesComments(data));
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

function printApiMethod(apiName, name, data) {
	const paramsFromPath = extractParamsFromPath(data.path);
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
			(data.body || {}).properties,
			paramsFromPath
		)
	};
	name = _.camelCase(name);
	if (name === 'upload') {
		params.properties.content = {type: 'any'};
		params.properties.contentType = {type: 'string'};
	}
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
	return `\t/**
${getFunctionComments(name, data, params, optional)
		.map(l => `\t* ${l}`)
		.join('\n')}
\t*/\n\t${name}(options, cancelToken = null){}`;
}

function printApiTypes(name, data) {
	name = _.upperFirst(name);
	return `class ${name} {
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
		'./dist/index.stub.js',
		`
${Object.keys(apiData)
			.map(o => printApiTypes(o, apiData[o]))
			.join('\n\n')}

export default function getBandwidthApi() {}
`,
		'utf-8'
	);
}

main().catch(console.trace);
