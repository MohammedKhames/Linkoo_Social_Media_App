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
import logo from '../assets/logo.png';


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
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* ─── Left Branding Panel ─── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden items-center justify-center"
           style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #a855f7 60%, #6366f1 100%)' }}>
        
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-300/10 rounded-full blur-2xl"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-white px-16 max-w-xl">
          <img src={logo} alt="Linkoo Logo" className="w-24 h-24 mb-10 object-contain drop-shadow-2xl rounded-2xl bg-white/10 p-2 backdrop-blur-sm" />
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Welcome back to<br/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Linkoo</span>
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed font-medium">
            Connect with friends, share moments, and explore what's happening around you. Your community is waiting.
          </p>
          
          {/* Floating stats */}
          <div className="mt-12 flex gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-indigo-200">Active Users</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-indigo-200">Posts Shared</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
              <p className="text-2xl font-bold">99%</p>
              <p className="text-sm text-indigo-200">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right Form Panel ─── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 bg-white dark:bg-slate-950">
        <div className="w-full max-w-lg">
          
          {/* Mobile logo (shown on small screens only) */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <img src={logo} alt="Linkoo Logo" className="w-16 h-16 mb-4 object-contain drop-shadow-md rounded-xl" />
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Sign In
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-base font-medium">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(signIn)} className="grid gap-6">
            <Input 
              {...geInputProps("Email","email",errors.email)}  
              {...register("email")} 
              size="lg"
              classNames={{ 
                inputWrapper: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                label: "text-slate-600 dark:text-slate-400"
              }}
            />

            <Input 
              {...geInputProps("Password","password",errors.password)}  
              {...register("password")}
              size="lg"
              classNames={{ 
                inputWrapper: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                label: "text-slate-600 dark:text-slate-400"
              }}
            />

            {errMsg && (
              <Alert 
                hideIcon 
                color="danger" 
                title={errMsg} 
                variant="flat" 
                classNames={{base:"py-3 capitalize text-center rounded-xl"}} 
              />
            )}

            <Button 
              isLoading={isLoading} 
              type="submit" 
              className="w-full font-bold text-base py-7 mt-2 rounded-xl transition-all duration-300 ease-out
                         bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                         text-white shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 
                         hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
            </Button>
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>

            <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-400"> 
              Don't have an account?{' '}
              <Link 
                to={"/signup"} 
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors duration-200"
              >
                Create one
              </Link>
            </p>
          </form>

        </div>
      </div>

    </div>
  )
}
