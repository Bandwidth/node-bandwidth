import test from 'ava';
import {UnexpectedResponseError, RateLimitError} from '../dist/errors';

test('UnexpectedResponseError should create instance', t => {
	t.truthy(new UnexpectedResponseError('error', 400));
});

test('RateLimitError should create instance', t => {
	t.truthy(new RateLimitError('error', 400, 1000));
});
