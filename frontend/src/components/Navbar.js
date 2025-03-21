import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Social Media</Link>
        <div>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/auth">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
