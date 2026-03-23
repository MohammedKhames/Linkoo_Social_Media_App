import React, { useState } from 'react'
import { apiServices } from '../../services/apiServices'

export default function CreatePost({ getPosts, setPosts, userData }) {

  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      const imgSrc = URL.createObjectURL(e.target.files[0])
      setImagePreview(imgSrc)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.set("body", caption)
    if (image) formData.set("image", image)

    const response = await apiServices.createPost(formData)
    console.log(response)

    if (response) {
      setLoading(false)
      setCaption('')
      setImage(null)
      setImagePreview(null)
      setShowForm(false)

      // أضف البوست الجديد في أول القائمة مع بيانات اليوزر الحالي
      const newPost = {
        ...response.data.post,
        user: {
          name: userData?.name,
          photo: userData?.photo,
        }
      }
      setPosts((prev) => [newPost, ...prev])
    }
  }


  function removeImage() {
    setImagePreview(null)
    setImage(null)
    document.getElementById("imageInput").value = null
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>

      {!showForm ? (
        /* ── Collapsed state ── */
        <button
          onClick={() => setShowForm(true)}
          className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg text-gray-400 hover:bg-gray-50 transition duration-200"
        >
          What's on your mind? Share a post...
        </button>

      ) : (
        /* ── Expanded form ── */
        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* Caption Textarea */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            rows="3"
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-60 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between">

            {/* Photo upload */}
            <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200 flex items-center space-x-2">
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
              {/* Image icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Photo</span>
            </label>

            {/* Cancel + Post */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setCaption('')
                  setImage(null)
                  setImagePreview(null)
                }}
                disabled={loading}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || (!caption.trim() && !image)}
                className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span>Posting...</span>
                  </span>
                ) : (
                  "Post"
                )}
              </button>
            </div>

          </div>
        </form>
      )}

    </div>
  )
}
