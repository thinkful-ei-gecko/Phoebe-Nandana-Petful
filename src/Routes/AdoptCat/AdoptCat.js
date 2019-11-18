import React, { Component } from "react";

import AdoptMain from "../../Components/AdoptMain/AdoptMain";
import ApiContext from "../../Contexts/ApiContext";

export default class adoptDog extends Component {
	static contextType = ApiContext;

	//pass list into adopt main
	render() {
    if (this.context.catsList.length === 0) {
      return null;
    }
    else {
      console.log('catsList passed in context in `AdoptCat`', this.context.catsList);
      return (
        <>
          <AdoptMain petType='cat' petList={this.context.catsList} />
        </>
      );
    }
	}
}
