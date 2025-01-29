import React, { useState, useEffect } from 'react';
import SpotlightCard from './ui/Glass'; // Assuming SpotlightCard is used for better visuals.

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
                const response = await fetch('/posts.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
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
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => window.removeEventListener('scroll', debouncedScrollHandler);
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
        <div className="min-h-screen">
            <div className="flex flex-wrap flex-col gap-8 items-center p-5">
                {loading && <p className="text-gray-400">Loading posts...</p>}
                {visiblePosts.map((post) => (
                    <SpotlightCard
                        key={post.id}
                        className="w-4/5 max-w-xl my-2"
                        spotlightColor="rgba(0, 128, 0, 0.25)" 
                    >
                        <h2 className="text-2xl text-gray-400 mb-2">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                onClick={() => handleLike(post.id)}
                            >
                                Like ({post.likes || 0})
                            </button>
                            <button
                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                onClick={() => {
                                    const comment = prompt('Enter your comment:');
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
                                <p key={index} className="text-gray-600">
                                    {comment}
                                </p>
                            ))}
                        </div>
                    </SpotlightCard>
                ))}
                {!loading && visiblePosts.length === 0 && (
                    <p className="text-gray-600">No posts available.</p>
                )}
            </div>
        </div>
    );
};

export default AllPosts;
