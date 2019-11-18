import React  from 'react';

const ApiContext = React.createContext({
  catsList: [],
  dogsList: [],
  humanList: [],
  setDogList:()=>{},
  enqueueHuman:() => {},
  dequeue:() => {},
})
export default ApiContext

