import util from 'util';
import test from 'ava';
import td from 'testdouble';
import * as Joi from 'joi';
import nock from 'nock';

const apiData = {
	name: 'node-bandwidth-test',
	version: '3.0.0-test',
	objects: {
		Test: {
			action: {
				method: 'POST',
				path: '/test',
				query: Joi.any(),
				body: Joi.object().keys({test: Joi.string()}),
				bodyKeys: new Set(['test'])
			},
			action2: {
				method: 'GET',
				path: '/test2',
				query: Joi.any(),
				body: Joi.any(),
				bodyKeys: new Set([])
			},
			rateLimit: {
				method: 'GET',
				path: '/rate-limit',
				query: Joi.any(),
				body: Joi.any(),
				bodyKeys: new Set([])
			},
			error: {
				method: 'GET',
				path: '/error',
				query: Joi.any(),
				body: Joi.any(),
				bodyKeys: new Set([])
			}
		}
	}
};

td.replace('../dist/api-data', {default: apiData});

const getBandwidthApi = require('../dist/index').default;

nock('http://fakeserver')
	.post('/test', {test: 'test'})
	.reply(201, '', {Location: 'http://localhost/id'})
	.get('/rate-limit')
	.reply(429, '', {'X-RateLimit-Reset': 1000})
	.get('/error')
	.reply(400, '')
	.get('/test2?param1=param1&param2=100')
	.reply(200, {result: true});

test('It should return factory function', t => {
	t.true(util.isFunction(getBandwidthApi));
	t.pass();
});

test('getBandwidthApi() should return return api instance', t => {
	const api = getBandwidthApi({apiToken: 'token', apiSecret: 'secret'});
	t.truthy(api);
});

test('BandwidthApi should provide access to api objects', t => {
	const api = getBandwidthApi({apiToken: 'token', apiSecret: 'secret'});
	const test = api.Test;
	t.truthy(test);
	t.is(api.Test, test);
});

test('BandwidthApi should provide access to api actions', t => {
	const api = getBandwidthApi({apiToken: 'token', apiSecret: 'secret'});
	t.true(util.isFunction(api.Test.action));
	t.true(util.isFunction(api.Test.action2));
});

test('Action of BandwidthApi should make http request and return promise', async t => {
	const api = getBandwidthApi({
		baseUrl: 'http://fakeserver',
		apiToken: 'token',
		apiSecret: 'secret'
	});
	const promise = api.Test.action({test: 'test'});
	t.true(util.isFunction(promise.then));
	const d = await promise;
	t.is(d.id, 'id');
});

test('Action of BandwidthApi should handle rate limit error', async t => {
	const api = getBandwidthApi({
		baseUrl: 'http://fakeserver',
		apiToken: 'token',
		apiSecret: 'secret'
	});
	const err = await t.throws(api.Test.rateLimit());
	t.is(err.limitReset, 1000);
});

test('Action of BandwidthApi should handle other api errors', async t => {
	const api = getBandwidthApi({
		baseUrl: 'http://fakeserver',
		apiToken: 'token',
		apiSecret: 'secret'
	});
	const err = await t.throws(api.Test.error());
	t.is(err.status, 400);
});

test('Action of BandwidthApi should handle query params', async t => {
	const api = getBandwidthApi({
		baseUrl: 'http://fakeserver',
		apiToken: 'token',
		apiSecret: 'secret'
	});
	const data = await api.Test.action2({param1: 'param1', param2: 100});
	t.deepEqual(data, {result: true});
});
