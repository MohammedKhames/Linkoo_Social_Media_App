import React, {  useEffect, useState } from 'react'
import Post from '../Components/posts/Post';
import LoadingScreen from '../Components/LoadingScreen';
import { apiServices } from '../services/apiServices'



export default function Feed() {

  const [posts,setPosts] =useState([])

  async function getPosts(){
    const {data} =await apiServices.getPosts()
    setPosts(data.posts)
  }

  useEffect( () =>{
    getPosts()
  },[])



  return (
    <div  className='max-w-xl mx-auto py-10 grid gap-6'>
      {

        posts.length == 0 ? <LoadingScreen /> :
        posts.map( (post) => <Post post={post} key={post._id}/> )

     }
    </div>
  )
}
