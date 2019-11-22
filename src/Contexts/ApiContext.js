import React, { Component } from 'react';

const ApiContext = React.createContext({
  catsList: [],
  dogsList: [],
  humanList: [],
  petType: '',
  setDogList:()=>{},
  setHumanList:() => {},
  dequeue:() => {},
  setPetType:()=>{}
})
export default ApiContext

export class ApiProvider extends Component {
  constructor(props) {
    super(props);
    const state = {catsList: [], dogsList: [], humanList: [] };
    this.state = state;
  }

  setHumanList = humanList => {
		this.setState({ humanList });
};

setCatList = catsList => {
  this.setState({ catsList });
};

setDogList = dogsList => {
  this.setState({ dogsList });
};
setPetType = petType=> {
  this.setState({ petType });
};


render(){

  const value = {
    catsList: this.state.catsList,
    dogsList: this.state.dogsList,
    humanList: this.state.humanList,
    petType:this.state.petType,
    setDogList: this.setDogList,
    setCatList: this.setCatList,
    setHumanList: this.setHumanList,
    setPetType:this.setPetType
  };

return(
  <ApiContext.Provider value={value}>
  {this.props.children}
</ApiContext.Provider>
  )
}
}