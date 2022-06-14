import React from 'react'


function Key({letter,onPress,getStatus}) {
const handlePress = ()=>onPress(letter);
  const color = getStatus(letter);
  // console.log(color);
  const addStyle = { backgroundColor: color };
  return (
    <button onClick={handlePress} className=' h-20 border-2 text-2xl uppercase rounded-sm p-1 m-1 border-gray-600 self-center flex items-center justify-center  ' style={addStyle}>{letter}</button>
  )
}

export default Key