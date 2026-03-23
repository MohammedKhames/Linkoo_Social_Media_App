import React, { useState } from 'react'
import { apiServices } from '../../services/apiServices'

export default function UpdatePost({ post, onClose, onSuccess }) {
  const [caption, setCaption] = useState(post.body || '')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(post.image || null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  function removeImage() {
    setImage(null)
    setImagePreview(null)
    const input = document.getElementById('updateImageInput')
    if (input) input.value = null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!caption.trim() && !image) return
    setLoading(true)
    const formData = new FormData()
    formData.set('body', caption)
    if (image) formData.set('image', image)
    try {
      const response = await apiServices.updatePost(post._id, formData)
      if (response) {
        onSuccess()
        onClose()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Edit Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            rows="4"
          />

          {imagePreview && (
            <div className="relative inline-block">
              <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition flex items-center space-x-2">
              <input
                id="updateImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Change Photo</span>
            </label>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (!caption.trim() && !image)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
