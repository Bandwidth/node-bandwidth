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
	let list = ['@description', data._description, ''];
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
\t*/\n\t${name}(${
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
	await writeFile(
		'./dist/index.stub.js',
		`
${Object.keys(apiData)
			.map(o => printApiTypes(o, apiData[o]))
			.join('\n\n')}

/** Bandwidth Api */
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


/**
 * @desciption
 * Return Bandwidth API instance
 * @param {object} options Options
 * @param {string} options.userId Your Bandwidth user ID (not user name)
 * @param {string} options.apiToken Your API Token
 * @param {string} options.apiSecret Your API Secret
 * @param {string} [options.baseUrl] The Bandwidth API base URL
 * @returns {BandwidthApi} instance of BandwidthAPI
*/
export default function getBandwidthApi(options) {}

getBandwidthApi.UnexpectedResponseError = UnexpectedResponseError;
getBandwidthApi.RateLimitError = RateLimitError;
`,
		'utf-8'
	);
}

main().catch(console.trace);
