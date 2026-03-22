import React from 'react'
import { Outlet } from 'react-router-dom'


export default function AuthLayout() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
       <div className='border-2 border-gray-500 px-4 py-8 rounded-2xl w-100 shadow-2xl'>

        <Outlet/>
      
       </div>
    </div>
  )
}
