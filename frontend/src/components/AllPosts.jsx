import React, { useState, useEffect } from 'react';
import './AllPosts.css';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [page, setPage] = useState(1);
    const postsPerPage = 5  ;

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
        <div>
            <div className="posts-container">
                {visiblePosts.map((post) => (
                    <div key={post.id} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="post-actions">
                            <button className="like-button" onClick={() => handleLike(post.id)}>
                                Like ({post.likes || 0})
                            </button>
                            <button
                                className="comment-button"
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
                        <div className="comments">
                            {post.comments && post.comments.map((comment, index) => (
                                <p key={index}>{comment}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {visiblePosts.length < posts.length}
        </div>
    );
};

export default AllPosts;
