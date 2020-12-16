export default {
	setItem(key, name) {
		window.localStorage.setItem('name', name);
	},
	getItem(key) {
		return window.localStorage.getItem(key);
	},
	deleteItem(key) {
		window.localStorage.removeItem(key);
	},
}
