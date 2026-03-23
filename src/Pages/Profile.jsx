import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../contexts/authContext'
import { apiServices } from '../services/apiServices'
import avatar from '/src/assets/avatar.png'
import Post from '../Components/posts/Post'
import LoadingScreen from '../Components/LoadingScreen'
import ChangePasswordModal from '../Components/Password/ChangePasswordModal'

export default function Profile() {
  const { userData } = useContext(authContext)
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [showChangePassword, setShowChangePassword] = useState(false)

  async function getUserPosts() {
    if (!userData?._id) return
    setPostsLoading(true)
    try {
      const data = await apiServices.getUserPosts(userData._id)
      setPosts(data.posts || [])
    } catch (err) {
      console.error(err)
    } finally {
      setPostsLoading(false)
    }
  }

  useEffect(() => {
    getUserPosts()
  }, [userData?._id])

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center mb-8">
        <img
          src={userData?.photo || avatar}
          onError={(e) => e.target.src = avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-200 mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">{userData?.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{userData?.email}</p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setShowChangePassword(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">My Posts</h2>

      {postsLoading ? (
        <LoadingScreen />
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <svg className="mx-auto w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-base font-medium">No posts yet</p>
          <p className="text-sm mt-1">Start sharing something!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Post key={post._id} post={post} getPosts={getUserPosts} />
          ))}
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  )
}
