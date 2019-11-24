import React, { Component } from "react";
import ApiContext from '../../Contexts/ApiContext'

export default class Line extends Component {
  static contextType = ApiContext;
  
  formatList = () => {
    return (
      <>
        {this.context.humanList.map((person, index) => {
          return <li key={index}>{person.name}</li>
        })}
      </>
    )
  }
render(){
  console.log(this.context.humanList.length)

  return(
    <>
    <h3>Current Line</h3>
    <ol>
      {this.formatList()}
    </ol>
  </>
  )
}
}

    