import React from 'react'
import Backspace from './Backspace'
import Enter from './Enter'
import Key from './Key'

function Keyboard({ onKey: pressLetter, onBackspace,onEnter,getStatus}) {
  const rows=[
    [...'йцукенгшщзхъ'],
    [...'фывапролджэ'],
    [...'ячсмитьбю']
  ]
  return (
      <div className='lg:w-3/4 sm:w-full h-1/4  mx-auto border-2 keyboard'>
      <div className='keyboard-row-1'>  {rows[0].map((letter,index) => { return <Key key={'2' + index} getStatus={getStatus} onPress={pressLetter} letter={letter}></Key>})}</div>
      <div className='keyboard-row-2 '>  {rows[1].map((letter, index) => { return <Key key={'2' + index} getStatus={getStatus} onPress={pressLetter} letter={letter}></Key>})}</div>
      <div className='keyboard-row-3 '><Backspace onPress={onBackspace} />  {rows[2].map((letter, index) => { return <Key key={'2' + index} getStatus={getStatus} onPress={pressLetter} letter={letter}></Key>})} <Enter onPress={onEnter}/></div>
        
        
      </div>
  )
}

export default Keyboard