import React from 'react'
import Word from './Word';

function WordContainer({words,getStatus}) {
    
  return (
    <div className='lg:w-3/4 sm:w-full h-2/3  mx-auto container border-2 grid words'>
        {Object.values(words).map((word,id)=>{return <Word key={id} id={id} getStatus={getStatus}  word={word}></Word>})}
    </div>
  )
}

export default WordContainer