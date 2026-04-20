import React, { useContext, useState } from 'react'
import Post from '../Components/posts/Post';
import { apiServices } from '../services/apiServices'
import PostSkeleton from '../Components/posts/PostSkeleton';
import CreatePost from '../Components/posts/CreatePost';
import { authContext } from '../contexts/authContext';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png';


// Fake contacts data
const contacts = [
  { name: 'Omnia Mahmoud', status: 'online', lastMsg: 'خد كيس الزبالة وانت خارج', time: '2m', unread: 2 },
  { name: 'Logain Mohammed', status: 'online', lastMsg: 'بابا رد على ماما', time: '15m', unread: 0 },
  { name: 'Marwan Mohammed', status: 'away', lastMsg: 'ان شاء الله الله والف الف مبروك', time: '1h', unread: 1 },
  { name: 'Fares Mohammed', status: 'online', lastMsg: 'سامو عليكوووو', time: '2h', unread: 1 },
  { name: 'Kerles Nader', status: 'away', lastMsg: 'مشاعر تشاور تودع مسافر', time: '1h', unread: 1 },
]

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// Random avatar colors
const avatarColors = [
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
]

export default function Feed() {

  const { userData, searchTerm } = useContext(authContext)
  const [expandedChat, setExpandedChat] = useState(null)

  const { data: posts = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: () => apiServices.getPosts(),
    select: (data) => data.data.posts
  })


  return (
    <div className='max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8'>
      <div className='flex flex-col lg:flex-row gap-4 sm:gap-6'>

        {/* ═══════ Left Sidebar ═══════ */}
        <aside className='hidden lg:block w-[260px] shrink-0'>
          <div className='sticky top-20 space-y-1.5'>

            {/* User Profile Card */}
            <Link to="/profile" className='flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all group'>
              <img
                src={userData?.photo || avatar}
                onError={(e) => e.target.src = avatar}
                alt="Profile"
                className='w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-slate-700 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600 transition-all'
              />
              <div>
                <p className='text-sm font-bold text-slate-800 dark:text-slate-200 capitalize group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
                  {userData?.name || 'User'}
                </p>
                <p className='text-xs text-slate-400 dark:text-slate-500'>View Profile</p>
              </div>
            </Link>

            <div className='h-px bg-slate-200 dark:bg-slate-800 mx-3'></div>

            {/* Navigation Items */}
            <Link to="/" className='flex items-center gap-3.5 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'>
              <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20'>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className='text-sm font-bold'>Home</span>
            </Link>

            <Link to="/profile" className='flex items-center gap-3.5 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 group'>
              <div className='w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors'>
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className='text-sm font-semibold'>My Profile</span>
            </Link>

            <div className='flex items-center gap-3.5 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer group'>
              <div className='w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors'>
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className='text-sm font-semibold'>Friends</span>
            </div>

            <div className='flex items-center gap-3.5 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer group'>
              <div className='w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors'>
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className='text-sm font-semibold'>Memories</span>
            </div>

            <div className='flex items-center gap-3.5 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer group'>
              <div className='w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center group-hover:bg-violet-200 dark:group-hover:bg-violet-900/50 transition-colors'>
                <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <span className='text-sm font-semibold'>Saved</span>
            </div>

            <div className='flex items-center gap-3.5 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer group'>
              <div className='w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50 transition-colors'>
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className='text-sm font-semibold'>Groups</span>
            </div>

            <div className='flex items-center gap-3.5 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer group'>
              <div className='w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50 transition-colors'>
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className='text-sm font-semibold'>Pages</span>
            </div>


            <div className='h-px bg-slate-200 dark:bg-slate-800 mx-3'></div>

            {/* Footer */}
            <p className='px-3 pt-1 text-xs text-slate-400 dark:text-slate-600'>
              © 2026 Mohammed Khamis · Privacy · Terms
            </p>
          </div>
        </aside>

        {/* ═══════ Center Feed ═══════ */}
        <main className='flex-1 min-w-0 relative'>

          {isFetching && !isLoading && (
            <div className='px-8 py-2 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 rounded-2xl w-fit absolute start-1/2 -translate-x-1/2 -top-2 z-10 border border-slate-100 dark:border-slate-800'>
              <Spinner color="secondary" size="sm" />
            </div>
          )}

          <CreatePost getPosts={refetch} userData={userData} />

          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
          ) : posts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No posts yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Be the first to share something!</p>
            </div>
          ) : (
            posts
              .filter(post => 
                !searchTerm || 
                post.body?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((post) => <Post post={post} key={post._id} getPosts={refetch} />)
          )}
        </main>

        {/* ═══════ Right Sidebar ═══════ */}
        <aside className='hidden xl:block w-[280px] shrink-0'>
          <div className='sticky top-20 space-y-5'>

            {/* Trending Card */}
            <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-5'>
              <h4 className='text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2'>
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Trending
              </h4>
              <div className='space-y-3'>
                {['#Technology', '#Design', '#Photography', '#Travel', '#Coding'].map((tag, i) => (
                  <div key={i} className='flex items-center justify-between group cursor-pointer'>
                    <span className='text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>{tag}</span>
                    <span className='text-xs text-slate-400 dark:text-slate-500'>{[31, 24, 19, 43, 28][i]} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══════ Contacts / Chat ═══════ */}
            <div className='bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-5'>
              <div className='flex items-center justify-between mb-4'>
                <h4 className='text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contacts
                </h4>
                <button className='p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <div className='space-y-1 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar'>
                {contacts.map((contact, i) => (
                  <div key={i}>
                    {/* Contact Row */}
                    <button
                      onClick={() => setExpandedChat(expandedChat === i ? null : i)}
                      className='flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left group'
                    >
                      {/* Avatar */}
                      <div className='relative shrink-0'>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shadow-sm transition-transform group-hover:scale-105`}>
                          {getInitials(contact.name)}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${contact.status === 'online' ? 'bg-emerald-500' : 'bg-amber-400'
                          }`}></div>
                      </div>
                      {/* Info */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center justify-between'>
                          <p className='text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
                            {contact.name}
                          </p>
                          <span className='text-[11px] text-slate-400 dark:text-slate-500 shrink-0 ml-2'>{contact.time}</span>
                        </div>
                        <p className='text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5'>{contact.lastMsg}</p>
                      </div>
                      {/* Unread badge */}
                      {contact.unread > 0 && (
                        <span className='w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0'>
                          {contact.unread}
                        </span>
                      )}
                    </button>

                    {/* Expanded Mini Chat */}
                    {expandedChat === i && (
                      <div className='ml-2 mr-2 mb-2 mt-1 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50'>
                        {/* Messages */}
                        <div className='space-y-2.5 mb-3 max-h-40 overflow-y-auto'>
                          {/* Their message */}
                          <div className='flex gap-2'>
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center text-white text-[8px] font-bold shrink-0 mt-1`}>
                              {getInitials(contact.name)}
                            </div>
                            <div className='bg-white dark:bg-slate-700 rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm'>
                              <p className='text-xs text-slate-700 dark:text-slate-200'>{contact.lastMsg}</p>
                              <p className='text-[10px] text-slate-400 dark:text-slate-500 mt-1'>{contact.time} ago</p>
                            </div>
                          </div>
                          {/* My message */}
                          <div className='flex justify-end'>
                            <div className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm'>
                              <p className='text-xs text-white'>Sure, sounds great! 😊</p>
                              <p className='text-[10px] text-indigo-200 mt-1'>Just now</p>
                            </div>
                          </div>
                        </div>
                        {/* Input */}
                        <div className='flex gap-2'>
                          <input
                            type='text'
                            placeholder='Type a message...'
                            className='flex-1 text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 transition-all'
                          />
                          <button className='w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shrink-0 hover:shadow-md hover:shadow-indigo-500/20 transition-all'>
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className='px-3 text-xs text-slate-400 dark:text-slate-600 text-center'>
              Made with 💜 by Linkoo
            </p>
          </div>
        </aside>

      </div>
    </div>
  )
}
