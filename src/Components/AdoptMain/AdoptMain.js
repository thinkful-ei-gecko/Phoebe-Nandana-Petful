import React, { Component } from "react";
import ApiContext from '../../Contexts/ApiContext'
//import Line from '../Line/Line'
import config from '../../config'


export default class AdoptMain extends Component {
  static contextType = ApiContext; 


  handleAdopt = petType => {
    petType = this.context.petType
    let promise = new Promise(() => {
      this.handleDeletePet(petType);
      this.handleDeleteHuman();
    });

    promise.then(() => {
      let petList = petType === 'dogs' ? this.context.dogList :this.context.catList 
      //base case: if they are all adopted (first in list means all adopted (looped)), then you're done! 
      if (petList[0].adopted) {
        return;
      }
      //else do another loop
      else {
        this.handleAdopt(petType)
      }
    })
  }

    handleDeletePet = petType => {
      let url = `${config.API_ENDPOINT}/dogs`; //pbtag
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
        .then(res => {
          this.context.setDogList(res)
        })
        .catch(err => console.log('Error', err))
    }

    handleDeleteHuman = () => {
      
      let url = `${config.API_ENDPOINT}/adopters`; //pbtag
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
        .then(res => {
          this.context.setHumanList(res)
        })
        .catch(err => console.log('Error', err))
    }
  


  componentDidMount = () => {
    this.onMount = setInterval(() => {
      this.handleAdopt(this.context.petType)
    }, 3000)
  }

	render = () => {

		return (
			<>
		<h3>Adopt</h3>
		
			
			</>
		);
	}
}
