import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'
import WordContainer from './WordContainer'
import wordsBank from '../words';
import Success from './Success';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//3482
function Game() {
  const [status, setstatus] = useState([]);
  const [word, setword] = useState('');
  const [success, setsuccess] = useState(false);
  const defaultWord = '     ';
  useEffect(() => {
    setword(wordsBank[Math.floor(Math.random() * 3482)]);
  }, [])

  const [words, setwords] = useState({
    0: [...defaultWord], 1: [...defaultWord], 2: [...defaultWord]
    , 3: [...defaultWord], 4: [...defaultWord], 5: [...defaultWord]
  });
  const [position, setposition] = useState({ wordPosition: 0, letterPosition: 0 })
  const pressLetter = (letter) => {

    const { wordPosition, letterPosition } = position;
    if (letterPosition >= 5) return;
    if (wordPosition>=6) return;
    const newWord = { ...words[wordPosition], [letterPosition]: letter };
    const newWords = { ...words, [wordPosition]: newWord };
    console.log(newWord, newWords);

    setwords(newWords);
    setposition({ wordPosition, letterPosition: letterPosition + 1 });
  };
  const pressBackspace = () => {
    const { wordPosition, letterPosition } = position;
    if (letterPosition === 0) return;
    const newWord = { ...words[wordPosition], [letterPosition - 1]: ' ' };
    const newWords = { ...words, [wordPosition]: newWord };
    setwords(newWords);
    setposition({ wordPosition, letterPosition: letterPosition - 1 });
  };
  const pressEnter = () => {
    const { wordPosition, letterPosition } = position;
    if (wordPosition > 5) {
      toast('попытки закончились, увы');
      return;
    }
    if (letterPosition !== 5) {
      toast('Слово должно содержать 5 букв!');
      return;
    }
    
    const currentWord = Object.values(words[wordPosition]).join("");
    if (!wordsBank.includes(currentWord)) {
      toast('Не знаю такого слова');
      return;
    }
    console.log(currentWord, word);
    if (currentWord === word) {
      setsuccess(true);
    }
    const wordArr = [...word];

    const newstatus = Object.values(words[wordPosition]).map((letter, index) => {
      if (wordArr[index] === letter) {
        return { letter: letter, color: 'green', wordPosition: wordPosition, letterPosition: index };
      }
      if (wordArr.includes(letter)) {
        return { letter: letter, color: 'yellow', wordPosition: wordPosition, letterPosition: index };
      }
      return { letter: letter, color: 'grey', wordPosition: wordPosition, letterPosition: index };

    });
    setstatus([...status, ...newstatus]);
    console.log([...status, ...newstatus]);
    setposition({ wordPosition: wordPosition + 1, letterPosition: 0 });


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
    <div className='h-screen '>
      <WordContainer words={words} getStatus={getStatus}></WordContainer>
      <Keyboard onKey={pressLetter} getStatus={getStatus} onBackspace={pressBackspace} onEnter={pressEnter}></Keyboard>
      <Success shown={success} />
      <ToastContainer />
    </div>
  )
}

export default Game