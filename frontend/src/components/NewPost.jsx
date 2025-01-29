import React, { useState } from 'react';
import SpotlightCard from './ui/Glass';  // Import the SpotlightCard component

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!title || !content) {
      setError('Please fill in both fields.');
      return;
    }

    // Post submission logic (e.g., sending to backend API)
    const newPost = {
      title,
      content,
      likes: 0,
      comments: [],
    };

    // For now, just log the new post
    console.log('New Post:', newPost);

    // Reset the form
    setTitle('');
    setContent('');
    setError(null);
  };

  return (
    <div className="min-h-screen relative bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gray-900/30 rounded-full blur-3xl animate-pulse -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-gray-800/30 rounded-full blur-3xl animate-pulse top-1/2 -right-48"></div>
        <div className="absolute w-96 h-96 bg-gray-700/30 rounded-full blur-3xl animate-pulse -bottom-48 left-1/2"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.25)" className="w-full max-w-xl p-8">
          <h1 className="text-4xl text-white text-center mb-6">Create a New Post</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-white text-xl block mb-2">Post Title</label>
              <input
                type="text"
                className="w-full p-3 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
              />
            </div>

            <div className="mb-4">
              <label className="text-white text-xl block mb-2">Post Content</label>
              <textarea
                className="w-full p-3 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-200"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the content"
                rows="6"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Submit Post
              </button>
            </div>
          </form>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default AddPost;
