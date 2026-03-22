import axios from "axios"



class ApiServices{


    // methods

    // #1 singin
    async signIn(loginData){

        const {data}=await axios.post("https://route-posts.routemisr.com/users/signin",loginData)
        return data;

    }



    // #2 signup
    async signUp(registerData){

        const {data}=await axios.post("https://route-posts.routemisr.com/users/signup",registerData)
        return data;

    }


    // #3 Feed Page ( all posts )
    async getPosts(){

     const {data} =await axios.get("https://route-posts.routemisr.com/posts",{
            headers:{
            token: localStorage.getItem("token")
            },
            params:{
                page:1
            }
        })

        return data;

    }



    // #4 Post Details


    async getPostDetails(){

      const {data} = await axios.get("https://route-posts.routemisr.com/posts" + postId,{
         headers: {
          token: localStorage.getItem("token")
        }
     

    })
    return data
  }




}
    



export const apiServices = new ApiServices()