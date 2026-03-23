
import CreateCommentInput from '../comment/CreateCommentInput';
import Comment from '../comment/Comment';
import ShowMoreBtn from './ShowMoreBtn';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import { apiServices } from '../../services/apiServices';

export default function Post({post, comments = [],getPosts}) {

  async function addComment(formData) {
    const response = await apiServices.createComment(post._id, formData)
    if (response.success) {
      getPosts()
    }
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


  return (

   <article className="mb-4 break-inside p-6 rounded-xl bg-gray-50 shadow dark:bg-slate-800 flex flex-col bg-clip-border">
  
           <PostHeader userName={post.user.name} userPhoto={post.user.photo} deletePost={deletePost} creatorId={post.user._id}/>    
           <PostBody caption= {post.body} image={post.image}/>    
           <PostFooter commentsCount={post.commentsCount} likesCount={post.likesCount}/>
           <CreateCommentInput addComment={addComment}/>

            <div className="pt-6">
              { 
                comments.length > 0
                  ? comments.map((comment) => (
                      <Comment comment={comment} key={comment._id} deleteComment={deleteComment} postCreatorId={post.user._id}/>
                    ))
                  : (post.topComment &&
                      <Comment comment={post.topComment} deleteComment={deleteComment} postCreatorId={post.user._id}/>
                    )
              }
            </div>

            {comments.length === 0 && <ShowMoreBtn postId={post._id}/>}
  
  </article>

  )
}
