import axios from 'axios';
import * as Joi from 'joi';
import apiData from './api-data';
import extendApiData from './extensions/index';
import {UnexpectedResponseError, RateLimitError} from './errors';
import bandwidthXml from './bandwidth-xml';
import getResultAsLazyIterator from './lazy-iterator'; // eslint-disable-line no-alert, import/no-named-as-default, import/no-named-as-default-member, import/default, import/namespace

extendApiData(apiData.objects);

axios.defaults.headers.common['User-Agent'] = `${apiData.name}/v${
	apiData.version
}`;

function extractId(location) {
	location = location || '';
	const ids = location.split('/');
	if (location.startsWith('http') && ids.length > 1) {
		return ids[ids.length - 1];
	}
}

class BandwidthApi {
	constructor(options = {}) {
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

	async extractRequestParams(data, url, options) {
		const query = {};
		const body = {};
		Object.keys(data).forEach(key => {
			const paramName = `{${key}}`;
			const i = url.indexOf(paramName);
			if (i >= 0) {
				url =
					url.substr(0, i) +
					encodeURIComponent(data[key]) +
					url.substr(i + paramName.length);
			} else if (
				!options.query ||
				(options.bodyKeys && options.bodyKeys.has(key))
			) {
				body[key] = data[key];
			} else {
				query[key] = data[key];
			}
		});
		await Joi.validate(query, options.query || Joi.any());
		await Joi.validate(data, options.body || Joi.any());
		return {
			query,
			body,
			url
		};
	}
	getApiObject(name) {
		let api = this.apiObjects.get(name);
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
			this.apiObjects.set(name, api);
		}
		return api;
	}

	handleResponse(options, response) {
		let result = response.data || {};
		if (options.binaryResponse) {
			result = {
				content: response.data,
				contentType: response.headers['content-type']
			};
		}
		if (response.status === 201) {
			// Extract Id
			const id = extractId(response.headers.location);
			if (id) {
				return id;
			}
		}
		const config = response.config;
		if (
			response.status === 200 &&
			config.method.toUpperCase() === 'GET' &&
			response.headers.link &&
			typeof config.params.page === 'undefined'
		) {
			return getResultAsLazyIterator(response, this.axios, list =>
				this.extractIds(list)
			);
		}
		this.extractIds(result);
		return result;
	}

	extractIds(list) {
		if (Array.isArray(list) && list.length > 0) {
			list.forEach(r => {
				r.id = r.id || extractId(r.location);
				if (typeof r.call === 'string') {
					r.callId = extractId(r.call);
				}
				if (typeof r.media === 'string') {
					r.mediaName = extractId(r.media);
				}
			});
		}
	}

	handleError(err) {
		const status = (err.response || {}).status;
		if (status === 429) {
			throw new RateLimitError(
				err.response.data,
				status,
				err.response.headers['x-ratelimit-reset']
			);
		}
		throw new UnexpectedResponseError(err.message, status);
	}

	getApiMethod(api, name, options) {
		if (!options) {
			return undefined;
		}
		if (typeof options.execute === 'function') {
			return options.execute.bind(this);
		}
		return async (data, cancelToken = null) => {
			const headers = {};
			data = data || {};
			let responseType = 'json';
			if (options.binaryResponse) {
				responseType = 'arraybuffer';
				if (data && data.responseType) {
					responseType = data.responseType;
					delete data.responseType;
				}
			}
			let {query, body, url} = await this.extractRequestParams(
				data,
				options.path.replace('{userId}', this.userId),
				options
			);
			if (data.content && typeof data.content !== 'object') {
				headers['Content-Type'] =
					data.contentType || 'application/octet-stream';
				body = data.content;
				query = {};
			}
			const result = await this.axios({
				method: options.method,
				url,
				data: body,
				params: query,
				headers,
				responseType,
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

export {bandwidthXml, UnexpectedResponseError, RateLimitError};

getBandwidthApi.UnexpectedResponseError = UnexpectedResponseError;
getBandwidthApi.RateLimitError = RateLimitError;
getBandwidthApi.bandwidthXml = bandwidthXml;
