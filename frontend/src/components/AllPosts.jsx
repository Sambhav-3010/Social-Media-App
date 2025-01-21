import React, { useState, useEffect } from 'react';
const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [page, setPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/posts.json');
            const data = await response.json();
            setPosts(data);
            setVisiblePosts(data.slice(0, postsPerPage));
        };
        fetchPosts();
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 50
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const newPosts = posts.slice(0, page * postsPerPage);
        setVisiblePosts(newPosts);
    }, [page, posts]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <div className="bg-white min-h-screen">
            <div className="flex flex-col items-center p-5">
                {visiblePosts.map((post) => (
                    <div key={post.id} className="w-4/5 max-w-xl bg-white border border-gray-300 rounded-lg my-2 p-5 shadow-lg transition-transform transform hover:-translate-y-1">
                        <h2 className="text-2xl text-gray-800 mb-2">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                        <div className="flex justify-between mt-4">
                            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={() => handleLike(post.id)}>
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
                            {post.comments && post.comments.map((comment, index) => (
                                <p key={index} className="text-gray-600">{comment}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPosts;
