import React, { useContext, useEffect, useState } from 'react'
import {
  Navbar as HerouiNavBar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Switch
} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/authContext';
import { apiServices } from '../services/apiServices';
import logo from '../assets/logo.png';

export default function NavBar() {

const navigate = useNavigate()
const {isLoading, userToken , userData,setUserToken, searchTerm, setSearchTerm} = useContext(authContext) 
const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const toggleTheme = (val) => {
  setIsDark(val);
  if (val) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

function logout(){
  localStorage.removeItem("token")
  setUserToken(null)
  navigate("/signin")
}


  return (
    <HerouiNavBar 
      maxWidth="xl" 
      className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl backdrop-saturate-150 shadow-sm shadow-slate-200/50 dark:shadow-slate-900/50" 
      position="sticky"
      height="4rem"
    >
      {/* ── Left Side: Logo ── */}
      <NavbarBrand className="basis-1/4">  
        <Link to={"/"} className="flex items-center gap-2.5 transition-all hover:opacity-80 group">
          <div className="relative">
            <img src={logo} alt="Linkoo Logo" className="w-9 h-9 object-contain rounded-xl drop-shadow-sm transition-transform group-hover:scale-105" />
          </div>
          <p className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent hidden sm:block">
            Linkoo
          </p>
        </Link>
      </NavbarBrand>

      {/* ── Center: Search Bar (appears if logged in) ── */}
      {!isLoading && userToken && (
        <NavbarContent className="hidden lg:flex basis-2/4" justify="center">
          <div className="relative w-full max-w-[480px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full py-2.5 pl-11 pr-4 text-sm text-slate-900 border border-slate-200/60 rounded-xl bg-slate-50/50 
                         focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-400 
                         dark:bg-slate-900/40 dark:border-slate-800 dark:placeholder-slate-600 dark:text-white 
                         transition-all duration-300 outline-none backdrop-blur-sm shadow-sm" 
              placeholder="Search conversations, posts, or people..." 
            />
            {/* Keyboard shortcut indicator */}
            <div className="absolute inset-y-0 right-3 hidden sm:flex items-center pointer-events-none">
                <kbd className="px-2 py-1 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500">
                    Search
                </kbd>
            </div>
          </div>
        </NavbarContent>
      )}

      {/* ── Right Side: Theme, Icons, Profile ── */}
     {!isLoading && <NavbarContent className="basis-1/4" justify="end">
      
      {/* Theme Toggle */}
      <div className="flex items-center">
        <button 
          onClick={() => toggleTheme(!isDark)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>

      {userToken ? (
        <div className="flex items-center gap-2">
          {/* Notifications Dropdown */}
          <NotificationsDropdown />

          {/* Home link */}

          {/* Home link */}
          <Link to="/" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 hidden sm:flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>

          {/* Profile Dropdown */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-all ring-2 ring-transparent hover:ring-indigo-500/50 ml-1"
                color="secondary"
                name={userData?.name}
                size="sm"
                src={userData?.photo}
              />
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Profile Actions" 
              variant="flat"
              className="w-64"
            >
              <DropdownItem key="profile-info" className="h-16 gap-2" textValue="Profile Info">
               <Link to="/profile" className="w-full flex flex-col">
                <p className="font-bold text-slate-800 dark:text-slate-200">{userData?.name}</p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 truncate">{userData?.email}</p>
               </Link>
              </DropdownItem>
              <DropdownItem key="profile" textValue="My Profile">
                <Link to="/profile" className="w-full flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout} className="text-danger" textValue="Log Out">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
           <Link to="/signin" className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">Log In</Link>
           <Link to="/signup" className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30">Sign Up</Link>
        </div>
      )}
      </NavbarContent>}
    </HerouiNavBar>
  )
}

function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const data = await apiServices.getNotifications()
      setNotifications(data.notifications || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button 
          onClick={fetchNotifications}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 flex items-center justify-center relative"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Notifications" 
        className="w-80"
        variant="flat"
      >
        <DropdownItem key="header" className="h-10 opacity-100 cursor-default" textValue="Notifications">
          <p className="font-bold text-slate-900 dark:text-white">Notifications</p>
        </DropdownItem>
        {loading ? (
            <DropdownItem key="loading" className="text-center" textValue="Loading...">Loading...</DropdownItem>
        ) : notifications.length === 0 ? (
            <DropdownItem key="empty" className="text-center text-slate-500" textValue="No notifications">No new notifications</DropdownItem>
        ) : (
            notifications.map((notif) => (
                <DropdownItem 
                  key={notif._id} 
                  description={new Date(notif.createdAt).toLocaleDateString()}
                  startContent={
                    <Avatar 
                      src={notif.fromUser?.photo} 
                      size="sm" 
                      name={notif.fromUser?.name}
                    />
                  }
                  textValue={notif.content}
                >
                  <span className="font-medium">{notif.content}</span>
                </DropdownItem>
            ))
        )}
      </DropdownMenu>
    </Dropdown>
  )
}
