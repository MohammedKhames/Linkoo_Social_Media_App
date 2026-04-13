import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
        <NavBar/>
        <Outlet/>
    </div>
  )
}
