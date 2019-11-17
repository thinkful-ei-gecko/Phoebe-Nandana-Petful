import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import config from "../../config";
import ApiContext from "../../Contexts/ApiContext";
//import dogList from '../../dogStore';
import DefaultMain from "../DefaultMain/DefaultMain";
import AdoptDog from "../../Routes/AdoptDog/AdoptDog";
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
		if (listName && listName !== 'humanList') {
			let list = this.state.listName;
			let dqdObj = list.shift();
			dqdObj.adopted = true;
			list.shift().push(dqdObj)
			this.setState ({
				[listName]: list
			})
		} else {
			this.setState ({
				[listName]: this.state.listName.shift()
			})
		}
	}

	// componentDidMount(){
	// AdopterApiService.getDogList()
	// .then (res =>{
	// 	this.context.setDogList(res);
	// })
	// }
	
	componentDidMount = () => {
		//get humans
		fetch(`${config.API_ENDPOINT}/adopters`)
			// .then(res => {
			//   (!res.ok)
			// 		? res.json().then(e => Promise.reject(e))
			// 		: res.json()
			// })
			.then(res => this.setState({ humanList: res.ok }))

		//get dogs
		fetch(`${config.API_ENDPOINT}/dogs`)
			.then(res =>
				 (!res.ok)
					? res.json().then(e => Promise.reject(e))
					: res.json()
			)
			.then(res => this.setState({ dogList: res }))

		//get cats
		// fetch(`${config.API_ENDPOINT}/cats`) //pbtag
		// 	.then(res => {
		// 		if (!res.ok)
		// 			return res.json().then(e => Promise.reject(e));
		// 	})
		// 	.then(res => this.setState({ catList: res }));
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
				{/* <Route path='/adopt/cat' component={AdoptCat} /> */}
				<Route path='/adopt/dog' component={AdoptDog} />
				<Route component={PageNotFound} />
			</Switch>
		);
	};
	render() {
		console.log('dogList in state of App', this.state.dogList, 'line', this.state.humanList)
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
