import React, { Component } from 'react';
import config from '../../config';
import ApiContext from '../../Contexts/ApiContext'
import './SignupMain.css'

export default class SignupMain extends Component {
	static contextType = ApiContext;
	class = {
		// redirect: false,
		petType: ''
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {adopterName} = e.target
		this.handlePostHumans(adopterName.value);
		this.props.history.push(`/adopt/${this.state.petType}`)
	}

	handlePostHumans = newName => {

		let url = `${config.API_ENDPOINT}/adopters/post`;
		fetch(url, { 
      method: 'POST',
      headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
        name: newName,
      }),
    })
      .then(res => {
					this.context.enqueueHuman(res.json());
				})
				// this.setState({
				// 	redirect: true
				// })
	}

	render = () => {
		return (
			<div className='SignupMain__div'>
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
					<div className='SignupMain__div buttonContainer'>
						<button className='SignupMain__button' type='submit' onClick={() => this.setState({petType: 'cats'})}>Adopt a Cat</button>{' '}
						<button className='SignupMain__button' type='submit' onClick={() => this.setState({petType: 'dogs'})}>Adopt a Dog</button>
					</div>
				</form>
			</div>
		);
	}
};
