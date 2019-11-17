import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import config from '../../config';
import ApiContext from '../../Contexts/ApiContext'
//import AdopterApiService from '../../services/adopter-api-service'

export default class SignupMain extends Component {
	static contextType = ApiContext;
	class = {
		redirect: false,
		petType: ''
	}
	handleSubmit = (e) => {
		console.log("^^^^^^^^^^^^^^^^^^ ",e.target)
		e.preventDefault()
		const {adopterName} = e.target
		this.handlePostHumans(adopterName.value);
		this.props.history.push(`/adopt/${this.state.petType}`)
	}
	// handleSubmit = (e) => {
	// 	e.preventDefault()
	// 	const {name} = e.target
	// 	AdopterApiService.postAdopterName(name.value)
	// 	.then(res=>{
	// 		name.value = ''
	// 		this.context.enqueueHuman(res)
	// 	})
	// .catch(err => console.log('Error', err))

	// 	// this.handlePostHumans(e.target.value);
	// 	// this.props.history.push(`/adopt/${this.state.petType}`)
	// }

	handlePostHumans = newName => {
		console.log(newName)
		let url = `${config.API_ENDPOINT}/adopters/post`;
		fetch(url, { 
      method: 'POST',
      headers: {
        // "Authorization": `Bearer ${config.API_TOKEN}`,
				"Content-type": "application/json",
			},
			body: JSON.stringify({
        name: newName,
      }),
    })
			// .then(res => 
			// 	(!res.ok)
			// 	? res.json().then(e => Promise.reject(e))
			// 	: res.json()
      .then(res => {
				// console.log('&&&&&',res.json())
					this.context.enqueueHuman(res.json());
				})
				this.setState({
					
					redirect: true
				})
			
	}

	render () {
		return (
			<div className='SignupMain__div'>
				<body>
					<h2>FIFO Adoption</h2>
					<p>Fido is a dog's name, but FIFO stands for "first in first out". To ensure our lovely animals get a home sooner than later, FIDO & FIFO does adoptions on a first-in, first-out basis; the cat or dog that has been with us longest will be the first to go home.</p>
					<p>If you'd like to join the list, please enter your name below. Depending on your choice of dog or cat, you'll be redirected to view the adoptees in line. Please note that you cannot view the animals without signing up on the list.</p>
					<form onSubmit={e => this.handleSubmit(e)}>
						<h3>Join the Queue</h3>
						<div>
							<label htmlFor='adopterName'>
								Your Full Name:
							</label>{' '}
							<input type='text' id='adopterName' name ='adopterName' required>
							</input>
						</div>
						<div>
							<button type='submit' onClick={() => this.setState({petType: 'cat'})}>Adopt a Cat</button>{' '}
							<button type='submit' onClick={() => this.setState({petType: 'dog'})}>Adopt a Dog</button>
						</div>
					</form>
				</body>
			</div>
		);
	}
};
