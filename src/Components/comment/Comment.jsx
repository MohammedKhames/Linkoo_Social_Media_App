import React, { useContext, useState } from 'react'
import avatar from '/src/assets/avatar.png'
import { authContext } from '../../contexts/authContext'
import { Input,Button } from '@heroui/react'
import { apiServices } from '../../services/apiServices'

export default function Comment({comment, deleteComment, postCreatorId,getPosts}) {

  const { user } = useContext(authContext)
  const [isInEditMode,setIsInEditMode] = useState(false)
  const [commentContent, setCommentContent] = useState(comment.content)
  const [isUpdating,setIsUpdating] = useState(false)



 async function updateComment() {
  setIsUpdating(true)
  const formData =new FormData()
  formData.set("content",commentContent)
  const response = await apiServices.updateComment(comment.post, comment._id, formData)
  //console.log(response)

   await getPosts()

  setIsInEditMode(false)

  setIsUpdating(false)

  
 }

  return (
    <div className="media flex pb-4">
              <a className="mr-4" href="#">
                <img onError={(e)=> e.target.src=avatar} className="rounded-full max-w-none w-12 h-12" src={comment.commentCreator.photo} />
              </a>

              <div className="media-body grow">
                <div className='flex justify-between w-full'>
                  <div>
                    <a className="inline-block text-base font-bold mr-2" href="#">{comment.commentCreator.name}</a>
                    <span className="text-slate-500 dark:text-slate-300">25 minutes ago</span>
                  </div>

                    <div className='flex gap-2'>

                        {user && (user._id == comment.commentCreator._id) &&
                        <button onClick={()=> setIsInEditMode(true)}>Edit</button>}

                          {user && (user._id == comment.commentCreator._id || user._id == postCreatorId) &&
                        <button onClick={()=>deleteComment(comment._id)}>Delete</button>}
                    </div>
               </div>
               {
                 isInEditMode ?  
                <div>
                   <Input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} /> 
                   <div className='flex justify-end gap-2 mt-2'>
                    <button onClick={()=>{setIsInEditMode(false); setCommentContent(comment.content)}}> Cancel</button>
                    <Button isLoading={isUpdating} color="primary" onPress={updateComment}> Update</Button>

                   </div>

                </div>
                 :
                 comment.content && <p>{comment.content}</p> 
                 
               }
                
                 {comment.img && <img src={comment.img} className='w-1/2 mt-2'/>}

                <div className="mt-2 flex items-center">
                  <a className="inline-flex items-center py-2 mr-3" href="#">
                    <span className="mr-2">
                      <svg className="fill-rose-600 dark:fill-rose-400" style={{width: 22, height: 22}} viewBox="0 0 24 24">
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                        </path>
                      </svg>
                    </span>
                    <span className="text-base font-bold">12</span>
                  </a>
                  <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                    Reply
                  </button>
                </div>
              </div>
    </div>
  )
}
