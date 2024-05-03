import React from 'react'

function GridBox({ header, info }) {
  return (
    <div className='h-20 w-80 border border-1 rounded-lg border-slate-300 px-2 pt-2 hover:border-slate-400 hover:border-2'>
        <p className='font-semibold'>{header}</p>
        <p className='text-sm '>{info}</p>
    </div>
  )
}

export default GridBox