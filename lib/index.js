import axios from 'axios';
import * as Joi from 'joi';
import apiData from './api-data';
import {UnexpectedResponseError, RateLimitError} from './errors';
import getResultAsLazyIterator from './lazy-iterator'; // eslint-disable-line no-alert, import/no-named-as-default, import/no-named-as-default-member, import/default, import/namespace

axios.defaults.headers.common['User-Agent'] = `${apiData.name}/v${
	apiData.version
}`;

class BandwidthApi {
	constructor(options) {
		if (!options.apiToken || !options.apiSecret) {
			throw new Error('apiToken and apiSecret are required');
		}
		this.userId = options.userId;
		this.apiObjects = new Map();
		this.axios = axios.create({
			baseURL: options.baseUrl || 'https://api.catapult.inetwork.com',
			auth: {
				username: options.apiToken,
				password: options.apiSecret
			}
		});
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

	getNextUrl(link) {
		const url =
			(link || '')
				.split(',')
				.filter(l => l.endsWith('rel="next"'))
				.split(';')[0] || '';
		return url.substr(1, url.length - 2);
	}

	getApiObject(name) {
		let api = this.apiObjects[name];
		if (!api) {
			const methods = apiData.objects[name];
			if (!methods) {
				return undefined;
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

	handleResponse(options, response) {
		const result = response.data || {};
		if (response.status === 201) {
			const ids = (response.headers.location || '').split('/');
			if (ids.length > 1) {
				result.id = ids[ids.length - 1];
			}
		}
		const request = response.request;
		if (
			response.status === 200 &&
			request.method === 'GET' &&
			response.headers.link &&
			!request.params.page
		) {
			return getResultAsLazyIterator.call(this, response);
		}
		return result;
	}

	handleError(err) {
		const status = (err.response || {}).status;
		if (status === 429) {
			const limitReset = err.response.headers['x-ratelimit-reset'];
			if (limitReset) {
				throw new RateLimitError(err.response.data, status, limitReset);
			}
			throw new UnexpectedResponseError(err.response.data, status);
		}
		throw new UnexpectedResponseError(err.message, status);
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
			const result = await this.axios({
				method: options.method,
				url: options.path,
				data: body,
				params: query,
				cancelToken
			}).then(this.handleResponse.bind(this, options), this.handleError);
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
