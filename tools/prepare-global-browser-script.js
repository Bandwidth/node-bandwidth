const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function main() {
	const lines = (await readFile('./dist/node-bandwidth.amd.js', 'utf-8'))
		.split('\n')
		.map(l => l.trimRight());
	lines.splice(lines.length - 1, 1);
	await writeFile(
		'./dist/node-bandwidth.js',
		`"use strict";
(function(defineModules){
	var modules = {};
	var isGlobal = false;
	defineModules((typeof define === 'function' && define.amd) ? define : function(name, dependencies, factory){
		isGlobal = true;
		modules[name] = {dependencies: dependencies, factory: factory};
	});
	if (isGlobal) {
		var require = function(name, instance){
			var module =  modules[name] || {};
			if (name === 'require') {
				return require;
			}
			if (name === 'exports') {
				return instance;
			}
			if (module.instance) {
				return module.instance;
			}
			if (typeof module.factory === 'function') {
				var instance = {};
				var args = (module.dependencies || []).map(function (n){
					return require(n, instance);
				});
				factory.apply(null, args);
				module.instance = instance;
				return instance;
			}
			return window[name];
		};
		window.BandwidthApi =  require('index', {}).default;
	}

})(function(define){
${lines.map(l => `\t ${l}`).join('\n')}
});`,
		'utf-8'
	);
}

main().catch(console.trace);
