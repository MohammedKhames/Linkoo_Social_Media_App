import React from 'react'

export default function PostBody({caption, image}) {
  return (
    <div>
      <h2 className="text-xl font-medium dark:text-white">
            {caption}
          </h2>
          <div className="py-4">
            { image && <img className='max-w-full rounded-lg' src={image}/>}           
          </div>
    </div>
  )
}
