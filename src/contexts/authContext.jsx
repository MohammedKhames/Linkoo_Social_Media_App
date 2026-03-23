
import { createContext,useEffect,useState } from "react"
import { apiServices } from "../services/apiServices"




export const authContext = createContext()

export default function AuthContextProvider({ children}){

    const [userToken, setUserToken]=useState(localStorage.getItem("token"))
    const [isLoading, setIsLoading] =useState(false)
    const [userData, setUserData] =useState(null)
    const [user,setUser] =useState(null)

    async function getMyProfile(){
        const user = await apiServices.getMyProfile()
        setUser(user)
    }

    useEffect( () =>{
        if(userToken != null){

            apiServices.setToken(userToken)

            getLoggedUserData()

            getMyProfile()
        }
        
    },[userToken])




    async function getLoggedUserData() {

        setIsLoading(true)

        try{
            const  data = await apiServices.getLoggedUserData()
            setUserData(data.data.user);

        } catch(error){

            if(error.status == 401){
                localStorage.removeItem("token")
                setUserToken(null)
            }
        } finally{
            setIsLoading(false)
        }
        
    }



    return <authContext.Provider value={ {userToken,setUserToken,isLoading, userData,setUserData,user}}>
        {children}
    </authContext.Provider>
}