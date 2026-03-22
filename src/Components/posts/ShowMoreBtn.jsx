import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowMoreBtn({postId}) {
  return (
   
    <div className="w-full">
        
        <Link to={"/post/" + postId} className="py-3 px-4 w-full block bg-slate-300 dark:bg-slate-700 text-center rounded-lg 
        font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">
            Show More Comments

        </Link>
    </div>
  )
}
