import React, { useContext, useState } from 'react'
import avatar from '/src/assets/avatar.png'
import { authContext } from '../../contexts/authContext'
import { Input,Button } from '@heroui/react'
import { apiServices } from '../../services/apiServices'

export default function Comment({comment, deleteComment, postCreatorId,getPosts}) {

  const { userData } = useContext(authContext)
  const [isInEditMode,setIsInEditMode] = useState(false)
  const [commentContent, setCommentContent] = useState(comment.content)
  const [isUpdating,setIsUpdating] = useState(false)
  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const likes = comment.likes || []
  const isLiked = likes.some(like => (typeof like === 'string' ? like === userData?._id : like?._id === userData?._id))



  async function handleLike() {
    if (isLikeLoading) return
    setIsLikeLoading(true)
    try {
      await apiServices.likeComment(comment.post, comment._id)
      await getPosts()
    } catch (err) {
      console.error("Error liking comment:", err)
    } finally {
      setIsLikeLoading(false)
    }
  }

  return (
    <div className="media flex pb-4">
      <a className="mr-4 shrink-0" href="#">
        <img onError={(e) => e.target.src = avatar} className="rounded-full w-10 h-10 object-cover ring-2 ring-slate-100 dark:ring-slate-700" src={comment.commentCreator.photo} />
      </a>

      <div className="media-body grow">
        <div className='flex justify-between w-full items-start'>
          <div>
            <a className="inline-block text-sm font-bold text-slate-800 dark:text-slate-200 mr-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#">{comment.commentCreator.name}</a>
            <span className="text-xs text-slate-400 dark:text-slate-500">25 minutes ago</span>
          </div>

          <div className='flex gap-1'>
            {userData && (userData._id == comment.commentCreator._id) &&
              <button
                onClick={() => setIsInEditMode(true)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-2.5 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Edit
              </button>}

            {userData && (userData._id == comment.commentCreator._id || userData._id == postCreatorId) &&
              <button
                onClick={() => deleteComment(comment._id)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                Delete
              </button>}
          </div>
        </div>
        {
          isInEditMode ?
            <div>
              <Input
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                classNames={{ inputWrapper: "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl" }}
              />
              <div className='flex justify-end gap-2 mt-2'>
                <button
                  onClick={() => { setIsInEditMode(false); setCommentContent(comment.content) }}
                  className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <Button isLoading={isUpdating} color="primary" onPress={updateComment} className="rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600"> Update</Button>
              </div>
            </div>
            :
            comment.content && <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{comment.content}</p>
        }

        {comment.img && <img src={comment.img} className='w-1/2 mt-2 rounded-xl' />}

        <div className="mt-2 flex items-center gap-1">
          <button
            onClick={handleLike}
            disabled={isLikeLoading}
            className={`inline-flex items-center py-1.5 px-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg transition-all group ${isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400'
              }`}
          >
            <span className="mr-1.5 transition-transform group-active:scale-125">
              <svg className={`transition-all ${isLiked ? 'fill-rose-500' : 'fill-none stroke-current stroke-2 group-hover:fill-rose-500'}`} style={{ width: 16, height: 16 }} viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <span className="text-[11px] font-bold">{likes.length}</span>
          </button>
                  <button className="py-1.5 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                    Reply
                  </button>
                </div>
              </div>
    </div>
  )
}
