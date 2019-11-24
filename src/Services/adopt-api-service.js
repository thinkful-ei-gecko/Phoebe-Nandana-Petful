import config from "../config";

const adoptApiService = {
	getAdopters() {
		return fetch(`${config.API_ENDPOINT}/adopters`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.catch(err => console.log("Error", err));
	},

	getDogs() {
		return fetch(`${config.API_ENDPOINT}/dogs`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.catch(err => console.log("Error", err));
	},

	getCats() {
		return fetch(`${config.API_ENDPOINT}/cats`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.catch(err => console.log("Error", err));
	},

	postAdopters(newName) {
		let url = `${config.API_ENDPOINT}/adopters/post`;
		return fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				name: newName
			})
		})
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .catch(err => console.log("Error", err));
	},

	deletePet(petType) {
		return fetch(`${config.API_ENDPOINT}/${petType}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.catch(err => console.log("Error", err));
	},

	deleteAdopter() {
		return fetch(`${config.API_ENDPOINT}/adopters`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.catch(err => console.log("Error", err));
	}
};

export default adoptApiService;
