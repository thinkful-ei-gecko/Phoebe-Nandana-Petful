import React, { Component } from "react";
import config from '../../config'
import AdoptMain from "../../Components/AdoptMain/AdoptMain";
import ApiContext from "../../Contexts/ApiContext";
import './AdoptDogs.css' 
import Line from '../../Components/Line/Line'


export default class adoptCat extends Component {
  static contextType = ApiContext;
  state = {
    index: 0,
	};
   //increments or decrements index of current object; loops through when gets to the end
	changeIndex = (num) => {
		if (this.state.index <= 1 && !num) {
			return;
    }
    let petListLength = this.context.dogsList.length
    console.log(petListLength)
    //if we're at the last pet in the array, loop
    if (num === 1 && petListLength -1 === this.state.index) {
      //essentially resets state
      num = -this.state.index
    }
		this.setState({
			index: this.state.index + num
		});
  }

	componentDidMount = () => {
    
		//get dogs
		fetch(`${config.API_ENDPOINT}/dogs`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
      .then(res=>{this.context.setDogList(res)
        console.log(res)})
			.catch(err => console.log("Error", err))

  };
  
	//pass list into adopt main
	render() {
    let petType = this.context.petType|| '';
    let index = this.state.index;
   const dogsList = this.context.dogsList || [];
    console.log(dogsList)
  let currPet =dogsList[index] ||{}
  console.log(currPet.breed)
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
                
                <li><span className='bold'>Sex:</span> {currPet.sex}</li>
								<li><span className='bold'>Age:</span> {currPet.age}</li>
								<li><span className='bold'>Breed:</span> {currPet.breed}</li>
								<li><span className='bold'>Story:</span> {currPet.story}</li>
							</ul>
              </div>
              <div className='AdoptMain__div lineInfo'>
              <Line />
              <AdoptMain/>
						</div>
            </div>
          </div>
        </>
      );
    
	}
}
