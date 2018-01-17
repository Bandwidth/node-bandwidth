import axios from 'axios';
import apiData from './api-data';
import {UnexpectedResponseError, RateLimitError} from './errors';

axios.defaults.headers.common['User-Agent'] = `${apiData.name}/v${
	apiData.version
}`;

export default class BandwidthApi {
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
			r => r,
			err => {
				const response = err.response;
				if (response.status === 429) {
					const limitReset = response.headers['x-ratelimit-reset'];
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
					new UnexpectedResponseError(err.message, response.status)
				);
			}
		);
	}
}
