import React from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../contexts/authContext'
import { useContext } from 'react'


export default function ProtectedAuthRoute({children}) {

    const {userToken}=useContext(authContext) 
  
    const isLoggedIn = !!userToken
  return (
      <div>
      {isLoggedIn ? <Navigate to={"/"}/> :  children}
    </div>
  )
}
