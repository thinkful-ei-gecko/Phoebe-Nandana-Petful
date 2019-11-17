import React from 'react';

export default function Line (props) {
  const formatList = () => {
    return (
      <>
        {props.line.map((person, index) => {
          return <li key={index}>{person.name}</li>
        })}
      </>
    )
  }

  return (
    <>
      <h3>Current Line</h3>
      <ol>
        {formatList()}
      </ol>
    </>
  )
}