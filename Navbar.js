import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          EventHub
        </Link>

        <div className="navbar-links">
          <Link to="/events" className="nav-link">
            Events
          </Link>

          {currentUser ? (
            <>
              <Link to="/create-event" className="nav-link">
                Create Event
              </Link>
              {currentUser.role === 'admin' && (
                <>
                  <Link to="/create-venue" className="nav-link">
                    Create Venue
                  </Link>
                  <Link to="/admin" className="nav-link">
                    Admin
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;