const fs = require('fs');
const util = require('util');
const openapi = require('../openapi.json');
const pack = require('../package.json');

const writeFile = util.promisify(fs.writeFile);

async function main() {
	const apiData = {
		name: pack.name,
		version: pack.version || openapi.version
	};
	await writeFile(
		'./lib/api-data.js',
		`export default ${JSON.stringify(apiData, null, 2)};`,
		'utf-8'
	);
}

main().catch(console.trace);
