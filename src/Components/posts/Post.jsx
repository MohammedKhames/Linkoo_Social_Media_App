
import { useState } from 'react';
import CreateCommentInput from '../comment/CreateCommentInput';
import Comment from '../comment/Comment';
import ShowMoreBtn from './ShowMoreBtn';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import UpdatePost from './UpdatePost';
import { apiServices } from '../../services/apiServices';

export default function Post({post, comments = [],getPosts}) {

  const [isEditing, setIsEditing] = useState(false)

  async function addComment() {
    getPosts()
  }

  async function deleteComment(commentId) {
    const response = await apiServices.deleteComment(post._id, commentId)
    if (response.success) {
      getPosts()
    }
  }

  async function deletePost() {
    const response = await apiServices.deletePost(post._id)
    if (response.success) {
      getPosts()
    }
  }


  async function likePost() {
    const response = await apiServices.likePost(post._id)
    if (response.success) {
      getPosts()
    }
  }

  async function sharePost() {
    const response = await apiServices.sharePost(post._id)
    if (response.success) {
      getPosts()
    }
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
             onShare={sharePost}
           />
           <CreateCommentInput postId={post._id} addComment={addComment}/>

            <div className="pt-6">
              { 
                comments.length > 0
                  ? comments.map((comment) => (
                      <Comment comment={comment} key={comment._id} deleteComment={deleteComment} postCreatorId={post.user._id} getPosts={getPosts}/>
                    ))
                  : (post.topComment &&
                      <Comment comment={post.topComment} deleteComment={deleteComment} postCreatorId={post.user._id} getPosts={getPosts}/>
                    )
              }
            </div>

            {comments.length === 0 && <ShowMoreBtn postId={post._id}/>}

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

