import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import './PasswordResetComponent.css';

export default function PasswordResetComponent() {
  // State variables to manage email, message, and error state
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Function to send password reset email
  const sendResetEmail = (event) => {
    event.preventDefault(); // Preventing default form submission behavior
    setMessage(''); // Clearing any previous messages
    setIsError(false); // Resetting error state
    // Sending password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Check your email for the password reset link.'); // Success message
      })
      .catch((error) => {
        setIsError(true); // Setting error state to true
        console.error(error.message); // Logging error message to console
        setMessage('Failed to send password reset email. Please make sure the email is correct and try again.'); // Error message
      });
  };

  // JSX structure for the password reset component
  return (
    <div className="auth-container1">
      <h2>Reset Password</h2>
      {/* Password reset form */}
      <form onSubmit={sendResetEmail} className="auth-form">
        {/* Displaying message with appropriate styling based on error state */}
        {message && <div className={`password-reset-message ${isError ? 'error' : 'info'}`}>{message}</div>}
        {/* Email input */}
        <div className="auth-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Updating email state on input change
            required
          />
        </div>
        {/* Button to send reset email */}
        <button type="submit" className="reset-email-button">Send Reset Email</button>
      </form>
    </div>
  );
}
