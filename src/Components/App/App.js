import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import ApiContext from "../../Contexts/ApiContext";
import adoptApiService from '../../Services/adopt-api-service';
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
		adoptersList: []
	};

	enqueueAdopter = nameArray => {
		this.setState({
			adoptersList: nameArray
		});
	};

	dequeue = listName => {
		if (listName && listName !== "adoptersList") {
			let list;
			listName === 'dogsList' ? list = this.state.dogsList : list = this.state.catsList
			let dequeuedObj = list.shift();
			dequeuedObj.adopted = true;
			list.push(dequeuedObj);
			this.setState({
				[listName]: list
			});
		} else if (listName) {
			let list = [];
			//creates deep copy
			this.state[listName].map(personObj => list.push(personObj))
			list.shift()
			this.setState({
				[listName]: list
			});
		}
	};

	componentDidMount = () => {
		adoptApiService.getAdopters().then(res => {
			this.setState({ adoptersList: res });
		});
		adoptApiService.getDogs().then(res => {
			this.setState({ dogsList: res });
		});
		adoptApiService.getCats().then(res => {
			this.setState({ catsList: res });
		});
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
			adoptersList: this.state.adoptersList,
			enqueueAdopter: this.enqueueAdopter,
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
