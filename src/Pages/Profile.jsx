import React, { useContext, useEffect, useState, useRef } from 'react'
import { authContext } from '../contexts/authContext'
import { apiServices } from '../services/apiServices'
import avatar from '/src/assets/avatar.png'
import Post from '../Components/posts/Post'
import PostSkeleton from '../Components/posts/PostSkeleton'
import ChangePasswordModal from '../Components/Password/ChangePasswordModal'
import { Spinner } from '@heroui/react'

export default function Profile() {
  const { userData, getLoggedUserData } = useContext(authContext)
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [activeTab, setActiveTab] = useState('posts')
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const fileInputRef = useRef(null)

  async function getUserPosts() {
    if (!userData?._id) return
    setPostsLoading(true)
    try {
      const data = await apiServices.getUserPosts(userData._id)
      setPosts(data.data.posts || [])
    } catch (err) {
      console.error(err)
    } finally {
      setPostsLoading(false)
    }
  }

  useEffect(() => {
    getUserPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?._id])

  function getJoinDate() {
    if (!userData?.createdAt) return 'Recently'
    const d = new Date(userData.createdAt)
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  function formatBirthday() {
    if (!userData?.dateOfBirth) return null
    return new Date(userData.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setIsUploadingPhoto(true)
    const formData = new FormData()
    formData.append('photo', file)
    try {
      await apiServices.uploadProfilePhoto(formData)
      await getLoggedUserData() // refresh context
    } catch (error) {
      console.error('Failed to upload photo', error)
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* ══════════════════════════════════════════════════════ */}
      {/*  COVER PHOTO SECTION                                  */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="relative">
        <div className="h-56 sm:h-72 lg:h-80 w-full relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 30%, #a855f7 60%, #6366f1 100%)' }}>
          {/* Animated-feel blobs */}
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/15 rounded-full blur-3xl translate-x-1/4 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-300/8 rounded-full blur-2xl"></div>
          {/* Pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
        </div>

        {/* Profile avatar — overlapping cover */}
        <div className="max-w-[1280px] mx-auto px-4 relative">
          <div className="absolute -bottom-[70px] left-4 sm:left-6">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-[140px] h-[140px] rounded-full ring-[5px] ring-white dark:ring-slate-950 overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-2xl relative">
                <img
                  src={userData?.photo || avatar}
                  onError={(e) => e.target.src = avatar}
                  alt="Profile"
                  className={`w-full h-full object-cover transition-opacity ${isUploadingPhoto ? 'opacity-50' : 'opacity-100 group-hover:opacity-75'}`}
                />
                
                {/* Upload Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${isUploadingPhoto ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {isUploadingPhoto ? (
                    <Spinner color="white" size="md" />
                  ) : (
                    <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <circle cx="12" cy="12.75" r="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full ring-[3px] ring-white dark:ring-slate-950 z-10 pointer-events-none"></div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  PROFILE INFO BAR                                     */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="pt-[85px] pb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white capitalize tracking-tight">
                {userData?.name || 'User'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium flex items-center gap-2">
                <span>{posts.length} {posts.length === 1 ? 'Post' : 'Posts'}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span>Joined {getJoinDate()}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowChangePassword(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold
                           bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                           text-white shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/25
                           transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 -mb-px">
            {[
              { key: 'posts', label: 'Posts', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              )},
              { key: 'about', label: 'About', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-bold border-b-[3px] transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-t-xl'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  MAIN CONTENT                                         */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ─── Left Sidebar ─── */}
          <div className="lg:w-[320px] shrink-0 space-y-6">

            {/* Intro Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-5 sticky top-20">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Intro</h3>
              
              <div className="space-y-3.5">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-sm text-slate-600 dark:text-slate-300 truncate">{userData?.email || '—'}</span>
                </div>

                {/* Gender */}
                {userData?.gender && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{userData.gender}</span>
                  </div>
                )}

                {/* Birthday */}
                {formatBirthday() && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12 8.25c.972 0 1.942.028 2.908.082" />
                    </svg>
                    <span className="text-sm text-slate-600 dark:text-slate-300">Born {formatBirthday()}</span>
                  </div>
                )}

                {/* Joined */}
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="text-sm text-slate-600 dark:text-slate-300">Joined {getJoinDate()}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{posts.length}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Posts</p>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
                    {posts.reduce((s, p) => s + (p.commentsCount || 0), 0)}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Comments</p>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xl font-extrabold text-rose-600 dark:text-rose-400">
                    {posts.reduce((s, p) => s + (p.likesCount || 0), 0)}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Likes</p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Content ─── */}
          <div className="flex-1 min-w-0">
            
            {activeTab === 'posts' && (
              <>
                {postsLoading ? (
                  <div className="grid gap-5">
                    {Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)}
                  </div>
                ) : posts.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No posts yet</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Share your first post and start connecting!</p>
                  </div>
                ) : (
                  <div className="grid gap-5">
                    {posts.map((post) => (
                      <Post key={post._id} post={post} getPosts={getUserPosts} />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'about' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">About</h2>
                </div>
                
                <div className="p-6 space-y-5">
                  {/* Info items */}
                  {[
                    { label: 'Full Name', value: userData?.name, icon: '👤', color: 'indigo' },
                    { label: 'Email', value: userData?.email, icon: '✉️', color: 'purple' },
                    { label: 'Gender', value: userData?.gender, icon: '🧑', color: 'pink', capitalize: true },
                    { label: 'Birthday', value: formatBirthday(), icon: '🎂', color: 'amber' },
                    { label: 'Joined', value: getJoinDate(), icon: '📅', color: 'emerald' },
                  ].filter(item => item.value).map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                      <span className="text-2xl w-10 h-10 flex items-center justify-center">{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">{item.label}</p>
                        <p className={`text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate ${item.capitalize ? 'capitalize' : ''}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Security section */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Security</p>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="flex items-center gap-4 w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
                    >
                      <span className="text-2xl w-10 h-10 flex items-center justify-center">🔒</span>
                      <div className="text-left min-w-0">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Change Password</p>
                        <p className="text-xs text-slate-400 mt-0.5">Keep your account secure</p>
                      </div>
                      <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 ml-auto group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  )
}
