import { FaBackspace } from 'react-icons/fa'
import React from 'react'

function Backspace({onPress}) {
  return (
    <button onClick={onPress} className=' h-12 bg-slate-500 border-2 rounded-sm p-1 m-1 border-red-600 self-center flex items-center justify-center   '><FaBackspace size={'2rem'} /></button>
  )
}

export default Backspace