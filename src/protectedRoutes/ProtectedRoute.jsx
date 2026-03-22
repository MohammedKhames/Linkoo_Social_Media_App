
import React from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../contexts/authContext'


export default function ProtectedRoute({children}) {

  const {UserToken}=useContext(authContext) 

  const isLoggedIn = !!UserToken

  return (
    <div>
      <h1>Protected Route</h1>
      {isLoggedIn ? children: <Navigate to={"/signin"}/>}
    </div>
  )
}
