import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; 
import './Navbar.css';
import navLogo from '../images/navlogo.png'; // Import the image


function Navbar() {
  const { cartItemCount } = useCart();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const closeNav = () => {
    setIsNavExpanded(false);
  };

  return (
    <nav className="navbar">
        <Link to="/" onClick={closeNav}>
        <img src={navLogo} alt="Home" className="home-icon" /> {/* Use the image here */}
        </Link>
      
      {/* Hamburger Icon */}
      <button
        className="hamburger"
        onClick={toggleNav}
        aria-label="Menu"
        aria-expanded={isNavExpanded}
      >
        ☰
      </button>
      
      <div className={`nav-links ${isNavExpanded ? "nav-expanded" : ""}`}>
        <li>
          <Link to="/" onClick={closeNav}>Home</Link>
        </li>
        <li>
          <Link to="/game" onClick={closeNav}>Game</Link>
        </li>
        <li>
          <Link to="/shop" onClick={closeNav}>Shop</Link>
        </li>
        <li>
          <Link to="/animals" onClick={closeNav}>Animals</Link>
        </li>
      </div>
      
      <div className="right-section">
        <Link to="/cart" onClick={closeNav}>
          <span className="cart-icon">🛒</span>
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>} 
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;