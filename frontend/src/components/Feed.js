import React from 'react';
import Post from './Post';
import '../styles/Feed.css';

const Feed = () => {
  return (
    <div className="feed-container">
      <Post content="First post!" author="John" />
      <Post content="Loving this platform!" author="Jane" />
    </div>
  );
};

export default Feed;
