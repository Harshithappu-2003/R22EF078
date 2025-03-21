import React from 'react';
import Feed from '../components/Feed';
import '../styles/App.css';

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-4">Home</h1>
      <Feed />
    </div>
  );
};

export default Home;
