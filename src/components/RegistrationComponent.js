import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../pages/registration';
import './RegistrationComponent.css';

export default function RegistrationComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = (event) => {
    event.preventDefault();
    registerUser(email, password, () => navigate('/login'));
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegistration} className="auth-form"> 
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
        <div className="auth-input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
