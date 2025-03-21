import React from 'react';
import '../styles/Post.css';

const Post = ({ content, author }) => {
  return (
    <div className="post-card">
      <h3>{author}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Post;
