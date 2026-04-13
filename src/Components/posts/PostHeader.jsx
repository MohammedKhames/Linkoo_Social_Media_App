import React, { useContext, useState, useEffect, useRef } from 'react'
import avatar from '/src/assets/avatar.png'
import { authContext } from '../../contexts/authContext'

// Relative time helper
function timeAgo(dateString) {
  if (!dateString) return ''
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  // Show full date for older posts
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PostHeader({ userName, userPhoto, deletePost, editPost, creatorId, createdAt }) {

  const { user } = useContext(authContext)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  // Close dropdown on outside click
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

  return (
    <div className="flex pb-4 items-center justify-between border-b border-slate-100 dark:border-slate-800 mb-4">
      <div className="flex items-center">
        <a className="inline-block mr-4 shrink-0 transition-transform hover:scale-105" href="#">
          <img onError={(e) => e.target.src = avatar} className="rounded-full w-12 h-12 object-cover ring-2 ring-indigo-50 dark:ring-slate-700" src={userPhoto} />
        </a>
        <div className="flex flex-col">
          <a className="inline-block text-[15px] font-bold text-slate-800 hover:text-indigo-600 transition-colors dark:text-slate-100 capitalize" href="#">{userName}</a>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 dark:text-slate-500 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeAgo(createdAt)}
          </div>
        </div>
      </div>

      {/* ⋯ Three-dot menu (Facebook-style) */}
      {creatorId == user?._id && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
            aria-label="Post options"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-11 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-20 animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => { editPost(); setShowMenu(false) }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit post
              </button>
              <button
                onClick={() => { deletePost(); setShowMenu(false) }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
