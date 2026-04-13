import React from 'react'

export default function PostBody({caption, image}) {
  return (
    <div>
      <h3 className="text-[1.1rem] leading-relaxed text-slate-800 font-normal dark:text-slate-200 mt-2 mb-4">
            {caption}
          </h3>
          <div className="pb-4">
            { image && <img className='w-full object-cover rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 max-h-[500px]' src={image}/>}           
          </div>
    </div>
  )
}
