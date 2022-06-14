import React from 'react'

function Success({shown}) {
  return (
      <>
      {(shown===true)?<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white text-8xl text-center'>Success</div>:null}
    </>
  )
}

export default Success