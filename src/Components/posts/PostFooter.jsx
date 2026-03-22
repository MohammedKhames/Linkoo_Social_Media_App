import React from 'react'
import commentIcon from "/src/assets/comment.svg"

export default function PostFooter({ likesCount, commentsCount }) {
  return (
    <div className="py-4 flex justify-between">
      <span className="inline-flex items-center">
        <span className="mr-2">
          <svg className="fill-rose-600 dark:fill-rose-400" style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
            </path>
          </svg>
        </span>
        <span className="text-lg font-bold">{likesCount}</span>
      </span>
      <span className="inline-flex items-center">
        <span className="mr-2">
          <img src={commentIcon} className="w-5" alt="" />
        </span>
        <span className="text-lg font-bold">{commentsCount}</span>
      </span>
    </div>
  )
}