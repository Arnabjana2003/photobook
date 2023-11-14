import React from 'react'

function Loading({label = "Loading"}) {
  return (
    <div className='fixed w-screen h-screen z-30 bg-zinc-800 opacity-70 flex justify-center'>
        <div className=' mt-8'>
            <p className='font-bold text-slate-100 text-lg'>{label}...</p>
        </div>
    </div>
  )
}

export default Loading