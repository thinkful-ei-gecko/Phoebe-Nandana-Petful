import React  from 'react';

const ApiContext = React.createContext({
  catsList: [],
  dogsList: [],
  adoptersList: [],
  setDogList:()=>{},
  enqueueAdopter:() => {},
  dequeue:() => {},
})
export default ApiContext

