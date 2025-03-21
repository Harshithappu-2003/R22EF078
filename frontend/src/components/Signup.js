import React from 'react';
import '../styles/Auth.css';

const Signup = () => {
  return (
    <div className="auth-box">
      <h2>Signup</h2>
      <input type="text" placeholder="Username" className="form-control mb-2" />
      <input type="email" placeholder="Email" className="form-control mb-2" />
      <input type="password" placeholder="Password" className="form-control mb-2" />
      <button className="btn btn-success">Signup</button>
    </div>
  );
};

export default Signup;
