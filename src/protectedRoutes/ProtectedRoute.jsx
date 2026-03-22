
import React from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../contexts/authContext'
import { useContext } from 'react'


export default function ProtectedRoute({children}) {

  const {userToken}=useContext(authContext) 

  const isLoggedIn = !!userToken

  return (
    <div>
      {isLoggedIn ? children: <Navigate to={"/signin"}/>}
    </div>
  )
}
