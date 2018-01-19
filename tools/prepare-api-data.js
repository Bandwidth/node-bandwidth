const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');
const {resolveRefs} = require('json-refs');
const pack = require('../package.json');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

async function main() {
	const openApiText = await readFile('openapi.yml', 'utf-8');
	const openapi = (await resolveRefs(yaml.safeLoad(openApiText))).resolved;
	const apiData = {
		name: pack.name,
		version: pack.version || openapi.info.version
	};
	await writeFile(
		'./lib/api-data.js',
		`// Generated automatically. Don't edit this file.
export default ${JSON.stringify(apiData, null, 2)};`,
		'utf-8'
	);
}

main().catch(console.trace);
