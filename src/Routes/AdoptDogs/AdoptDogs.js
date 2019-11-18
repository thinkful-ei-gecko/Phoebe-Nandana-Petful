import React, { Component } from "react";

import AdoptMain from "../../Components/AdoptMain/AdoptMain";
import ApiContext from "../../Contexts/ApiContext";

export default class adoptDog extends Component {
	static contextType = ApiContext;

	//pass list into adopt main
	render() {
    if (this.context.dogsList.length === 0) {
      return null;
    }
    else {
      return (
        <>
          <AdoptMain petType='Dogs' petList={this.context.dogsList} />
        </>
      );
    }
	}
}
