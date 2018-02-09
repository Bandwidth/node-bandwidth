function prepareApiMethodData(method, path, data) {
	const query = {type: 'object', properties: {}};
	(data.parameters || []).filter(p => p.in === 'query').forEach(p => {
		query.properties[p.name] = p.schema;
		query.properties[p.name].description = p.description;
	});
	const requestBody = (data.requestBody || {}).content || {};
	const contentType = Object.keys(requestBody)[0];
	const body = (requestBody[contentType] || {}).schema || {};
	return {
		method: method.toUpperCase(),
		path,
		query,
		body,
		contentType
	};
}

function getFirstSchema(content) {
	if (!content) {
		return null;
	}
	const firstKey = Object.keys(content)[0];
	return (content[firstKey] || {}).schema;
}
function prepareApiData(openapi) {
	const apiData = {};
	Object.keys(openapi.paths).forEach(path => {
		const methods = openapi.paths[path];
		Object.keys(methods).forEach(method => {
			const data = methods[method];
			data.tags.forEach(tag => {
				apiData[tag] = apiData[tag] || {};
				apiData[tag][data.operationId] = prepareApiMethodData(
					method,
					path,
					data
				);
				apiData[tag][data.operationId]._example = data['x-js-example'];
				apiData[tag][data.operationId]._description = data.summary;
				apiData[tag][data.operationId]._responses = Object.keys(
					data.responses
				).map(status => {
					const response = data.responses[status];
					return {
						status,
						description: response.description,
						schema: getFirstSchema(response.content),
						headers: response.headers
					};
				});
			});
		});
	});
	openapi.tags.forEach(tag => {
		apiData[tag.name] = apiData[tag.name] || {};
		apiData[tag.name]._description = tag.description;
	});
	return apiData;
}

module.exports = prepareApiData;
