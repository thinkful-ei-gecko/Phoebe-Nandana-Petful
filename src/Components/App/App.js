import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import config from "../../config";
import ApiContext from "../../Contexts/ApiContext";
//import dogList from '../../dogStore';
import DefaultMain from "../DefaultMain/DefaultMain";
<<<<<<< HEAD
import AdoptDogs from "../../Routes/AdoptDogs/AdoptDogs";
import AdoptCats from "../../Routes/AdoptCats/AdoptCats";
=======
import AdoptDog from "../../Routes/AdoptDog/AdoptDog";
import AdoptCat from "../../Routes/AdoptCat/AdoptCat";
>>>>>>> ed3c89fdca921512feb8efc8b1df4357d7b7071f
import DefaultNav from "../DefaultNav/DefaultNav";
import ErrorPage from "../ErrorPage";
import "./App.css";
import PageNotFound from "../PageNotFound";
// import AdopterApiService from '../../services/adopter-api-service'
// import ApiContextProvider from "../../Contexts/ApiContext";

export default class App extends Component {
	static contextType = ApiContext;
	state = {
		catList: [],
		dogList: [],
		humanList: []
	};

	enqueueHuman = nameArray => {
		this.setState({
			humanList: nameArray
		});
	};

	dequeue = listName => {
		if (listName && listName !== "humanList") {
			let list = this.state.listName;
			let dqdObj = list.shift();
			dqdObj.adopted = true;
			list.shift().push(dqdObj);
			this.setState({
				[listName]: list
			});
		} else {
			this.setState({
				[listName]: this.state.listName.shift()
			});
		}
	};

	// componentDidMount(){
	// AdopterApiService.getDogList()
	// .then (res =>{
	// 	this.context.setDogList(res);
	// })
	// }

	componentDidMount = () => {
		//get humans
		fetch(`${config.API_ENDPOINT}/adopters`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.then(res => this.setState({ humanList: res }))
			.catch(err => console.log("Error", err));

		//get dogs
		fetch(`${config.API_ENDPOINT}/dogs`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.then(res => this.setState({ dogList: res }))
			.catch(err => console.log("Error", err));

		//get cats
		fetch(`${config.API_ENDPOINT}/cats`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.then(res => this.setState({ catList: res }))
			.catch(err => console.log("Error", err));
	};

	renderNavRoutes = () => {
		return (
			<>
				<Route exact path='/' component={DefaultNav} />
				<Route exact path='/signup' component={DefaultNav} />
			</>
		);
	};
	renderMainRoutes = () => {
		return (
			<Switch>
				<Route exact path='/' component={DefaultMain} />
				<Route exact path='/signup' component={DefaultMain} />
<<<<<<< HEAD
				<Route path='/adopt/cats' component={AdoptCats} />
				<Route path='/adopt/dogs' component={AdoptDogs} />
=======
				 <Route path='/adopt/cat' component={AdoptCat} /> 
				<Route path='/adopt/dog' component={AdoptDog} />
>>>>>>> ed3c89fdca921512feb8efc8b1df4357d7b7071f
				<Route component={PageNotFound} />
			</Switch>
		);
	};
	render() {
		console.log(
			"dogList in state of App",
			this.state.dogList,
			"line",
			this.state.humanList,
			"cat",
			this.state.catList
		);
		const value = {
			catList: this.state.catList,
			dogList: this.state.dogList,
			humanList: this.state.humanList,
			enqueueHuman: this.enqueueHuman,
			dequeue: this.dequeue
		};
		return (
			<ApiContext.Provider value={value}>
				<div className='App'>
					<nav>
						<Link to='/'>
							<i className='fas fa-paw'></i> FIDO & FIFO
						</Link>{" "}
						{this.renderNavRoutes()}
					</nav>
					<ErrorPage>
						<main className='App__main'>{this.renderMainRoutes()}</main>
					</ErrorPage>
					{/* <Footer /> */}
				</div>
			</ApiContext.Provider>
		);
	}
}
