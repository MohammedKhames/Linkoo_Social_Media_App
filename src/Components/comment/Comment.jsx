import React, { useContext, useState, useRef, useEffect } from 'react'
import avatar from '/src/assets/avatar.png'
import { authContext } from '../../contexts/authContext'
import { Input, Button } from '@heroui/react'
import { apiServices } from '../../services/apiServices'

export default function Comment({comment, deleteComment, postCreatorId, getPosts, onReply}) {

  const { userData } = useContext(authContext)
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [commentContent, setCommentContent] = useState(comment.content)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLikeLoading, setIsLikeLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const likes = comment.likes || []
  const actuallyLiked = likes.some(like => (typeof like === 'string' ? like === userData?._id : like?._id === userData?._id))

  const [localIsLiked, setLocalIsLiked] = useState(actuallyLiked)
  const [localLikesCount, setLocalLikesCount] = useState(likes.length)

  useEffect(() => {
    setLocalIsLiked(actuallyLiked)
    setLocalLikesCount(likes.length)
  }, [actuallyLiked, likes.length])

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMenu])

  async function updateComment() {
    if (!commentContent.trim() || isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await apiServices.updateComment(comment.post, comment._id, {content: commentContent});
      if (response.data.message === "success" || response.data.success) {
        setIsInEditMode(false);
        getPosts();
      }
    } catch(e) {
      console.error(e);
      // Fallback optimistic
      setIsInEditMode(false);
      comment.content = commentContent; 
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleLike() {
    const previousIsLiked = localIsLiked;
    setLocalIsLiked(!previousIsLiked);
    setLocalLikesCount(prev => previousIsLiked ? prev - 1 : prev + 1);

    try {
      await apiServices.likeComment(comment.post, comment._id)
    } catch (err) {
      console.error("Error liking comment:", err)
      setLocalIsLiked(previousIsLiked);
      setLocalLikesCount(prev => previousIsLiked ? prev + 1 : prev - 1);
    }
  }

  const isCreator = userData && (userData._id === comment.commentCreator._id);
  const isPostOwner = userData && (userData._id === postCreatorId);
  const canEdit = isCreator;
  const canDelete = isCreator || isPostOwner;

  const renderCommentContent = (text) => {
    if (!text) return null;
    const match = text.match(/^(@[a-zA-Z0-9_\u0600-\u06FF]+\s[a-zA-Z0-9_\u0600-\u06FF]+|@[a-zA-Z0-9_\u0600-\u06FF]+)(.*)/);
    if (match) {
      return (
        <>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded-md mr-1">{match[1]}</span>
          {match[2]}
        </>
      )
    }
    return text;
  }

  return (
    <div className="media flex pb-4 group/comment relative">
      <a className="mr-4 shrink-0 transition-transform hover:scale-105" href="#">
        <img onError={(e) => e.target.src = avatar} className="rounded-full w-10 h-10 object-cover ring-2 ring-slate-100 dark:ring-slate-700" src={comment.commentCreator.photo} />
      </a>

      <div className="media-body grow">
        <div className='flex justify-between w-full items-start'>
           <div>
            <a className="inline-block text-sm font-bold text-slate-800 dark:text-slate-200 mr-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#">{comment.commentCreator.name}</a>
            <span className="text-xs text-slate-400 dark:text-slate-500">Just now</span>
           </div>

          {(canEdit || canDelete) && !isInEditMode && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-all opacity-0 group-hover/comment:opacity-100 focus:opacity-100"
                aria-label="Comment options"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 top-9 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-20 animate-in fade-in slide-in-from-top-2">
                  {canEdit && (
                    <button
                      onClick={() => { setIsInEditMode(true); setShowMenu(false) }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => { deleteComment(comment._id); setShowMenu(false) }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
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
            comment.content && <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{renderCommentContent(comment.content)}</p>
        }

        {comment.img && <img src={comment.img} className='w-1/2 mt-2 rounded-xl' />}

        <div className="mt-2 flex items-center gap-1">
          <button
            onClick={handleLike}
            className={`inline-flex items-center py-1.5 px-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg transition-all group ${localIsLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400'
              }`}
          >
            <span className="mr-1.5 transition-transform group-active:scale-125">
              <svg className={`transition-all ${localIsLiked ? 'fill-rose-500' : 'fill-none stroke-current stroke-2 group-hover:fill-rose-500'}`} style={{ width: 16, height: 16 }} viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <span className="text-[11px] font-bold">{localLikesCount}</span>
          </button>
                  <button onClick={() => onReply && onReply(comment.commentCreator.name)} className="py-1.5 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                    Reply
                  </button>
                </div>
              </div>
    </div>
  )
}
