import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const PersonalInfo = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name);
          setEmail(userData.email);
          setPhone(userData.phone);
        }
      }
    };

    fetchUserInfo();
  }, [currentUser]);

  const handleUpdateProfile = async () => {
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
        phone: phone,
      }, { merge: true });
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError('There was a problem saving your changes. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="personal-info-section">
      <h2>Personal Information</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSaving}
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSaving}
      />
      <label>Phone:</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={isSaving}
      />
      <button onClick={handleUpdateProfile} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default PersonalInfo;
