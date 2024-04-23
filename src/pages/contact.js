import React from 'react';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any queries or would like to connect, feel free to reach out to us on our social media platforms.</p>
      
      <div className="contact-social-media">
        <a href="https://twitter.com/HorizonWildlife" 
           className="contact-social-link" 
           target="_blank" 
           rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://instagram.com/HorizonWildlife" 
           className="contact-social-link" 
           target="_blank" 
           rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
    </div>
  );
}

export default Contact;