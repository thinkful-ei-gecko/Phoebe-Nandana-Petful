import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import config from "../../config";
import ApiContext from "../../Contexts/ApiContext";
import DefaultMain from "../DefaultMain/DefaultMain";
import AdoptDogs from "../../Routes/AdoptDogs/AdoptDogs";
import AdoptCats from "../../Routes/AdoptCats/AdoptCats";
import DefaultNav from "../DefaultNav/DefaultNav";
import ErrorPage from "../ErrorPage";
import PageNotFound from "../PageNotFound";
import "./App.css";

export default class App extends Component {
	static contextType = ApiContext;
	state = {
		catsList: [],
		dogsList: [],
		humanList: []
	};

	enqueueHuman = nameArray => {
		this.setState({
			humanList: nameArray
		});
	};

	dequeue = listName => {
		if (listName && listName !== "humanList") {
			let list;
			listName === 'dogsList' ? list = this.state.dogsList : list = this.state.catsList
			let dequeuedObj = list.shift();
			dequeuedObj.adopted = true;
			list.shift();
			list.push(dequeuedObj);
			this.setState({
				[listName]: list
			});
		} else if (listName) {
			let list = [];
			//deep copy
			this.state[listName].map(personObj => list.push(personObj))
			//remove the first animal
			list.shift()
			//set state to the list without the first animal
			this.setState({
				[listName]: list
			});
		}
	};

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
			.then(res => this.setState({ dogsList: res }))
			.catch(err => console.log("Error", err));

		//get cats
		fetch(`${config.API_ENDPOINT}/cats`)
			.then(res =>
				!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
			)
			.then(res => this.setState({ catsList: res }))
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
				<Route path='/adopt/cats' component={AdoptCats} />
				<Route path='/adopt/dogs' component={AdoptDogs} />
				<Route component={PageNotFound} />
			</Switch>
		);
	};

	render() {
		const value = {
			catsList: this.state.catsList,
			dogsList: this.state.dogsList,
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
