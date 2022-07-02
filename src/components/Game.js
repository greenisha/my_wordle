import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'
import WordContainer from './WordContainer'
import wordsBank from '../words';
import wordsGuessBank from '../wordsGuess';
import Success from './Success';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//3482
function Game() {
  const [status, setstatus] = useState([]);
  const [word, setword] = useState('');
  const [success, setsuccess] = useState(false);
  const [shown, setshown] = useState(false);
  const [position, setposition] = useState({ wordPosition: 0, letterPosition: 0 })

  const defaultWord = '     ';
  const [words, setwords] = useState({
    0: [...defaultWord], 1: [...defaultWord], 2: [...defaultWord]
    , 3: [...defaultWord], 4: [...defaultWord], 5: [...defaultWord]
  });
  useEffect(() => {
    const firstday = new Date('2022-05-28');
    const currentDate = new Date();
    const daysPassed = Math.floor(((currentDate.getTime() - firstday.getTime()) / (1000 * 60 * 60 * 24)));
    console.log(wordsGuessBank[daysPassed]);
    // setword(wordsGuessBank[daysPassed]);
    setword('погон'); 
    //if (localStorage.getItem('day') === null || localStorage.getItem('day')!==daysPassed.toString())
    if(true)
    {
      console.log('clear');
      localStorage.clear();
      localStorage.setItem('day', daysPassed);
    }
    else
    {
      if (localStorage.getItem('status')!==null)
      setstatus(JSON.parse(localStorage.getItem('status')));
      if (localStorage.getItem('words') !== null)
      setwords(JSON.parse(localStorage.getItem('words')));
      if (localStorage.getItem('position') !== null)
        setposition(JSON.parse(localStorage.getItem('position')));
      if (localStorage.getItem('success') !== null)
      {
        setsuccess(JSON.parse(localStorage.getItem('success')));
        setshown(JSON.parse(localStorage.getItem('success')));
      }
      localStorage.setItem('day', daysPassed);
    }
  }, [])

  
  const pressLetter = (letter) => {
    if(success)
    return
    const { wordPosition, letterPosition } = position;
    if (letterPosition >= 5) return;
    if (wordPosition>=6) {
      toast(`попытки закончились, увы. Слово было ${word}`);
      return;
    }
    const newWord = { ...words[wordPosition], [letterPosition]: letter };
    const newWords = { ...words, [wordPosition]: newWord };
    console.log(newWord, newWords);

    setwords(newWords);
    setposition({ wordPosition, letterPosition: letterPosition + 1 });
    localStorage.setItem('position', JSON.stringify({ wordPosition, letterPosition:letterPosition  + 1 }));
    localStorage.setItem('words', JSON.stringify(newWords));

  };
  const pressBackspace = () => {
    if (success)
      return
    const { wordPosition, letterPosition } = position;
    if (letterPosition === 0) return;
    const newWord = { ...words[wordPosition], [letterPosition - 1]: ' ' };
    const newWords = { ...words, [wordPosition]: newWord };
    setwords(newWords);
    setposition({ wordPosition, letterPosition: letterPosition - 1 });
    localStorage.setItem('position', JSON.stringify({ wordPosition, letterPosition:letterPosition-1 }));
    localStorage.setItem('words', JSON.stringify(newWords));
  };
  const pressEnter = () => {
    if (success)
      return
    const { wordPosition, letterPosition } = position;
    if (wordPosition > 5) {
      toast(`попытки закончились, увы. Слово было ${word}` );
      return;
    }
    if (letterPosition !== 5) {
      toast('Слово должно содержать 5 букв!');
      return;
    }
    
    var currentWord = Object.values(words[wordPosition]).join("");
    if (!wordsBank.includes(currentWord)) {
      toast('Не знаю такого слова');
      return;
    }
    console.log(currentWord, word);
    if (currentWord === word) {
      setsuccess(true);
      setshown(true);
      localStorage.setItem('success', JSON.stringify(true));
    }
    const wordArr = [...word];
    let haveLetters = [];
    let newstatus = [];
    Object.values(words[wordPosition]).forEach((letter, index) => {
      if (wordArr[index] === letter) {
        wordArr[index]=' ';
        newstatus.push({ letter: letter, color: 'green', wordPosition: wordPosition, letterPosition: index });
      }
    });

    Object.values(words[wordPosition]).forEach((letter, index) => {
      if (wordArr.includes(letter) && wordArr[index] !== letter && !haveLetters.find(([letterInner,positionInner])=>{
        console.log(letterInner, positionInner,letter,index);
        return ((letter === letterInner) && (positionInner===index)) 
      })) {
        newstatus.push({ letter: letter, color: 'yellow', wordPosition: wordPosition, letterPosition: index });
      }
      newstatus.push({ letter: letter, color: 'grey', wordPosition: wordPosition, letterPosition: index });

    });
    setstatus([...status, ...newstatus]);
    console.log([...status, ...newstatus]);
    setposition({ wordPosition: wordPosition + 1, letterPosition: 0 });
    localStorage.setItem('position',JSON.stringify({wordPosition: wordPosition+1,letterPosition : 0}));
    localStorage.setItem('status', JSON.stringify([...status, ...newstatus]));

    if (wordPosition > 5) {
      toast(`попытки закончились, увы. Слово было ${word}`);
      return;
    }

  };
  const getStatus = (letter, wordPosition, letterPosition) => {
    if (wordPosition === undefined) {
      const foundGreen = status.find(item => { return (letter === item.letter && 'green' === item.color) });
      if (foundGreen) return foundGreen.color;
      const foundYellow = status.find(item => { return (letter === item.letter && 'yellow' === item.color) });
      if (foundYellow) return foundYellow.color;
      const found = status.find(item => { return (letter === item.letter) });
      if (found) return found.color;
      return 'white';
    }
    else {
      const found = status.find(item => { return (letter === item.letter && wordPosition === item.wordPosition && letterPosition === item.letterPosition) });
      if (found) return found.color;
      return 'white';
    }

  };


  return (
    <div className='all container mx-auto'>
      <div className='header text-center text-3xl ' >Вордли</div>
      <div className='body'>
      <WordContainer words={words} getStatus={getStatus}></WordContainer>
      <Keyboard onKey={pressLetter} getStatus={getStatus} onBackspace={pressBackspace} onEnter={pressEnter}></Keyboard>
      <Success shown={shown} setshown={setshown} />
        <ToastContainer />
      </div>
      </div>
    
  )
}

export default Game