import axios from "axios"



class ApiServices{

    // property

    #token=localStorage.getItem("token");

    // methods

    setToken(token){
        this.#token =token;
    }

    // #1 singin
    async signIn(loginData){

        const {data}=await axios.post(import.meta.env.VITE_BASE_URL + "/users/signin",loginData)
        return data;

    }



    // #2 signup
    async signUp(registerData){

        const {data}=await axios.post(import.meta.env.VITE_BASE_URL + "/users/signup",registerData)
        return data;

    }


    // #3 Feed Page ( all posts )
    async getPosts(){

     const {data} =await axios.get(import.meta.env.VITE_BASE_URL + "/posts",{
            headers:{
            token: this.#token
            },
            params:{
                // page:1,
                // sort:"createdAt"
            }
        })

        return data;

    }



    // #4 Post Details
    async getPostDetails(postId){

      const {data} = await axios.get(import.meta.env.VITE_BASE_URL + "/posts/" + postId,{
         headers: {
          token: this.#token
        }
     

    })
    return data
  }


  // #5 GetLoggedUserData
  async getLoggedUserData(){

    const {data} =await axios.get( import.meta.env.VITE_BASE_URL +"/users/profile-data",{
        headers:{
            token:this.#token
        }
    })
    return data
  }


  // #6 getPost Comments

  async getPostComments(postId){
    const {data} = await axios.get(import.meta.env.VITE_BASE_URL +`/posts/${postId}/comments?page=1&limit=10`,{
        headers:{
            token:this.#token
        }
    })
    return data
  }

  // #7 create post

 async createPost(formData){

     const {data} =await axios.post(import.meta.env.VITE_BASE_URL + "/posts",formData,{
            headers:{
            token: this.#token
            }
           
        })

        return data;

    }




  // #8 Create Comment
  async createComment(postId, formData){
    const {data} = await axios.post(import.meta.env.VITE_BASE_URL + "/posts/" + postId + "/comments", formData, {
        headers:{
            token:this.#token
        }
    })

    return data;

  }

}
    



export const apiServices = new ApiServices()