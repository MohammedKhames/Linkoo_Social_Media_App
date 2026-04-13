import { authContext } from '../../contexts/authContext'
import { useContext } from 'react'

export default function PostFooter({ post, onLike, onShare }) {
  const { userData } = useContext(authContext)
  const { likesCount = 0, commentsCount = 0, sharesCount = 0, likes = [] } = post

  const isLiked = likes.some(like => (typeof like === 'string' ? like === userData?._id : like?._id === userData?._id))

  return (
    <div className="flex flex-col">
      {/* ─── Counts Bar ─── */}
      <div className="flex items-center justify-between py-3 px-1 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm shadow-rose-500/20">
              <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </div>
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm shadow-blue-500/20">
              <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
          </div>
          <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
            {likesCount}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[13px] font-medium text-slate-500 dark:text-slate-400">
          <span>{commentsCount || 0} comments</span>
          <span>{sharesCount || 0} shares</span>
        </div>
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="flex items-center justify-between py-1 mt-1">
        <button 
          onClick={onLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all font-bold group
            ${isLiked 
              ? 'text-rose-600 bg-rose-50/50 dark:bg-rose-900/10' 
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-rose-600 dark:hover:text-rose-400'
            }`}
        >
          <svg className={`w-5 h-5 stroke-current stroke-2 transition-all ${isLiked ? 'fill-rose-500' : 'fill-none group-hover:fill-rose-500'}`} viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {isLiked ? 'Liked' : 'Like'}
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 group">
          <svg className="w-5 h-5 fill-none stroke-current stroke-2 group-hover:fill-indigo-500 transition-colors" viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Comment
        </button>

        <button 
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 font-bold hover:text-cyan-600 dark:hover:text-cyan-400 group"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2 group-hover:fill-cyan-500 transition-colors" viewBox="0 0 24 24">
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
          Share
        </button>
      </div>
    </div>
  )
}