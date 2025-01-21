import React, { useState } from 'react';

const NewPost = () => {
  const [postContent, setPostContent] = useState('');

  const handleInputChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Post:', postContent);
    setPostContent('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postContent}
          onChange={handleInputChange}
          placeholder="What's on your mind?"
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
