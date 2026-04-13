import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiServices } from '../services/apiServices';
import Post from '../Components/posts/Post'
import PostSkeleton from '../Components/posts/PostSkeleton';

export default function PostDetails() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    async function getPostDetailsAndComments() {
      setLoading(true)
      try {
        const [postData, commentData] = await Promise.all([
          apiServices.getPostDetails(postId),
          apiServices.getPostComments(postId)
        ])
        
        // Correcting the data mapping based on API structure
        setPost(postData?.data?.post || postData?.data || null)
        setComments(commentData?.data?.comments || commentData?.data || [])
      } catch (err) {
        console.error("Error fetching post details:", err)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      getPostDetailsAndComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4'>
      <div className='max-w-[1280px] mx-auto'>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className='mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors font-bold group'
        >
          <div className='w-8 h-8 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:border-indigo-200 dark:group-hover:border-indigo-900'>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          Back to Feed
        </button>

        <div className='max-w-3xl mx-auto'>
          {loading ? (
            <PostSkeleton />
          ) : !post ? (
            <div className='bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm'>
               <h3 className='text-xl font-bold text-slate-800 dark:text-slate-200 mb-2'>Post not found</h3>
               <p className='text-slate-500'>This post may have been deleted or is unavailable.</p>
            </div>
          ) : (
            <Post 
              post={post} 
              comments={comments} 
              getPosts={getPostDetailsAndComments}
            />
          )}
        </div>
      </div>
    </div>
  )
}
