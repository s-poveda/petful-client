import Service from './api';
const service = new Service();

const petsService = {
	get() {
		return service.get('/pets');
	},

	del(type) {
		return service.del(`/pets/${type}`);
	}
}

export default petsService;
