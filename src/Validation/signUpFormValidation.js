

import { regex } from "./regex"
import { calculateAge } from "../helpers/date"


   export function getFormValidation(watch) {
    return {
      name: {
              required: {value:true,message:"Name is Required"},
              minLength:{value:2 ,  message:"Name must be at least Two Characters"},
              maxLength:{value:30 , message:"Name must be at Most 30 Characters"},
              pattern:{value:regex.name }
            },

      email:{
              required: { value:true,message:"Email is Required"},
              pattern:{value: regex.email ,  message:"Enter Valid Email"},
            },


      password:{
                required: { value:true,message:"Password is Required"},
                pattern:{value: regex.password ,message:"Minimum eight Characters,at least one letter and one number"}
                },

        rePassword:{
             required: { value:true,message:"Confirm Password is Required"},
             validate: (value)=> value == watch("password") || "Password and confirm Password must be Same" 
        },
        gender:{
            required: { value:true,message:"Gender is Required"},
            validate: (gender) => gender =="male" || gender =="female"||"Gender must be Male or Female"
        },

        dateOfBirth:{
             required: { value:true,message:"Birth date is Required"},
            validate: (date)=> { return calculateAge(date) >= 18 || "Age must be more than or equal to 18" }
        }

    }
   }