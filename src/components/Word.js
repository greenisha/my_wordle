import React from 'react'
import WordLetter from './WordLetter';

function Word({word,id:wid,getStatus}) {
    const letters = word;
    const lettersObj = Object.values(letters).map((letter,id) => <WordLetter key={wid+'_'+id} wordPosition={wid} letterPosition={id}  getStatus={getStatus} letter={letter} />);
    //console.log(letters,lettersObj);
  return (
    <div className='h-full word'>
        {lettersObj}
        </div>
  )
}

export default Word