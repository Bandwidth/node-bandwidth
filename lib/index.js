import axios from 'axios';
import * as Joi from 'joi';
import apiData from './api-data';
import {UnexpectedResponseError, RateLimitError} from './errors';

axios.defaults.headers.common['User-Agent'] = `${apiData.name}/v${
	apiData.version
}`;

class BandwidthApi {
	constructor(options) {
		if (!options.apiToken || !options.apiToken) {
			throw new Error('apiToken and apiToken are required');
		}
		this.options = options;
		this.apiObjects = new Map();
	}

	async extractRequestQueryAndBody(data, options) {
		const query = {};
		const body = {};
		Object.keys(data || {}).forEach(key => {
			if (options.bodyKeys.has(key)) {
				body[key] = data[key];
			} else {
				query[key] = data[key];
			}
		});
		await Joi.validate(query, options.query);
		await Joi.validate(data, options.body);
		return {query, body};
	}

	getApiObject(name) {
		let api = this.apiObjects[name];
		if (!api) {
			const methods = apiData.objects[name];
			if (!methods) {
				return this[name];
			}
			api = new Proxy(
				{},
				{
					get: (api, methodName) =>
						this.getApiMethod(api, methodName, methods[methodName])
				}
			);
			this.apiObjects[name] = api;
		}
		return api;
	}

	getApiMethod(api, name, options) {
		if (!options) {
			return undefined;
		}
		return async (data, cancelToken = null) => {
			const {query, body} = await this.extractRequestQueryAndBody(
				data,
				options
			);
			try {
				const response = await axios({
					method: options.method,
					url: options.path,
					data: body,
					params: query,
					cancelToken,
					baseURL: this.options.baseUrl || 'https://api.catapult.inetwork.com',
					auth: {
						username: this.options.apiToken,
						password: this.options.apiSecret
					}
				});
				const result = response.data || {};
				if (response.status === 201) {
					const ids = (response.headers.location || '').split('/');
					if (ids.length > 1) {
						result.id = ids[ids.length - 1];
					}
				}
				return result;
			} catch (err) {
				const status = (err.response || {}).status;
				if (status === 429) {
					const limitReset = err.response.headers['x-ratelimit-reset'];
					if (limitReset) {
						return Promise.reject(
							new RateLimitError(err.response.data, status, limitReset)
						);
					}
					return Promise.reject(
						new UnexpectedResponseError(err.response.data, status)
					);
				}
				return Promise.reject(new UnexpectedResponseError(err.message, status));
			}
		};
	}
}

export default function getBandwidthApi(options) {
	return new Proxy(new BandwidthApi(options), {
		get: (api, property) => api.getApiObject(property)
	});
}

getBandwidthApi.UnexpectedResponseError = UnexpectedResponseError;
getBandwidthApi.RateLimitError = RateLimitError;
