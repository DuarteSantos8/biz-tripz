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
      <div className="header-image">
        <h1 className="header-title">Biz-Tripz</h1>
      </div>
      {user ? (
        <button onClick={handleLogout} className="logout-button">Logout</button>
    ) : (
        <Link to="/login" className="login-button">Anmelden</Link>
      )}
    </header>
  );
}

export default Header;