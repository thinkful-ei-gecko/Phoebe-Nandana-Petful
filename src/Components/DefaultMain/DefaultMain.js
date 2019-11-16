import React from 'react';
import { Route } from 'react-router-dom'

import HomeMain from '../../Routes/HomeMain/HomeMain';
import SignUpMain from '../../Routes/SignupMain/SignupMain';

export default function DefaultMain () {
  return (
    <div className='DefaultMain__div'>
      <header className='DefaultMain-header'>
				<h1>FIDO & FIFO ADOPTION</h1>
			</header>
      {
        <>
          <Route exact path='/' component={HomeMain}></Route>
          <Route exact path='/signup' component={SignUpMain}></Route>
        </>
      } 
    </div>
  )
}