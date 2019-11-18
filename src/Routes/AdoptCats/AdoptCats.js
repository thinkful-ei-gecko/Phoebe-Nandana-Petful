import React, { Component } from "react";

import AdoptMain from "../../Components/AdoptMain/AdoptMain";
import ApiContext from "../../Contexts/ApiContext";

export default class adoptCat extends Component {
	static contextType = ApiContext;

	//pass list into adopt main
	render() {
    if (this.context.catList.length === 0) {
      return null;
    }
    else {
      console.log('catList passed in context in `AdoptCats`', this.context.catList);
      return (
        <>
          <AdoptMain petType='dog' petList={this.context.catList} />
        </>
      );
    }
	}
}
