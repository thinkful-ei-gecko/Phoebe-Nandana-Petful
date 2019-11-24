import React, { Component } from "react";
import Line from "../../Components/Line/Line";
import ApiContext from "../../Contexts/ApiContext";
import adoptApiService from "../../Services/adopt-api-service";
import "./AdoptMain.css";

export default class AdoptMain extends Component {
	static contextType = ApiContext;
	state = {
		index: 0
	};

	//increments or decrements index of current object; loops through when gets to the end
	changeIndex = num => {
		if (this.state.index <= 1 && !num) {
			return;
		}
		let petListLength = this.props.petList.length;
		//if we're at the last pet in the array, loop
		if (num === 1 && petListLength - 1 === this.state.index) {
			//essentially resets state
			num = -this.state.index;
		}
		this.setState({
			index: this.state.index + num
		});
	};

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidMount() {
		this.setState({ petList: this.props.petList });
		try {
			this.interval = setInterval(() => {
				const petType = this.props.petType.toLowerCase();
				adoptApiService
					.deleteAdopter()
					.then(() => this.context.dequeue(`adoptersList`));
        adoptApiService
					.deletePet(petType)
					.then(res => {
						let adoptedPet = res[res.length - 1].name;
						this.setState({
							adoptedPet
						});
					})
					.then(() => this.context.dequeue(`${petType}List`));
			}, 5000);
		} catch (e) {
			console.log(e);
		}
	}

	render = () => {
		let petType = this.props.petType;
		let index = this.state.index;
		let currPet = this.props.petList[index];
		let adoptionStatus; let filter; let color;
    
    //if adoption line is empty or if all dogs are adopted, clear interval
    if (this.context.adoptersList.length === 0 || this.props.petList[0].adopted === true) {
      clearInterval(this.interval);
    }

		//if not adopted and front of the array, return 'available'
		if (!currPet.adopted && index === 0) {
      adoptionStatus = "Available";
      color = 'green';
		}
		//if not adopted but not in front of the array, return 'available after first is adopted'
		else if (!currPet.adopted) {
      adoptionStatus = `Not currently available (not first in line for adoption)`;
      color = 'orange';
		}
		//otherwise (if adopted === true) return "no longer available"
		else {
      adoptionStatus = "No longer available (in the process of being adopted)";
      color = 'red';
      filter = 'grayscale';
		}
    let line = this.context.adoptersList;

		return (
			<>
				<div className='AdoptMain__div'>
					<h1>FIDO & FIFO ADOPTION</h1>
					<div className='AdoptMain__div body'>
						<div className='AdoptMain__div petInfo'>
							<h2>{petType} for Adoption</h2>
							<div className='photoButtonsContainer'>
								{this.state.index < 1 ? (
									<button className='AdoptMain__button disabled'>
										<i className='fas fa-chevron-left'></i>
									</button>
								) : (
									<button
										className='AdoptMain__button'
										onClick={() => this.changeIndex(-1)}
									>
										<i className='fas fa-chevron-left'></i>
									</button>
								)}{" "}
								<img
									src={currPet.imageURL}
									alt={currPet.imageDescription}
                  className={`AdoptMain__img ${filter}`}
                ></img>
								<button
									className='AdoptMain__button'
									onClick={() => this.changeIndex(1)}
								>
									<i className='fas fa-chevron-right'></i>
								</button>
							</div>
							<h3>{currPet.name}</h3>
							<ul>
								<li>
									<span className=''>Adoption Status:</span>{" "}
									<span className={color}>{adoptionStatus}</span>
								</li>
								<li>
									<span className='bold'>Sex:</span> {currPet.sex}
								</li>
								<li>
									<span className='bold'>Age:</span> {currPet.age}
								</li>
								<li>
									<span className='bold'>Breed:</span> {currPet.breed}
								</li>
								<li>
									<span className='bold'>Story:</span> {currPet.story}
								</li>
							</ul>
						</div>
						<div className='AdoptMain__div lineInfo'>
							<Line line={line} />
						</div>
					</div>
				</div>
			</>
		);
	};
}
