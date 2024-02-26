import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <h3>Wildlife Horizon</h3>
        <p>Join us in an adventure across the wild. Explore, learn, and protect the wonders of nature.</p>
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div className="footer-social-media">
        <a href="https://twitter.com/HorizonWildlife" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://instagram.com/HorizonWildlife" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Wildlife Horizon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
