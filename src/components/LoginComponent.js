import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import './RegistrationComponent.css';
import { ReactComponent as EyeIcon } from '../images/eye.svg';

export default function LoginComponent() {
  // State variables to manage email, password, password visibility, error message, and navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle user login
  function loginUser(event) {
    event.preventDefault(); // Preventing default form submission behavior
    setError(''); // Clearing any previous error messages
    signInWithEmailAndPassword(auth, email, password) // Signing in with provided email and password
      .then((userCredential) => {
        navigate('/'); // Navigating to home page upon successful login
      })
      .catch((error) => {
        setError(error.message); // Setting error message in case of login failure
      });
  }

  // JSX structure for the login form
  return (
    <div className="full-page-container"> 
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Displaying error message if any */}
        <form onSubmit={loginUser} className="auth-form"> {/* Calling loginUser function on form submission */}
          <div className="auth-input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Updating email state on input change
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
                onChange={(e) => setPassword(e.target.value)} // Updating password state on input change
                required
              />
              <EyeIcon onClick={() => setPasswordShown(!passwordShown)} className="password-toggle-icon" /> {/* Toggle password visibility */}
            </div>
          </div>
          <button type="submit" className="login-button">Login</button> {/* Login button */}
          <button onClick={() => navigate('/reset-password')} className="forgot-password-link">
            Forgot Password? {/* Link to reset password page */}
          </button>          
          <p className="auth-switch">
            Don't have an account?
            <button onClick={() => navigate('/register')} className="register-link">
              Register Here {/* Link to registration page */}
            </button>          
          </p>
        </form>
      </div>
    </div>
  );
}
