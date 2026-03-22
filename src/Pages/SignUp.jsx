
import { useState } from 'react';
import {SelectItem, Select,Button, Input,Alert, addToast} from '@heroui/react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../Validation/RegisterSchema'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiServices } from '../services/apiServices';



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
        password:"Mohammed123",
        rePassword:"Mohammed123",
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
        
        console.log(data)
        localStorage.token=data.token;

        // taoster
        addToast({
          title:"Success",
          description:"Account Created Successfully",
          color:"success",
        })

        // navigate to signin if success
        navigate("/signin")

        
      }catch(error){
        if(error.message){
           setErrMsg(error.response.data.error);

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
   <form onSubmit={handleSubmit(signUp)}>

     <div className="grid gap-4">
      
      <div className='grid gap-3 text-center'>
          <h1 className='text-3xl font-bold'> Join Us Today</h1>
          <p> Create your account and start Connecting</p>
      </div>

      <Input {...geInputProps("Full Name","text",errors.name)}  
             {...register("name",)} />

      <Input {...geInputProps("Email","email",errors.email)}  
             {...register("email",)} />

      <Input {...geInputProps("Password","password",errors.password)}  
             {...register("password",)}/>

      <Input {...geInputProps("Confirm Password","password",errors.rePassword)}  
             {...register("rePassword",)}/> 

      <Input {...geInputProps("Birth Date","date",errors.dateOfBirth)}  
             {...register("dateOfBirth",)}/> 
 
       <Select{...geInputProps("Gender",undefined,errors.gender)}  
              {...register("gender",)}>
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
      </Select> 


      <Button isLoading={isLoading} type="submit" color="primary" variant='solid'>Sign Up</Button>

      <p> Alraedy have an Account? <Link to={"/signin"}> Login Now </Link></p>
     {errMsg &&  <Alert hideIcon color="danger" title={errMsg} variant="faded" classNames={{base:"py-0 capitalize text-center"}} />}
  
    
    </div>
   </form>
  )
}
