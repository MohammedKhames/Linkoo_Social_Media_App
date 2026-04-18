import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../contexts/authContext';
import CreateCommentInput from '../comment/CreateCommentInput';
import Comment from '../comment/Comment';
import ShowMoreBtn from './ShowMoreBtn';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import UpdatePost from './UpdatePost';
import { apiServices } from '../../services/apiServices';

export default function Post({post, comments = [],getPosts}) {

  const { userData } = useContext(authContext)
  const [isEditing, setIsEditing] = useState(false)
  const [optimisticComments, setOptimisticComments] = useState([])
  const [replyingTo, setReplyingTo] = useState(null)

  async function addComment(commentData) {
    if (!commentData || !userData) return;
    const optimisticComment = {
      _id: Math.random().toString(),
      content: commentData.content,
      commentCreator: userData,
      createdAt: new Date().toISOString(),
      post: post._id,
      likes: []
    }
    setOptimisticComments(prev => [...prev, optimisticComment])
    
    // Refresh feed in the background so the server state catches up
    getPosts()
  }

  async function deleteComment(commentId) {
    const response = await apiServices.deleteComment(post._id, commentId)
    if (response.success || response.message === "success") {
      setOptimisticComments(prev => prev.filter(c => c._id !== commentId))
      getPosts()
    } else {
      setOptimisticComments(prev => prev.filter(c => c._id !== commentId))
      getPosts()
    }
  }

  async function deletePost() {
    const response = await apiServices.deletePost(post._id)
    if (response.success || response.message === "success") {
      getPosts()
    } else {
      getPosts()
    }
  }

  async function likePost() {
    try {
      await apiServices.likePost(post._id)
      getPosts()
    } catch (e) {
      console.log(e)
    }
  }

  async function unlikePost() {
    try {
      await apiServices.unlikePost(post._id)
      getPosts()
    } catch (e) {
      console.log(e)
    }
  }

  async function sharePost() {
    const response = await apiServices.sharePost(post._id)
    if (response.success) {
      getPosts()
    }
  }

  // Derive comments to display
  let baseComments = comments.length > 0 ? comments : (post.topComment ? [post.topComment] : [])
  // Prevent duplicate IDs or precise duplicate content if the API sends back our optimistic comment
  const baseCommentIds = new Set(baseComments.map(c => c._id))
  const displayableOptimistic = optimisticComments.filter(opt => {
     // If the real API comments now contain the exact text we optimistically added, hide the optimistic one!
     const isDuplicateContent = baseComments.some(real => real.content === opt.content && real.commentCreator._id === opt.commentCreator._id)
     return !baseCommentIds.has(opt._id) && !isDuplicateContent
  })
  
  let displayedComments = [...baseComments, ...displayableOptimistic]

  if (comments.length === 0) {
     displayedComments = displayedComments.slice(-3)
  }

  return (

   <article className="mb-6 break-inside p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 dark:bg-slate-900 dark:border-slate-800 flex flex-col bg-clip-border overflow-hidden">
  
           <PostHeader
             userName={post.user.name}
             userPhoto={post.user.photo}
             deletePost={deletePost}
             editPost={() => setIsEditing(true)}
             creatorId={post.user._id}
             createdAt={post.createdAt}
           />    
           <PostBody caption= {post.body} image={post.image}/>    
           <PostFooter 
             post={post}
             onLike={likePost}
             onUnlike={unlikePost}
             onShare={sharePost}
           />
           <CreateCommentInput 
             postId={post._id} 
             addComment={addComment} 
             replyingTo={replyingTo} 
             clearReply={() => setReplyingTo(null)}
           />

            <div className="pt-6">
              { 
                displayedComments.map((comment) => (
                  <Comment 
                    comment={comment} 
                    key={comment._id} 
                    deleteComment={deleteComment} 
                    postCreatorId={post.user._id} 
                    getPosts={getPosts}
                    onReply={(name) => setReplyingTo(name)}
                  />
                ))
              }
            </div>

            {comments.length === 0 && (post.commentsCount > 0 || optimisticComments.length > 0) && (
              <ShowMoreBtn postId={post._id}/>
            )}

          {isEditing && (
            <UpdatePost
              post={post}
              onClose={() => setIsEditing(false)}
              onSuccess={getPosts}
            />
          )}
  
  </article>

  )
}

