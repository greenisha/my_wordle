import React, { useEffect, useState } from 'react'
import Keyboard from './Keyboard'
import WordContainer from './WordContainer'
import wordsBank from '../wordsBank';
import wordsGuessBank from '../wordsGuess';
import Success from './Success';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Selector from './Selector';
//3482
function Game() {
  const [status, setstatus] = useState([]);
  const [mode,setMode] = useState(5);
  const [word, setword] = useState('');
  const [success, setsuccess] = useState(false);
  const [shown, setshown] = useState(false);
  const [position, setposition] = useState({ wordPosition: 0, letterPosition: 0 })

  const defaultWordArray = [...new Array(mode)].map(value=>value??' ');
  const [words, setwords] = useState({
    0: defaultWordArray.slice(), 1: defaultWordArray.slice(), 2: defaultWordArray.slice()
    , 3: defaultWordArray.slice(), 4: defaultWordArray.slice(), 5: defaultWordArray.slice()
  });
  useEffect(() => {
    const firstday = new Date('2022-07-05');
    const currentDate = new Date();
    const daysPassed = Math.floor(((currentDate.getTime() - firstday.getTime()) / (1000 * 60 * 60 * 24)));
    console.log(wordsGuessBank['letter_'+mode][daysPassed]);
    setword(wordsGuessBank['letter_'+mode][daysPassed]);
    //setword('погон'); 
    if (localStorage.getItem('day') === null || localStorage.getItem('day')!==daysPassed.toString())
    {
      console.log('clear');
      localStorage.clear();
      localStorage.setItem('day', daysPassed);
    }
    else
    {
      //initial

      if (localStorage.getItem('status'+mode)!==null)
      setstatus(JSON.parse(localStorage.getItem('status'+mode)));
      else
      setstatus([]);
      if (localStorage.getItem('words' + mode) !== null)
      setwords(JSON.parse(localStorage.getItem('words'+mode)));
      else
      {
        const defaultWordArray = [...new Array(mode)].map(value => value ?? ' ');
        setwords({
          0: defaultWordArray.slice(), 1: defaultWordArray.slice(), 2: defaultWordArray.slice()
          , 3: defaultWordArray.slice(), 4: defaultWordArray.slice(), 5: defaultWordArray.slice()
        });
      }
      if (localStorage.getItem('position' + mode) !== null)
        setposition(JSON.parse(localStorage.getItem('position'+mode)));
      else
        setposition({ wordPosition: 0, letterPosition: 0 });
      if (localStorage.getItem('mode') !== null)
       setMode(JSON.parse(localStorage.getItem('mode')));

      if (localStorage.getItem('success' + mode) !== null)
      {
        setsuccess(JSON.parse(localStorage.getItem('success'+ mode)));
        setshown(JSON.parse(localStorage.getItem('success'+ mode)));
      }
      else
      {
        setsuccess(false);
        setshown(false);
      }

      localStorage.setItem('day', daysPassed);
    }
  }, [mode])

  
  const pressLetter = (letter) => {
    if(success)
    return
    const { wordPosition, letterPosition } = position;
    if (letterPosition >= mode) return;
    if (wordPosition>=6) {
      toast(`попытки закончились, увы. Слово было ${word}`);
      return;
    }

    const newWord = { ...words[wordPosition], [letterPosition]: letter };
    console.log(newWord);
    const newWords = { ...words, [wordPosition]: newWord };
    console.log(newWord, newWords);

    setwords(newWords);
    setposition({ wordPosition, letterPosition: letterPosition + 1 });
    localStorage.setItem('position' + mode, JSON.stringify({ wordPosition, letterPosition:letterPosition  + 1 }));
    localStorage.setItem('words' + mode, JSON.stringify(newWords));

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
    localStorage.setItem('position' + mode, JSON.stringify({ wordPosition, letterPosition:letterPosition-1 }));
    localStorage.setItem('words' + mode, JSON.stringify(newWords));
  };
  const pressEnter = () => {
    if (success)
      return
    const { wordPosition, letterPosition } = position;
    if (wordPosition > mode) {
      toast(`попытки закончились, увы. Слово было ${word}` );
      return;
    }
    if (letterPosition !== mode) {
      toast(`Слово должно содержать ${mode} букв!`);
      return;
    }
    
    var currentWord = Object.values(words[wordPosition]).join("");
    if (!wordsBank['letter_'+mode].includes(currentWord)) {
      toast('Не знаю такого слова');
      return;
    }
    console.log(currentWord, word);
    if (currentWord === word) {
      setsuccess(true);
      setshown(true);
      localStorage.setItem('success' + mode, JSON.stringify(true));
    }
    let wordArr = [...word];
    let newstatus = [];
    Object.values(words[wordPosition]).forEach((letter, index) => {
      if (wordArr[index] === letter) {
        wordArr[index]=' ';
        newstatus.push({ letter: letter, color: 'green', wordPosition: wordPosition, letterPosition: index });
      }
    });

    Object.values(words[wordPosition]).forEach((letter, index) => {
      if (wordArr.includes(letter) && wordArr[index] !== letter) {
        const foundIndex = wordArr.findIndex((item) => {return item===letter} );
        wordArr[foundIndex] = ' ';
        newstatus.push({ letter: letter, color: 'yellow', wordPosition: wordPosition, letterPosition: index });
      }
      newstatus.push({ letter: letter, color: 'grey', wordPosition: wordPosition, letterPosition: index });

    });
    setstatus([...status, ...newstatus]);
    console.log([...status, ...newstatus]);
    setposition({ wordPosition: wordPosition + 1, letterPosition: 0 });
    localStorage.setItem('position' + mode,JSON.stringify({wordPosition: wordPosition+1,letterPosition : 0}));
    localStorage.setItem('status' + mode, JSON.stringify([...status, ...newstatus]));

    if (wordPosition > 5) {
      toast(`Попытки закончились, увы. Слово было ${word}`);
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
  const setModeStorage = (mode)=>
  {
    setMode(mode);
    localStorage.setItem('mode',mode);
  }


  return (
    <div className='all container mx-auto'>
      <div className='header text-center text-3xl ' >Вордли <Selector setMode={setModeStorage} mode={mode} newMode={5} /><Selector setMode={setModeStorage} mode={mode} newMode={6} /><Selector setMode={setModeStorage} mode={mode} newMode={7} /></div>
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