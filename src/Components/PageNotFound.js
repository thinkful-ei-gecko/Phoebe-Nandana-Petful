import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound () {
  return (
    <>
      <header>
        <h1>FIDO & FIFO ADOPTION</h1>
      </header>
      <h2>Ruh Roh! Where'd it go?</h2>
      <p>Looks like your url doesn't match any of our pages. Try going back, or click <Link to='/'>here</Link> to go home.</p>
    </>
  )
}