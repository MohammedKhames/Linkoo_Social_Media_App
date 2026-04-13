import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowMoreBtn({postId}) {
  return (
   
    <div className="w-full">
        
        <Link to={"/post/" + postId} className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-800 text-center rounded-xl 
        font-semibold text-sm text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all ease-in-out duration-200">
            Show More Comments

        </Link>
    </div>
  )
}
