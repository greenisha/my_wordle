import React from 'react'


function Key({letter,onPress,getStatus}) {
const handlePress = ()=>onPress(letter);
  const color = getStatus(letter);
  // console.log(color);
  const addStyle = { backgroundColor: color };
  return (
    <button onClick={handlePress} className=' h-12 border-2 text-xl uppercase rounded-sm m-0.5 self-center flex items-center justify-center  ' style={addStyle}>{letter}</button>
  )
}

export default Key