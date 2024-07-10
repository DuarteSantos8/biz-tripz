import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <div className="header-image">
            <h1 className="header-title">Biz-Tripz</h1>
            {user && <span className="welcome-message">Welcome back, {user.username}</span>}
          </div>
        </div>
        <div className="hamburger-menu">
          <button onClick={toggleMenu} className="hamburger-button">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            {user && <Link to="/my-trips" onClick={() => setIsMenuOpen(false)}>My Trips</Link>}
            {user ? (
              <>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
