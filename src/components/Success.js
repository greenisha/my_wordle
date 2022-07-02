import React from 'react'

function Success({shown,setshown}) {
  const handleclose = ()=>setshown(false)
  return (
      <>
      {(shown === true) ? <div className='success  flex items-center border-2 justify-center bg-white text-3xl text-center' onClick={handleclose}>Поздравляю, Вы угадали!<br/>Следующее слово завтра</div>:null}
    </>
  )
}

export default Success