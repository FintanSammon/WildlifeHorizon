import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './Navbar.css';
import navLogo from '../images/navlogo.png';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const { cartItemCount } = useCart();
  const { currentUser } = useAuth();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false); 
  const [username, setUsername] = useState('');
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const fetchUsername = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        }
      }
    };

    fetchUsername();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutSuccess(true);
      setTimeout(() => {
        setShowLogoutSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {showLogoutSuccess && (
        <div className="logout-success-notification">
          You have successfully logged out.
        </div>
      )}
      <nav className="navbar">
        <Link to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={navLogo} alt="Home" className="home-icon" />
        </Link>

        <button className="hamburger navbar-button" onClick={() => setIsNavExpanded(!isNavExpanded)}>
          ☰
        </button>

        <div className={`nav-links ${isNavExpanded ? "nav-expanded" : ""}`}>
          <li><Link to="/" onClick={() => setIsNavExpanded(false)}>Home</Link></li>
          <li><Link to="/game" onClick={() => setIsNavExpanded(false)}>Game</Link></li>
          <li><Link to="/shop" onClick={() => setIsNavExpanded(false)}>Shop</Link></li>
          <li><Link to="/animals" onClick={() => setIsNavExpanded(false)}>Animals</Link></li>
          <li><Link to="/about" onClick={() => setIsNavExpanded(false)}>About</Link></li>
        </div>

        <div className="right-section">
          <Link to="/cart" onClick={() => setIsNavExpanded(false)}>
            <span className="cart-icon">🛒
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </span>
          </Link>

          <div className="profile-dropdown" onClick={toggleDropdown}>
            <FaUserCircle className="profile-icon" />
            {currentUser && <span className="username">Hi, {username || currentUser.email}</span>}
            {isDropdownVisible && (
              <div className="dropdown-content" ref={dropdownRef} aria-haspopup="true" aria-expanded={isDropdownVisible}>
                {!currentUser ? (
                  <>
                    <Link to="/login" onClick={() => setIsNavExpanded(false)}>Login</Link>
                    <Link to="/register" onClick={() => setIsNavExpanded(false)}>Register</Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" onClick={() => setIsNavExpanded(false)}>My Profile</Link>
                    <Link to="/likes" onClick={() => setIsNavExpanded(false)}>Liked Products</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
