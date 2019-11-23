import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import DefaultMain from "../DefaultMain/DefaultMain";
import AdoptPets from "../../Routes/AdoptPets/AdoptPets";
import DefaultNav from "../DefaultNav/DefaultNav";
import ErrorPage from "../ErrorPage";
import PageNotFound from "../PageNotFound";
import './App.css';

export default class App extends Component {

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
        <Route path='/adopt/pets' component={AdoptPets} />
				<Route component={PageNotFound} />
			</Switch>
		);
	};
  render() {
	
  return (
    
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
 
  );
}

}


