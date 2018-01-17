import axios from 'axios';
import apiData from './api-data';
import {UnexpectedResponseError, RateLimitError} from './errors';

axios.defaults.headers.common['User-Agent'] = `${apiData.name}/v${
	apiData.version
}`;

class BandwidthApi {
	constructor(options) {
		this.options = options;
		this.axios = axios.create({
			baseURL: options.baseUrl || 'https://api.catapult.inetwork.com',
			auth: {
				username: options.apiToken,
				password: options.apiSecret
			}
		});
		this.axios.interceptors.response.use(
			response => this.handleSuccess(response),
			err => this.handleError(err)
		);
		this.apiObjects = new Map();
	}

	handleError({message, response}) {
		if (response.status === 429) {
			const limitReset = response.headers['X-RateLimit-Reset'];
			if (limitReset) {
				return Promise.reject(
					new RateLimitError(response.data, response.status, limitReset)
				);
			}
			return Promise.reject(
				new UnexpectedResponseError(response.data, response.status)
			);
		}
		return Promise.reject(
			new UnexpectedResponseError(message, response.status)
		);
	}

	handleSuccess(response) {
		const data = response.data || {};
		if (response.status === 201) {
			const ids = (response.headers.Location || '').split('/');
			if (ids.length > 1) {
				data.id = ids[ids.length - 1];
			}
		}
		return data;
	}

	getApiObject(name) {
		let api = this.apiObjects[name];
		if (api) {
			const methods = apiData.objects[name];
			api = new Proxy({}, (api, methodName) =>
				this.getApiMethod(api, methodName, methods[methodName])
			);
			this.apiObjects[name] = api;
		}
		return api;
	}

	getApiMethod(api, name, options) {
		if (!options) {
			return undefined;
		}
		return (data, cancelToken = null) => {
			if (!options.params) {
				cancelToken = data;
				data = undefined;
			}
			this.validateApiMethodData(data, options.params);
			let query;
			if (options.method === 'GET') {
				query = data;
				data = undefined;
			}
			return this.axios({
				method: options.method,
				url: options.path,
				data,
				params: query,
				cancelToken
			});
		};
	}

	validateApiMethodData() {
		// TODO implement
	}
}

export default function getBandwidthApi(options) {
	return new Proxy(new BandwidthApi(options), (api, property) =>
		api.getApiObject(property)
	);
}
