import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const PersonalInfo = () => {
  const { currentUser } = useAuth(); // Accessing current user from authentication context
  // State variables to manage user's personal information, saving state, error message, and success message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Effect to fetch user's information when currentUser changes
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid); // Creating reference to user document in Firestore
        const userSnap = await getDoc(userRef); // Getting the document snapshot
        if (userSnap.exists()) {
          const userData = userSnap.data(); // Extracting user data from the snapshot
          setName(userData.name); // Setting user's name
          setEmail(userData.email); // Setting user's email
          setPhone(userData.phone); // Setting user's phone number
        }
      }
    };

    fetchUserInfo(); // Fetching user's information
  }, [currentUser]); // Running the effect whenever currentUser changes

  // Function to handle updating user's profile
  const handleUpdateProfile = async () => {
    setError(''); // Clearing any previous error messages
    setSuccess(''); // Clearing any previous success messages
    setIsSaving(true); // Setting saving state to true

    try {
      const userRef = doc(db, 'users', currentUser.uid); // Creating reference to user document in Firestore
      // Updating user document with new profile information
      await setDoc(userRef, {
        name: name,
        email: email,
        phone: phone,
      }, { merge: true }); // Merging new data with existing document data
      setSuccess('Profile updated successfully.'); // Setting success message
    } catch (err) {
      setError('There was a problem saving your changes. Please try again.'); // Setting error message
      console.error(err); // Logging error to console
    } finally {
      setIsSaving(false); // Setting saving state back to false after operation completes
    }
  };

  // JSX structure for the personal information component
  return (
    <div className="personal-info-section">
      <h2>Personal Information</h2>
      {/* Displaying error message if present */}
      {error && <p className="error-message">{error}</p>}
      {/* Displaying success message if present */}
      {success && <p className="success-message">{success}</p>}
      {/* Input fields for name, email, and phone number */}
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // Updating name state on input change
        disabled={isSaving} // Disabling input field while saving
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Updating email state on input change
        disabled={isSaving} // Disabling input field while saving
      />
      <label>Phone:</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} // Updating phone state on input change
        disabled={isSaving} // Disabling input field while saving
      />
      {/* Button to save changes, with label updated based on saving state */}
      <button onClick={handleUpdateProfile} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default PersonalInfo;
