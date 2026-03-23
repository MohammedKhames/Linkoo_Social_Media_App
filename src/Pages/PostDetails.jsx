import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { apiServices } from '../services/apiServices';
import LoadingScreen from '../Components/LoadingScreen';
import Post from '../Components/posts/Post'

export default function PostDetails() {

    let {postId} = useParams()
    const [post, setPost] = useState(null)
const [comments, setComments]=useState([])


// post details
    async function getPostDetails() {

      const {data} = await apiServices.getPostDetails(postId)
      setPost(data.post)
      
    }


// post Comments
  async function getPostComments() {
    const {data}= await apiServices.getPostComments(postId)
    setComments(data.comments)
    
  }

    useEffect(()=>{
      getPostDetailsAndComments()
    },[])

    function getPostDetailsAndComments(){
      getPostDetails()
      getPostComments()

    }


  return (
    <div  className='max-w-2xl mx-auto py-10 grid gap-6'>
     {
        
        post == null ? <LoadingScreen /> :
        <Post post={post}  comments={comments} getPosts={getPostDetailsAndComments}/>}

    </div>
  )
}
