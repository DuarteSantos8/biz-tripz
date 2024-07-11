import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <h1 className="header-title">Biz-Tripz</h1>
          {user && <span className="welcome-message">Welcome, {user.username}</span>}
        </div>
        <nav className="menu">
          <Link to="/">Home</Link>
          {user && <Link to="/my-trips">My Trips</Link>}
          {user ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;