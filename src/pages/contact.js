import React from 'react';
import './contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feedback, or need support, please don't hesitate to reach out to us. We're here to help!</p>
      
      <div className="contact-details">
        <h2>Email Us</h2>
        <p>For general inquiries, please email us at: <a href="mailto:HorizonWildlife1@gmail.com">HorizonWildlife1@gmail.com</a></p>
        
        <h2>Follow Us</h2>
        <p>Stay updated and connect with us on our social platforms:</p>
        <div className="social-links">
          <a href="https://twitter.com/HorizonWildlife" className="social-link">Twitter</a>
          <a href="https://instagram.com/HorizonWildlife" className="social-link">Instagram</a>
        </div>
      </div>
      
      <div className="feedback-section">
        <h2>Feedback</h2>
        <p>We value your feedback to improve Horizon Wildlife. Please share your thoughts and suggestions with us.</p>
        <form>
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea id="feedback" name="feedback" rows="5" placeholder="Enter your feedback here..."></textarea>
          </div>
          <button type="submit" className="submit-button">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
