import React from 'react'

function WordLetter({letter,getStatus,wordPosition,letterPosition}) {
  const color = getStatus(letter,wordPosition,letterPosition);
  
  // console.log(color); 
  const addStyle = { backgroundColor:color,transition:'background-color 2s'};
  return (
    <div className=  'w-full  h-full text-3xl uppercase rounded-lg p-3 flex items-center justify-center  border-fuchsia-50 border-2' style={addStyle} >{letter}</div>
  )
}

export default WordLetter