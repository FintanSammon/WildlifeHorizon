import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import './RegistrationComponent.css';
import { ReactComponent as EyeIcon } from '../images/eye.svg';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function loginUser(event) {
    event.preventDefault();
    setError(''); 
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="full-page-container"> 
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={loginUser} className="auth-form">
          <div className="auth-input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus 
            />
          </div>
          <div className="auth-input-container password-input-container">
            <label htmlFor="password">Password:</label>
            <div className="password-field">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <EyeIcon onClick={() => setPasswordShown(!passwordShown)} className="password-toggle-icon" />
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
          <button onClick={() => navigate('/reset-password')} className="forgot-password-link">
            Forgot Password?
          </button>          
          <p className="auth-switch">
            Don't have an account?
            <button onClick={() => navigate('/register')} className="register-link">
              Register Here
            </button>          
          </p>
        </form>
      </div>
    </div>
  );
}