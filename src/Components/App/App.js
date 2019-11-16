import React, { Component } from "react";
import { Route, Link, Switch } from 'react-router-dom';

import ApiContext from '../../Contexts/ApiContext'
import dogList from '../../dogStore';
import DefaultMain from '../DefaultMain/DefaultMain';
import AdoptDog from '../../Routes/AdoptDog/AdoptDog'
import DefaultNav from '../DefaultNav/DefaultNav';
import ErrorPage from '../ErrorPage';
import './App.css'
import PageNotFound from "../PageNotFound";

export default class App extends Component {
	state = {
		catList: [],
		dogList: dogList,
		humanList: ['human1', 'human2', 'human3', 'human4', 'human5'],
	}

	enqueueHuman = name => {
		this.setState({
			humanList: this.state.humanList.push(name)
		})
	}

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

	componentDidMount = () => {
		//get humans
		// fetch(`url/adopters`) //pbtag
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e));
    //   })
    //   .then(res => {
    //     this.setState({
		// 			humanList: res.json()
		// 		})
		// 	})

		// // get dogs
		// fetch(`url/adopters`) //pbtag
		// .then(res => {
		// 	if (!res.ok)
		// 		return res.json().then(e => Promise.reject(e));
		// })
		// .then(res => {
		// 	this.setState({
		// 		dogList: res.json()
		// 	})
		// })

		// //get cats
		// fetch(`url/adopters`) //pbtag
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e));
    //   })
    //   .then(res => {
    //     this.setState({
		// 			catList: res.json()
		// 		})
		// 	})
	}

	renderNavRoutes= () => {
		return (
			<>
				<Route exact path='/' component={DefaultNav} />
				<Route exact path='/signup' component={DefaultNav} />
			</>
		);
	}
	renderMainRoutes= () => {
		return (
			<Switch>
				<Route exact path='/' component={DefaultMain} />
				<Route exact path='/signup' component={DefaultMain} />
				{/* <Route path='/adopt/cat' component={AdoptCat} /> */}
				<Route path='/adopt/dog' component={AdoptDog} />
				<Route component={PageNotFound} />
			</Switch>
		);
	}
	render= () => {
		const value = {
			catList: this.state.catList,
			dogList: this.state.dogList,
			humanList: this.state.humanList,
			enqueueHuman: this.enqueueHuman,
			dequeue: this.dequeue,
		}
		return (
			<ApiContext.Provider value={value}>
				<div className='App'>
					<nav>
						<Link exact to='/'><i className="fas fa-paw"></i> FIDO & FIFO</Link>{' '}
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