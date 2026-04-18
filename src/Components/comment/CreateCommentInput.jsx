import React, { useState, useEffect, useRef } from 'react'
import { apiServices } from '../../services/apiServices'
import { Spinner } from '@heroui/react'

export default function CreateCommentInput({postId, addComment, replyingTo, clearReply }) {

  const [commentContent, setCommentContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (replyingTo) {
      inputRef.current?.focus();
    }
  }, [replyingTo])

  async function handleCreateComment(){
    if (!commentContent.trim() || isLoading) return
    
    setIsLoading(true)
    const finalContent = replyingTo ? `@${replyingTo} ${commentContent}` : commentContent;
    
    // Instant Optimistic Update
    addComment({ content: finalContent })
    setCommentContent("")
    if (clearReply) clearReply();

    try {
      // Background API call
      await apiServices.createComment(postId, { content: finalContent })
    } catch (err) {
      console.error("Comment creation failed", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="relative mt-4">
               {replyingTo && (
                 <div className="flex items-center gap-2 mb-2 text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg w-fit transition-all duration-300">
                    <span className="font-medium">Replying to <strong>{replyingTo}</strong></span>
                    <button onClick={clearReply} className="text-indigo-400 hover:text-indigo-600 transition-colors ml-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                 </div>
               )}
               <div className="relative group">
                <input 
                  ref={inputRef}
                  value={commentContent} 
                  onChange={(e) => setCommentContent(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateComment()}
                  className="pt-2 pb-2 pl-4 w-full h-11 bg-slate-100 dark:bg-slate-800 rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white font-medium pr-20 text-sm border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                  type="text" 
                  placeholder={replyingTo ? "Write a reply..." : "Write a comment..."} 
                  disabled={isLoading}
                />
                <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
                  <svg className="mr-2 text-slate-400 dark:text-slate-500" style={{width: 22, height: 22}} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
                  </svg>
               <button onClick={handleCreateComment} className='disabled:cursor-not-allowed group-btn transition-colors' disabled={isLoading || commentContent.trim()==""}>
                   {isLoading ? (
                     <Spinner size="sm" color="secondary" />
                   ) : (
                     <svg className="fill-indigo-600 dark:fill-indigo-400 group-btn-disabled:fill-indigo-300 dark:group-btn-disabled:fill-indigo-800" style={{width: 22, height: 22}} viewBox="0 0 24 24">
                      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                   )}
               </button>
                </span>
              </div>
      </div>
  )
}
