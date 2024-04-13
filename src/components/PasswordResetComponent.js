import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import './RegistrationComponent.css';

export default function PasswordResetComponent() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendResetEmail = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Check your email for the password reset link.');
      })
      .catch((error) => {
        console.error(error.message);
        setMessage('Failed to send password reset email. Please try again.');
      });
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      {message && <div>{message}</div>}
      <form onSubmit={sendResetEmail} className="auth-form">
        <div className="auth-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Email</button>
      </form>
    </div>
  );
}
