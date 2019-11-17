import React, { Component } from 'react';

import AdoptMain from '../../Components/AdoptMain/AdoptMain';
import ApiContext from '../../Contexts/ApiContext'

export default class adoptDog extends Component {
  static contextType = ApiContext;
  
  //pass list into adopt main
  render() {
    console.log('%%%%%%%',this.context.dogList)
    return (
      <>
      <AdoptMain petType='dogs' petList={this.context.dogList}/>
        {/* <AdoptMain petType='Dog' petList={this.context.dogList} /> */}
      </>
    )
  }
}