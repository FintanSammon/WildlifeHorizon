import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/">
          <span className="home-icon">🏠</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/animals">Animals</Link>
        </li>
      </ul>
      <div className="right-section">
        <Link to="/cart">
          {/* Optional: <FaShoppingCart className="cart-icon" /> If using react-icons */}
          <span className="cart-icon">🛒</span> {/* Use an emoji or image if not using react-icons */}
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
