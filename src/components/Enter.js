import React from 'react'
import { FaCheck } from 'react-icons/fa'

function Enter({onPress}) {
  return (
      <button onClick={onPress} className=' h-12 bg-slate-500 border-2 rounded-sm p-1 m-1 border-green-600 self-center flex items-center justify-center  '><FaCheck size={'2rem'}/></button>
  )
}

export default Enter