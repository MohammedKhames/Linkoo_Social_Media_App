import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import MobileNav from '../Components/MobileNav'

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 pb-16 lg:pb-0'>
        <NavBar/>
        <Outlet/>
        <MobileNav />
    </div>
  )
}
