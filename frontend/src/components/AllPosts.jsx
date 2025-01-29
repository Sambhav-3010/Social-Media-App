import React, { useState, useEffect } from "react";

// Custom Card component using only Tailwind
const Card = ({ children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative group overflow-hidden rounded-xl border border-white/10 ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight gradient effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative p-6">{children}</div>
    </div>
  );
};

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/posts.json");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setVisiblePosts(data.slice(0, postsPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const debouncedScrollHandler = (() => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      }, 100);
    };
  })();

  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => window.removeEventListener("scroll", debouncedScrollHandler);
  }, []);

  useEffect(() => {
    const newPosts = posts.slice(0, page * postsPerPage);
    setVisiblePosts(newPosts);
  }, [page, posts]);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      )
    );
  };

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-black via-gray-950 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gray-900/30 rounded-full blur-3xl animate-pulse -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-gray-800/30 rounded-full blur-3xl animate-pulse top-1/2 -right-48"></div>
        <div className="absolute w-96 h-96 bg-gray-700/30 rounded-full blur-3xl animate-pulse -bottom-48 left-1/2"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <div className="flex flex-wrap flex-col gap-8 items-center p-5">
          {loading && <p className="text-gray-400">Loading posts...</p>}
          {visiblePosts.map((post) => (
            <Card
              key={post.id}
              className="w-4/5 max-w-xl my-2 backdrop-blur-lg bg-black/50"
            >
              <h2 className="text-5xl text-white mb-12">{post.title}</h2>
              <p className="text-gray-300 text-xl">{post.content}</p>
              <div className="flex justify-between mt-20">
                <button
                  className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
                  onClick={() => handleLike(post.id)}
                >
                  Like ({post.likes || 0})
                </button>
                <button
                  className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors"
                  onClick={() => {
                    const comment = prompt("Enter your comment:");
                    if (comment) {
                      handleComment(post.id, comment);
                    }
                  }}
                >
                  Comment
                </button>
              </div>
              <div className="mt-4">
                {(post.comments || []).map((comment, index) => (
                  <p key={index} className="text-gray-400">
                    {comment}
                  </p>
                ))}
              </div>
            </Card>
          ))}
          {!loading && visiblePosts.length === 0 && (
            <p className="text-gray-400">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
