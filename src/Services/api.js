const { API_BASE } = require('../config');

async function fetchHandler(...args) {
	const res = await fetch(...args);
	if (!res.ok) return await res.json();
	if (res.status === 204) return null;
	return await res.json();
}

export default class apiService {
	get(url) {
		return fetchHandler(API_BASE + url);
	}
	post(url, data) {
		const body = JSON.stringify(data);
	 	return fetchHandler(API_BASE + url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		});
	}
	del(url) {
	 return fetchHandler(API_BASE + url, {
		 method: 'DELETE',
	 });
	}
}
