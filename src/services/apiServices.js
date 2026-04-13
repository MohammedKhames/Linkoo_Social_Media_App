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



  // #9 get my Profile
  async getMyProfile(){
    const {data} = await axios.get(import.meta.env.VITE_BASE_URL + "/users/profile-data",{
        headers:{
            token:this.#token
        }
    })
    return data.data.user
  }


// #10 delete post 
async deletePost(postId){
     const {data} = await axios.delete(import.meta.env.VITE_BASE_URL + "/posts/" + postId,{
        headers:{
            token:this.#token
        }
    })
    return data

}


// #11 delete comment 
async deleteComment(postId,commentId){
     const {data} = await axios.delete(import.meta.env.VITE_BASE_URL + "/posts/" + postId + "/comments/"+commentId,{
        headers:{
            token:this.#token
        }
    })
    return data

}


// #12 update comment 

async updateComment(postId,commentId,formData){
     const response= await axios.put(import.meta.env.VITE_BASE_URL + "/posts/" + postId + "/comments/"+commentId,formData,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    return response

}




// #13 update post
async updatePost(postId, formData){
  const {data} = await axios.put(import.meta.env.VITE_BASE_URL + "/posts/" + postId, formData, {
    headers:{
      token: this.#token
    }
  })
  return data
}

// #14 change password
async changePassword(formData){
  const {data} = await axios.patch(import.meta.env.VITE_BASE_URL + "/users/change-password", formData, {
    headers:{
      token: this.#token
    }
  })
  return data
}

// #15 get user posts
async getUserPosts(userId){
  const {data} = await axios.get(import.meta.env.VITE_BASE_URL + "/users/" + userId + "/posts", {
    headers:{
      token: this.#token
    }
  })
  return data
}

// #16 like post
async likePost(postId){
  const {data} = await axios.patch(import.meta.env.VITE_BASE_URL + "/posts/" + postId + "/like", {}, {
    headers:{
      token: this.#token
    }
  })
  return data
}

// #17 share post
async sharePost(postId){
  const {data} = await axios.patch(import.meta.env.VITE_BASE_URL + "/posts/" + postId + "/share", {}, {
    headers:{
      token: this.#token
    }
  })
  return data
}

// #18 get post likes
async getPostLikes(postId){
  const {data} = await axios.get(import.meta.env.VITE_BASE_URL + "/posts/" + postId + "/likes?page=1&limit=20", {
    headers:{
      token: this.#token
    }
  })
  return data
}

// #19 like comment
async likeComment(postId, commentId){
  const {data} = await axios.patch(import.meta.env.VITE_BASE_URL + "/posts/" + postId + "/comments/" + commentId + "/like", {}, {
    headers:{
      token: this.#token
    }
  })
  return data
}

// #20 get notifications
async getNotifications(){
  const {data} = await axios.get(import.meta.env.VITE_BASE_URL + "/notifications?unread=false&page=1&limit=10", {
    headers:{
      token: this.#token
    }
  })
  return data
}

}
    


export const apiServices = new ApiServices()