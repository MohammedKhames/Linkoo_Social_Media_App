import React from 'react'
import { authContext } from '../contexts/authContext'


export default function ProtectedAuthRoute({children}) {

    const {UserToken}=useContext(authContext) 
  
    const isLoggedIn = !!UserToken
  return (
      <div>
      <h1> Protected Auth Route</h1>
      {isLoggedIn ? <Navigate to={"/"}/> :  children}
    </div>
  )
}
