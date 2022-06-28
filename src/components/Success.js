import React from 'react'

function Success({shown}) {
  return (
      <>
      {(shown === true) ? <div className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-white text-3xl text-center'>Поздравляю, Вы угадали!<br/>Обновите страницу, чтобы сыграть еще раз</div>:null}
    </>
  )
}

export default Success