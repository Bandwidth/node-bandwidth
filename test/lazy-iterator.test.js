import util from 'util';
import test from 'ava';
import getResultAsLazyIterator from '../dist/lazy-iterator';

test('should return async generator', t => {
	const generator = getResultAsLazyIterator({data: [], headers: {}}, null);
	t.true(util.isFunction(generator.next));
	t.true(util.isFunction(generator.return));
	t.true(util.isFunction(generator.throw));
});

test('async generator should return lazy list of data', async t => {
	const list = [];
	for await (const item of getResultAsLazyIterator(
		{
			data: [{id: '1'}, {id: '2'}, {id: '3'}],
			headers: {}
		},
		null,
		() => {}
	)) {
		list.push(item);
	}
	t.deepEqual(list, [{id: '1'}, {id: '2'}, {id: '3'}]);
});

test('async generator should make addiotional requests on demand', async t => {
	const list = [];
	const axios = {
		get: () => {
			return Promise.resolve({
				data: [{id: '4'}, {id: '5'}, {id: '6'}],
				headers: {}
			});
		}
	};
	for await (const item of getResultAsLazyIterator(
		{
			data: [{id: '1'}, {id: '2'}, {id: '3'}],
			headers: {
				link: `<http://fakeserver/lazy-list?size=25&page=0>; rel="first",<http://fakeserver/lazy-list?size=25&page=1>; rel="next",<http://fakeserver/lazy-list?size=25&page=1>; rel="last"`
			}
		},
		axios,
		() => {}
	)) {
		list.push(item);
	}
	t.deepEqual(list, [
		{id: '1'},
		{id: '2'},
		{id: '3'},
		{id: '4'},
		{id: '5'},
		{id: '6'}
	]);
});
