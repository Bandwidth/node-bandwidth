
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
