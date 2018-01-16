import axios from 'axios';

axios.defaults.headers.common['User-Agent'] = '$NAME-v$VERSION';

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
	}
}
