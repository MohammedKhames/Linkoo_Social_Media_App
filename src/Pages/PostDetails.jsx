import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../Components/Post'
import { apiServices } from '../services/apiServices';
import LoadingScreen from '../Components/LoadingScreen';


export default function PostDetails() {

    let {postId} = useParams()
    const [post, setPost] = useState(null)


    async function getPostDetails() {

      const data = await apiServices.getPostDetails(postId)
      setPost(data.post)
      
    }


    useEffect(()=>{
      getPostDetails()
    },[])


  return (
    <div  className='max-w-2xl mx-auto py-10 grid gap-6'>
     {
        
        post == null ? <LoadingScreen /> :
        <Post post={post}/>}

    </div>
  )
}
