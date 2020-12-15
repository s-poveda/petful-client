const service = new (require('./api.js'))();
const petsService = {
	get() {
		return service.get('/pets');
	},

	del(type) {
		return service.del(`/pets?type=${type}`);
	}
}

export default petsService;
