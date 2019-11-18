import React, { Component } from "react";

import AdoptMain from "../../Components/AdoptMain/AdoptMain";
import ApiContext from "../../Contexts/ApiContext";

export default class adoptCat extends Component {
	static contextType = ApiContext;

	//pass list into adopt main
	render() {
    if (this.context.catsList.length === 0) {
      return null;
    }
    else {
      return (
        <>
          <AdoptMain petType='Cats' petList={this.context.catsList} />
        </>
      );
    }
	}
}
