import React from 'react'

function Selector({mode,setMode,newMode}) {
  const setModeHandler = ()=>setMode(newMode);
    const addClass = (newMode === mode) ? 'mode-inactive' : 'mode-active';
    return (
    <button className={`selector m-2 px-2 bg-slate-200 ${addClass}`} onClick={setModeHandler}>{newMode}</button>
  )
}

export default Selector