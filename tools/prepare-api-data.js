const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');
const _ = require('lodash');
const {resolveRefs} = require('json-refs');
const pack = require('../package.json');
const prepareApiData = require('./prepare');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

function printValidator(schema, required) {
	let code = '';
	if (schema.anyOf) {
		return `Joi.alternatives().try(${schema.anyOf
			.map(s => printValidator(s))
			.join(', ')})`;
	}
	switch (schema.type) {
		case 'object':
			code = `Joi.object().keys({${Object.keys(schema.properties || {})
				.map(
					p =>
						`${_.camelCase(p)}: ${printValidator(
							schema.properties[p],
							(schema.required || []).indexOf(p) >= 0
						)}`
				)
				.join(', ')}})`;
			break;
		case 'array':
			code = `Joi.array().items(${printValidator(schema.items)})`;
			break;
		case 'integer':
			code = 'Joi.number().integer()';
			break;
		case 'number':
			code = 'Joi.number()';
			break;
		case 'string':
			switch (schema.format) {
				case 'date':
				case 'date-time':
					code = 'Joi.date()';
					break;
				case 'binary':
					code = 'Joi.binary()';
					break;
				default:
					code = 'Joi.string()';
					break;
			}
			break;
		case 'boolean':
			code = 'Joi.boolean()';
			break;
		default:
			code = 'Joi.any()';
			break;
	}
	if (code) {
		if (required) {
			code = `${code}.required()`;
		}
		if (schema.maximum) {
			code = `${code}.max(${schema.maximum})`;
		}
		if (schema.minimum) {
			code = `${code}.min(${schema.minimum})`;
		}
		if (schema.enum) {
			code = `${code}.valid(${JSON.stringify(schema.enum)})`;
		}
	}
	return code;
}

function printBodyKeys(schema) {
	const keys = Object.keys(schema.properties || {});
	return `new Set([${keys.map(k => `'${_.camelCase(k)}'`).join(', ')}])`;
}

function printApiMethod(name, data) {
	if (name.startsWith('_')) {
		return '';
	}
	const binaryResponse =
		data._responses.filter(r => {
			const schema = r.schema || {};
			return schema.type === 'string' && schema.format === 'binary';
		}).length > 0;
	return `\t\t\t${_.camelCase(name)}: {
		\t\tmethod: '${data.method}',
		\t\tpath: '${data.path}',${
		data.contentType ? `\n\t\t\t\tcontentType: '${data.contentType}',` : ''
	}${binaryResponse ? `\n\t\t\t\tbinaryResponse: ${binaryResponse},` : ''}
		\t\tquery: ${printValidator(data.query)},
		\t\tbody: ${printValidator(data.body)},
		\t\tbodyKeys: ${printBodyKeys(data.body)}
	\t\t}`;
}

function printApiObject(name, data) {
	return `\t\t${_.upperFirst(name)}: {
${Object.keys(data)
		.map(m => printApiMethod(m, data[m]))
		.join(',\n')}
	\t}`;
}

async function main() {
	const openApiText = await readFile('openapi.yml', 'utf-8');
	const openapi = (await resolveRefs(yaml.safeLoad(openApiText))).resolved;
	const apiData = prepareApiData(openapi);
	await writeFile(
		'./lib/api-data.js',
		`// Generated automatically. Don't edit this file.
import * as Joi from 'joi';

export default {
	name: '${pack.name}',
	version: '${pack.version || openapi.info.version}',
	objects: {
${Object.keys(apiData)
			.map(o => printApiObject(o, apiData[o]))
			.join(',\n')}
	}
};`,
		'utf-8'
	);
}

main().catch(console.trace);
