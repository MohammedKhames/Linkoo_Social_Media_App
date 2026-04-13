
import { useState } from 'react';
import {SelectItem, Select,Button, Input,Alert, addToast} from '@heroui/react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../Validation/RegisterSchema'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiServices } from '../services/apiServices';
import logo from '../assets/logo.png';



export default function SignUp() {

  const [isLoading, setIsLoading]=useState(false)
  const [errMsg,setErrMsg] =useState("")
  const navigate = useNavigate()

    // handling form with react hook form
    const {handleSubmit,register,formState:{errors}} = useForm({
      resolver: zodResolver(schema),
      defaultValues:{
        name:"Mohammed Khamis",
        email:"mohammed@gmail.com",
        password:"Mohammed@123",
        rePassword:"Mohammed@123",
        dateOfBirth:'2000-07-12',
        gender:"male"
      }
    })



    // sending data to backend
    async function signUp(registerData){
      setIsLoading(true)
      setErrMsg("")

      try{

        await apiServices.signUp(registerData)

        // taoster
        addToast({
          title:"Success",
          description:"Account Created Successfully",
          color:"success",
        })

        // navigate to signin if success
        navigate("/signin")

        
      }catch(error){

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
           style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 30%, #4f46e5 60%, #7c3aed 100%)' }}>
        
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-violet-300/10 rounded-full blur-2xl"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-white px-16 max-w-xl">
          <img src={logo} alt="Linkoo Logo" className="w-24 h-24 mb-10 object-contain drop-shadow-2xl rounded-2xl bg-white/10 p-2 backdrop-blur-sm" />
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Start your journey with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">Linkoo</span>
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed font-medium">
            Create your account and join a vibrant community. Share your stories, connect with friends, and discover what's trending.
          </p>
          
          {/* Feature highlights */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🚀</div>
              <div>
                <p className="font-bold text-sm">Quick Setup</p>
                <p className="text-xs text-indigo-200">Get started in under a minute</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🔒</div>
              <div>
                <p className="font-bold text-sm">Secure & Private</p>
                <p className="text-xs text-indigo-200">Your data is safe with us</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🌐</div>
              <div>
                <p className="font-bold text-sm">Global Community</p>
                <p className="text-xs text-indigo-200">Connect with people worldwide</p>
              </div>
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
              Create Account
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-base font-medium">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(signUp)} className="grid gap-5">
            
            {/* Name & Email row on larger screens */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Input 
                {...geInputProps("Full Name","text",errors.name)} 
                {...register("name")} 
                size="lg"
                classNames={{ 
                  inputWrapper: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                  label: "text-slate-600 dark:text-slate-400"
                }} 
              />
              <Input 
                {...geInputProps("Email","email",errors.email)} 
                {...register("email")} 
                size="lg"
                classNames={{ 
                  inputWrapper: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                  label: "text-slate-600 dark:text-slate-400"
                }} 
              />
            </div>

            {/* Password row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Input 
                {...geInputProps("Password","password",errors.password)} 
                {...register("password")} 
                size="lg"
                classNames={{ 
                  inputWrapper: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                  label: "text-slate-600 dark:text-slate-400"
                }} 
              />
              <Input 
                {...geInputProps("Confirm Password","password",errors.rePassword)} 
                {...register("rePassword")} 
                size="lg"
                classNames={{ 
                  inputWrapper: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                  label: "text-slate-600 dark:text-slate-400"
                }} 
              />
            </div>

            {/* Birth Date & Gender row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Input 
                {...geInputProps("Birth Date","date",errors.dateOfBirth)} 
                {...register("dateOfBirth")} 
                size="lg"
                classNames={{ 
                  inputWrapper: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                  label: "text-slate-600 dark:text-slate-400"
                }} 
              />
              <Select 
                {...geInputProps("Gender",undefined,errors.gender)} 
                {...register("gender")} 
                size="lg"
                classNames={{ 
                  trigger: "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-14 rounded-xl",
                  label: "text-slate-600 dark:text-slate-400"
                }}
              >
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
              </Select>
            </div>

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
                         bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 
                         text-white shadow-lg shadow-violet-600/25 hover:shadow-xl hover:shadow-violet-600/30 
                         hover:-translate-y-0.5 active:translate-y-0"
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-1">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>

            <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-400"> 
              Already have an account?{' '}
              <Link 
                to={"/signin"} 
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors duration-200"
              >
                Log in here
              </Link>
            </p>
          </form>

        </div>
      </div>

    </div>
  )
}
