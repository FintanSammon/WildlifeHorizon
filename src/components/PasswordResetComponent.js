import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import './PasswordResetComponent.css';

export default function PasswordResetComponent() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const sendResetEmail = (event) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Check your email for the password reset link.');
      })
      .catch((error) => {
        setIsError(true);
        console.error(error.message);
        setMessage('Failed to send password reset email. Please make sure the email is correct and try again.');
      });
  };

  return (
    <div className="auth-container1">
      <h2>Reset Password</h2>
      <form onSubmit={sendResetEmail} className="auth-form">
        {message && <div className={`password-reset-message ${isError ? 'error' : 'info'}`}>{message}</div>}
        <div className="auth-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-email-button">Send Reset Email</button>
      </form>
    </div>
  );
}
