import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { ReactComponent as EyeIcon } from '../images/eye.svg'; 

// Component for changing the user's password
const ChangePassword = () => {
  // State hooks for managing password inputs and visibility toggles
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to validate password strength
  const passwordIsValid = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Regular expression for password validation
    return regex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if the new password is valid
    if (!passwordIsValid(newPassword)) {
      setError('Password must contain at least 8 characters, including a number and an uppercase letter.');
      return;
    }

    // Ensure the new password matches the confirmed password
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Re-authenticate user with the current password
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(user, credential); // Re-authenticates the current user
      await updatePassword(user, newPassword); // Updates the password
      setSuccess('Your password has been updated successfully.');
    } catch (error) {
      setError('Failed to update password. ' + error.message);
    }
  };

  // Render the form for password change
  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      <h2>Change Password</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="password-input-container">
        <input
          type={currentPasswordShown ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          required
        />
        <EyeIcon onClick={() => setCurrentPasswordShown(!currentPasswordShown)} className="password-toggle-icon" />
      </div>
      <div className="password-input-container">
        <input
          type={newPasswordShown ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <EyeIcon onClick={() => setNewPasswordShown(!newPasswordShown)} className="password-toggle-icon" />
      </div>
      <div className="password-input-container">
        <input
          type={confirmPasswordShown ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
        />
        <EyeIcon onClick={() => setConfirmPasswordShown(!confirmPasswordShown)} className="password-toggle-icon" />
      </div>
      <button type="submit">Update Password</button>
    </form>
  );
};

export default ChangePassword;
