import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <span className="logo-icon">🌍</span>
            <span className="logo-text">TKS Travel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/events" className="nav-link">
              Events
            </Link>
            <Link to="/blogs" className="nav-link">
              Blog
            </Link>
          </div>

          {/* Auth Section */}
          <div className="navbar-auth">
            {isAuthenticated ? (
              <div className="profile-menu">
                <button
                  className="profile-button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <img
                    src={user?.profilePicture}
                    alt={user?.name}
                    className="profile-avatar"
                  />
                  <span className="profile-name">{user?.name}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <FiUser /> My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FiSettings /> Admin Dashboard
                      </Link>
                    )}
                    <button className="dropdown-item" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">
                  Login
                </Link>
                <Link to="/register" className="btn-register">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-link" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link
              to="/events"
              className="mobile-link"
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link to="/blogs" className="mobile-link" onClick={closeMobileMenu}>
              Blog
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="mobile-link"
                  onClick={closeMobileMenu}
                >
                  My Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="mobile-link"
                    onClick={closeMobileMenu}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button className="mobile-link" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-link"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mobile-link"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;