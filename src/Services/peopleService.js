import Service from './api';

const service = new Service();

const pepoleService = {
	get() {
		return service.get('/people');
	},
	post(name) {
		return service.post('/people', { name });
	},
}

export default pepoleService;
