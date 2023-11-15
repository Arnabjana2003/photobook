import React from 'react'

function Loading({label = "Loading", textSize = "xl", bold = "semibold"}) {
  return (
    <div className='fixed w-screen h-screen z-30 bg-zinc-800 opacity-70 flex items-center flex-col'>
      <div className='mt-10'>
      <div
  class="inline-block h-8 w-8 animate-spin rounded-full border-violet-400 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div>
      </div>
        <div className=' mt-8 px-3'>
            <p className={`font-${bold} text-slate-100 text-${textSize} `}>{label}.....</p>
        </div>
    </div>
  )
}

export default Loading