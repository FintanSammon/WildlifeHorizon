import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import './RegistrationComponent.css';

export default function RegistrationComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    setErrorMessage('');
  
    if (!isPasswordValid(password)) {
      setErrorMessage('Password must be at least 8 characters long, include at least one uppercase letter, and one number.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
      });
  
      await signOut(auth);
  
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleRegistration} className="auth-form">
        <div className="auth-input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <p className="auth-switch">
          Already registered? 
          <button type="button" onClick={() => navigate('/login')}>Log in</button>
        </p>
      </form>
    </div>
  );
}
export default RegistrationComponent;