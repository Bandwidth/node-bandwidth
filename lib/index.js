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

	handleError({response, message}) {
		const status = (response || {}).status;
		if (status === 429) {
			const limitReset = response.headers['x-ratelimit-reset'];
			if (limitReset) {
				return Promise.reject(
					new RateLimitError(response.data, status, limitReset)
				);
			}
			return Promise.reject(new UnexpectedResponseError(response.data, status));
		}
		return Promise.reject(new UnexpectedResponseError(message, status));
	}

	handleSuccess(response) {
		const data = response.data || {};
		if (response.status === 201) {
			const ids = (response.headers.location || '').split('/');
			if (ids.length > 1) {
				data.id = ids[ids.length - 1];
			}
		}
		return data;
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
			const result = await this.axios({
				method: options.method,
				url: options.path,
				data: body,
				params: query,
				cancelToken
			});
			return result;
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
