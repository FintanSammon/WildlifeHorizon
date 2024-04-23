import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth'; // Importing signOut function from Firebase authentication
import { auth, db } from '../firebase/firebaseConfig'; // Importing Firebase authentication and Firestore database
import { doc, getDoc } from 'firebase/firestore'; // Importing Firestore functions
import './Navbar.css'; // Importing styles
import navLogo from '../images/navlogo.png'; // Importing navigation logo
import { FaUserCircle } from 'react-icons/fa'; // Importing user circle icon

function Navbar() {
  // State variables to manage navigation, dropdown visibility, logout success notification, username
  const { cartItemCount } = useCart();
  const { currentUser } = useAuth();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false); 
  const [username, setUsername] = useState('');
  const dropdownRef = useRef(null); // Reference for dropdown menu

  // Effect to fetch and set the username when currentUser changes
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

  // Function to handle user logout
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

  // Function to toggle dropdown visibility
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Function to handle click outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  // Effect to add and remove click event listener for handling click outside dropdown
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // JSX structure for the navbar component
  return (
    <>
      {/* Notification for logout success */}
      {showLogoutSuccess && (
        <div className="logout-success-notification">
          You have successfully logged out.
        </div>
      )}
      {/* Navbar */}
      <nav className="navbar">
        {/* Home link */}
        <Link to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={navLogo} alt="Home" className="home-icon" />
        </Link>

        {/* Hamburger button for mobile view */}
        <button className="hamburger navbar-button" onClick={() => setIsNavExpanded(!isNavExpanded)}>
          ☰
        </button>

        {/* Navigation links */}
        <div className={`nav-links ${isNavExpanded ? "nav-expanded" : ""}`}>
          <li><Link to="/" onClick={() => setIsNavExpanded(false)}>Home</Link></li>
          <li><Link to="/game" onClick={() => setIsNavExpanded(false)}>Game</Link></li>
          <li><Link to="/shop" onClick={() => setIsNavExpanded(false)}>Shop</Link></li>
          <li><Link to="/animals" onClick={() => setIsNavExpanded(false)}>Animals</Link></li>
          <li><Link to="/about" onClick={() => setIsNavExpanded(false)}>About</Link></li>
        </div>

        {/* Right section containing cart icon and user dropdown */}
        <div className="right-section">
          {/* Cart link */}
          <Link to="/cart" onClick={() => setIsNavExpanded(false)}>
            <span className="cart-icon">🛒
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </span>
          </Link>

          {/* User profile dropdown */}
          <div className="profile-dropdown" onClick={toggleDropdown}>
            <FaUserCircle className="profile-icon" />
            {currentUser && <span className="username">Hi, {username || currentUser.email}</span>}
            {/* Dropdown content */}
            {isDropdownVisible && (
              <div className="dropdown-content" ref={dropdownRef} aria-haspopup="true" aria-expanded={isDropdownVisible}>
                {/* Display different options based on user authentication status */}
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
