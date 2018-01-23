// prettier-ignore

// Prettier now can not parse right async iterators. So we have to add this file to ignore list
export default async function* getResultAsLazyIterator(response, axios) {
	while (true) {
		for (const item of response.data) {
			yield item;
		}
		let nextUrl;
		if ((nextUrl = getNextUrl(response.headers.link))) {
			response = await axios.get(nextUrl);
		} else {
			break;
		}
	}
}

function getNextUrl(link) {
	const url =
		(
			(link || '').split(',').filter(l => l.endsWith('rel="next"'))[0] || ''
		).split(';')[0] || '';
	return url.substr(1, url.length - 2);
}
