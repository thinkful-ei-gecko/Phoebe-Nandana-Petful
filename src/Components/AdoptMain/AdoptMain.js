import React, { Component } from "react";
import ApiContext from '../../Contexts/ApiContext'
//import Line from '../Line/Line'
//import config from '../../config'
import ApiService from '../../Services/api-service'


export default class AdoptMain extends Component {
  static contextType = ApiContext; 
	state = {
    index: 0,
	};
  // //increments or decrements index of current object; loops through when gets to the end
	// changeIndex = (num) => {
  //   let petList = this.context.petType === 'dogs' ? this.context.dogList :this.context.catList 
	// 	if (this.state.index <= 1 && !num) {
	// 		return;
  //   }
  //   let petListLength = petList.length
  //   //if we're at the last pet in the array, loop
  //   if (num === 1 && petListLength -1 === this.state.index) {
  //     //essentially resets state
  //     num = -this.state.index
  //   }
	// 	this.setState({
	// 		index: this.state.index + num
	// 	});
  // }


  handleAdopt = petType => {
    ApiService.deletePet(petType)
      .then(res => 
        (petType === 'dogs')
        ? this.context.setDogList(res):this.context.setCatList(res)
      )
      ApiService.deleteAdopter()
      .then(res => {
        this.context.setHumanList(res)
      });
    
    // let length = this.context.humanList.length || 0 ;
    // length === 1 ? clearInterval() : setInterval(() => {
    //   this.handleAdopt(petType)
    // }, 3000)
      
    //promise.then(() => {
      //console.log('**********',this.context.humanList.length)
      //let petList = petType === 'dogs' ? this.context.dogsList :this.context.catsList 
      //base case: if they are all adopted (first in list means all adopted (looped)), then you're done! 
      // if (this.context.humanList.length === 1) {
      //   clearInterval(this.onMount)
      // }
      // //else do another loop
      // else {
      //   this.handleAdopt(petType)
      // }
    //})
  }

  componentDidMount = () => {
    let petType = this.context.petType || ''
    this.onMount = setInterval(() => {
      this.handleAdopt(petType)
    }, 3000)
  }
  componentWillUnmount() {
    clearInterval(this.onMount);
  }
	render = () => {

		return (
			<>
		<h3>Adopt</h3>
		
			
			</>
		);
	}
}
