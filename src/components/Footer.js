// components/Footer.js

import React from 'react';
import './Footer.css'; // Link to the CSS file for styling

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <h3>Wildlife Horizon</h3>
        <p>Join us in an adventure across the wild. Explore, learn, and protect the wonders of nature.</p>
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
      <div className="footer-social-media">
        {/* Add social media icons with links here */}
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Wildlife Horizon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
