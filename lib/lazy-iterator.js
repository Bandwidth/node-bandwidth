// prettier-ignore

// Prettier now can not parse right async iterators. So we have to add this file to ignore list
export default async function* getResultAsLazyIterator(response) {
	while (true) {
		for (let item in response.data) {
			yield await Promise.resolve(item);
		}
		let nextUrl;
		if ((nextUrl = getNextUrl(response.headers.link))) {
			response = await this.axios.get(nextUrl);
		} else {
			break;
		}
	}
}
