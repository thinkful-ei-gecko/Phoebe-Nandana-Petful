import React from 'react';

export default React.createContext({
  catList: [],
  dogList: [],
  humanList: [],
  enqueueHuman: () => {},
  dequeue: () => {},
})