import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrendingPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/trending-posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            <h2>Trending Posts</h2>
            <ul className="list-group">
                {posts.map(post => (
                    <li key={post._id} className="list-group-item">
                        {post.text} - {post.comments} Comments
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingPosts;
