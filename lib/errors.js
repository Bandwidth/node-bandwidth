export class UnexpectedResponseError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
		this.name = 'UnexpectedResponseError';
	}
}

export class RateLimitError extends UnexpectedResponseError {
	constructor(message, status, limitReset) {
		super(message, status);
		this.limitReset = limitReset;
		this.name = 'RateLimitError';
	}
}
