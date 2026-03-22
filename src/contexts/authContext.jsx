
import { createContext,useState } from "react"

export const authContext = createContext(0)

export default function AuthContextProvider({ children}){

    const [userToken, setUserToken]=useState(localStorage.getItem("token"))

    return <authContext.Provider value={ {useState,setUserToken}}>
        {children}
    </authContext.Provider>
}