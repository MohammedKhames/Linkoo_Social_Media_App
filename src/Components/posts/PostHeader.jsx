import React, { useContext } from 'react'
import avatar from '/src/assets/avatar.png'
import { authContext } from '../../contexts/authContext'

export default function PostHeader({userName, userPhoto, deletePost, editPost, creatorId}) {

  const {user} = useContext(authContext)
  
  return (
     <div className="flex pb-6 items-center justify-between">
            <div className="flex">
              <a className="inline-block mr-4" href="#">
                <img onError={(e)=>e.target.src=avatar} className="rounded-full max-w-none w-12 h-12 object-cover" src={userPhoto} />
              </a>
              <div className="flex flex-col">
                <div>
                  <a className="inline-block text-lg font-bold dark:text-white" href="#">{userName}</a>
                </div>
                <div className="text-slate-500 dark:text-slate-300">
                  July 17, 2018
                </div>
              </div>
            </div>
            {creatorId == user?._id && (
              <div className="flex gap-2">
                <button
                  onClick={editPost}
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={deletePost}
                  className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
  )
}

