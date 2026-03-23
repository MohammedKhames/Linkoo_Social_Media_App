import React, { useContext, useEffect, useState } from 'react'
import Post from '../Components/posts/Post';
import LoadingScreen from '../Components/LoadingScreen';
import { apiServices } from '../services/apiServices'
import CreatePost from '../Components/posts/CreatePost';
import { authContext } from '../contexts/authContext';


export default function Feed() {

  const { userData } = useContext(authContext)
  const [posts, setPosts] = useState([])

  async function getPosts() {
    const { data } = await apiServices.getPosts()
    setPosts(data.posts)
  }

  useEffect(() => {
    getPosts()
  }, [])



  return (
    <div className='max-w-xl mx-auto py-10 grid gap-6'>

      <CreatePost getPosts={getPosts} setPosts={setPosts} userData={userData} />
      {

        posts.length == 0 ? <LoadingScreen /> :
        posts.map( (post) => <Post post={post} key={post._id}/> )

     }
    </div>
  )
}
