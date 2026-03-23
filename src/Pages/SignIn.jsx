import React, { useContext } from 'react'
import { useState } from 'react';
import {Button, Input,Alert} from '@heroui/react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../Validation/LoginSchema'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { authContext } from '../contexts/authContext';
import { apiServices } from '../services/apiServices';





export default function SignIn() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading]=useState(false)
  const [errMsg,setErrMsg] =useState("")
  const {setUserToken}=useContext(authContext) 

    // handling form with react hook form
    const {handleSubmit,register,formState:{errors}} = useForm({
      resolver: zodResolver(schema),
      defaultValues:{
        email:"mohammed@gmail.com",
        password:"Mohammed@123",
      }
    })

    // sending data to backend
    async function signIn(loginData){
      setIsLoading(true)
      setErrMsg("")
      try{

        const data=await apiServices.signIn(loginData)

        localStorage.setItem("token", data.data.token)

        apiServices.setToken(data.data.token)  // ← تحديث التوكن داخل apiServices فوراً

        setUserToken(data.data.token)

        navigate("/") 

        
      }catch(error){
        
        console.log(error.response)

        if(error.response){

           setErrMsg(error.response.data.errors);

        }else{
          setErrMsg(error.message)
        } 

      }
      finally{

          setIsLoading(false)
      }
    
      
    }

    function geInputProps(label, type, field){
      return {
            variant: 'bordered',
            label,
            type,
            isInvalid: !!field,
            errorMessage: field?.message
        }
    }


   

  return (
   <form onSubmit={handleSubmit(signIn)}>

     <div className="grid gap-4">
      
      <div className='grid gap-3 text-center'>
          <h1 className='text-3xl font-bold'> Welcome Back</h1>
          <p> Sign in to continue your Journy</p>
      </div>

     

      <Input {...geInputProps("Email","email",errors.email)}  
             {...register("email",)} />

      <Input {...geInputProps("Password","password",errors.password)}  
             {...register("password",)}/>


      <Button isLoading={isLoading} type="submit" color="primary" variant='solid'>Sign in</Button>
      <p> You don't have an Account? <Link to={"/signup"}> Create one Now </Link></p>
     {errMsg &&  <Alert hideIcon color="danger" title={errMsg} variant="faded" classNames={{base:"py-0 capitalize text-center"}} />}
  
    
    </div>
   </form>
  )
}
