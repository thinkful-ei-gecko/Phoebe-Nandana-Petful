import React, { Component } from "react";
import Line from '../../Components/Line/Line';
import ApiContext from '../../Contexts/ApiContext'

import config from '../../config';
import './AdoptMain.css';
import { timeout } from "q";

export default class AdoptMain extends Component {
  
  static contextType = ApiContext;
	state = {
		index: 0,
	};

  //increments or decrements index of current object; loops through when gets to the end
	changeIndex = (num) => {
		if (!num && this.state.counter <= 1) {
			return;
    }
    let petListLength = this.props.petList.length
    //if we're at the last pet in the array, loop
    if (num === 1 && petListLength -1 === this.state.index) {
      //essentially resets state
      num = -this.state.index
    }
		this.setState({
			index: this.state.index + num
		});
	}

  scheduledAdopt = petType => {
    // console.log('in scheduled adopt')
    // async function timeout() {
    //   console.log('running timeout')
    //   setTimeout(this.handleDelete(petType), 5000);
    // }
    // for (let i=0; i<this.props.petList.length; i++) {
    //   console.log('sched adopt ran')
    //   timeout().then()
    // }
    // async function f() {
    //   console.log('running timeout')
    //   let promise = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(this.handleDelete(petType)), 5000);
    //   })

    //   let result = await promise;
    //   this.handleDelete(result);
    // }
    // f()
    //https://zellwk.com/blog/async-await-in-loops/
    //do timeout for handle delete
  }

  handleDelete = (petType) => {
    this.handleDeletePet(petType.toLowerCase());
    this.handleDeleteHuman();
  }

  handleDeletePet = petType => {
		let url = `${config.API_ENDPOINT}/${petType}`; //pbtag
		fetch(url, { 
      method: 'DELETE',
      headers: {
        // "Authorization": `Bearer ${config.API_TOKEN}`,
				"Content-type": "application/json",
      }
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(() => this.context.dequeue(`${petType}List`))
      .then(() => {
        return;
      })
      .catch(err => console.log('Error', err))
  }

  handleDeleteHuman = () => {
    this.context.dequeue(`humanList`)
		// let url = `${config.API_ENDPOINT}/adopters$`; //pbtag
		// fetch(url, { 
    //   method: 'DELETE',
    //   headers: {
    //     // "Authorization": `Bearer ${config.API_TOKEN}`,
		// 		"Content-type": "application/json",
    //   }
    // })
    //   .then(res => 
    //     (!res.ok)
    //       ? res.json().then(e => Promise.reject(e))
    //       : res.json()
    //   )
    //   .then(() => {
    //     this.context.dequeue(`humanList`)
    //   })
    //   .catch(err => console.log('Error', err))
  }
 
	componentDidMount = () => {
		console.log('in `compDidMt')
    this.scheduledAdopt(this.props.petType, 0);
	}

	render = () => {
		let petType = this.props.petType;
    let index = this.state.index;
    let currPet = this.props.petList[index];
    let adoptionStatus;

    //if not adopted and front of the array, return 'available'
    if (!currPet.adopted && index === 0) {
      adoptionStatus = 'Available'
    }
    //if not adopted but not in front of the array, return 'available after first is adopted'
    else if (!currPet.adopted) {
      adoptionStatus = `Not currently available (not first in line for adoption)`
    } else {
      adoptionStatus = 'No longer available (in the process of being adopted)'
    }
    let line = this.context.humanList;

		return (
			<>
				<div className='AdoptMain__div'>
          <h1>FIDO & FIFO ADOPTION</h1>
					<div className='AdoptMain__div body'>
						<div className='AdoptMain__div petInfo'>
              <h2>{petType} for Adoption</h2>
              <div className='photoButtonsContainer'>
                {this.state.index < 1 ? (
                    <button className='AdoptMain__button disabled'><i className="fas fa-chevron-left"></i></button>
                  ) : (
                    <button className='AdoptMain__button' onClick={() => this.changeIndex(-1)}><i className="fas fa-chevron-left"></i></button>
                  )}{' '}
                <img src={currPet.imageURL} alt={currPet.imageDescription} className='AdoptMain__img'></img>
                <button className='AdoptMain__button' onClick={() => this.changeIndex(1)}><i className="fas fa-chevron-right"></i></button>
              </div>
              <h3>{currPet.name}</h3>
							<ul>
                <li><span className='bold'>Adoption Status:</span> {adoptionStatus}</li>
                <li><span className='bold'>Sex:</span> {currPet.sex}</li>
								<li><span className='bold'>Age:</span> {currPet.age}</li>
								<li><span className='bold'>Breed:</span> {currPet.breed}</li>
								<li><span className='bold'>Story:</span> {currPet.story}</li>
							</ul>
						</div>
						<div className='AdoptMain__div lineInfo'>
              <Line line={line}/>
						</div>
					</div>
				</div>
			</>
		);
	}
}
