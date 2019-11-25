import config from '../config'

const ApiService = {

	getPetList(petType){
		return fetch(`${config.API_ENDPOINT}/${petType}`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			
			.catch(err => console.log("Error", err));

},

getAdopters(){
	return fetch(`${config.API_ENDPOINT}/adopters`)
		.then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		)
		
		.catch(err => console.log("Error", err));

},


postAdopterName(newName) {
	return fetch(`${config.API_ENDPOINT}/adopters/post`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			name: newName,
		}),
	})
		.then(res =>
			(!res.ok)
				? res.json().then(e => Promise.reject(e))
				: res.json()
		)
		.catch(error=>{
			console.error({error})
		})
},

deletePet(petType)  {
	
	return fetch(`${config.API_ENDPOINT}/${petType}`, { 
		method: 'DELETE',
		headers: {
			"Content-type": "application/json",
		}
	})
		.then(res => 
			(!res.ok)
				? res.json().then(e => Promise.reject(e))
				: res.json()
		)

		.catch(err => console.log('Error', err))
},

deleteAdopter()  {
	
	return fetch(`${config.API_ENDPOINT}/adopters`, { 
		method: 'DELETE',
		headers: {
			"Content-type": "application/json",
		}
	})
		.then(res => 
			(!res.ok)
				? res.json().then(e => Promise.reject(e))
				: res.json()
		)

		.catch(err => console.log('Error', err))
},


}

export default ApiService;


