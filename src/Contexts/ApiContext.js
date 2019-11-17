import React,{ Component }  from 'react';

const ApiContext = React.createContext({
  catList: [],
  dogList: [],
  humanList: [],
  setDogList:()=>{},
  enqueueHuman:() => {},
  dequeue:() => {},
})
export default ApiContext

