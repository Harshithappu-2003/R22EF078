import React from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import '../styles/Auth.css';

const AuthPage = () => {
  return (
    <div className="auth-container">
      <Login />
      <Signup />
    </div>
  );
};

export default AuthPage;
