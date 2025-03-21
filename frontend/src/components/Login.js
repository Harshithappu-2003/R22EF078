import React from 'react';
import '../styles/Auth.css';

const Login = () => {
  return (
    <div className="auth-box">
      <h2>Login</h2>
      <input type="text" placeholder="Email" className="form-control mb-2" />
      <input type="password" placeholder="Password" className="form-control mb-2" />
      <button className="btn btn-primary">Login</button>
    </div>
  );
};

export default Login;
