import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import './Navbar.css';
import navLogo from '../images/navlogo.png';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const { cartItemCount } = useCart();
  const { currentUser } = useAuth();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  return (
    <nav className="navbar">
      <Link to="/" onClick={() => setIsNavExpanded(false)}>
        <img src={navLogo} alt="Home" className="home-icon" />
      </Link>

      <button className="hamburger" onClick={() => setIsNavExpanded(!isNavExpanded)}>
        ☰
      </button>

      <div className={`nav-links ${isNavExpanded ? "nav-expanded" : ""}`}>
        <li><Link to="/" onClick={() => setIsNavExpanded(false)}>Home</Link></li>
        <li><Link to="/game" onClick={() => setIsNavExpanded(false)}>Game</Link></li>
        <li><Link to="/shop" onClick={() => setIsNavExpanded(false)}>Shop</Link></li>
        <li><Link to="/animals" onClick={() => setIsNavExpanded(false)}>Animals</Link></li>
      </div>

      <div className="right-section">
        <Link to="/cart" onClick={() => setIsNavExpanded(false)}>
          <span className="cart-icon">🛒</span>
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </Link>

        {/* Profile Icon and Dropdown */}
        <div className="profile-dropdown" onClick={toggleDropdown}>
          <FaUserCircle className="profile-icon" />
          {isDropdownVisible && (
            <div className="dropdown-content">
              {!currentUser ? (
                <>
                  <Link to="/login" onClick={() => setIsNavExpanded(false)}>Login</Link>
                  <Link to="/register" onClick={() => setIsNavExpanded(false)}>Register</Link>
                </>
              ) : (
                <button onClick={handleLogout}>Logout</button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;