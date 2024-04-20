import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AddressBook = () => {
  const { currentUser } = useAuth();
  const [addresses, setAddresses] = useState({ shipping: {}, billing: {} });
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    if (currentUser) {
      const addressRef = doc(db, 'Addresses', currentUser.uid);
      getDoc(addressRef).then((docSnap) => {
        if (docSnap.exists()) {
          setAddresses(docSnap.data());
        }
      });
    }
  }, [currentUser]);

  const handleAddressChange = (e, type) => {
    setAddresses({
      ...addresses,
      [type]: {
        ...addresses[type],
        [e.target.name]: e.target.value,
      },
    });
  };

  const saveAddress = (type) => {
    const addressRef = doc(db, 'Addresses', currentUser.uid);
    setDoc(addressRef, { [type]: addresses[type] }, { merge: true })
      .then(() => {
        setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} address saved successfully!`);
        setTimeout(() => setMessage(''), 5000);
      })
      .catch((error) => {
        setMessage(`Failed to save address: ${error.message}`);
        setTimeout(() => setMessage(''), 6000);
      });
  };

  return (
    <div className="address-book">
      <h2>Address Book</h2>
      {message && <div>{message}</div>}  
      {['shipping', 'billing'].map((type) => (
        <div key={type} className="address-section">
          <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Address</h3>
          <input type="text" name="line1" placeholder="Address Line 1" value={addresses[type]?.line1 || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="line2" placeholder="Address Line 2" value={addresses[type]?.line2 || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="city" placeholder="City" value={addresses[type]?.city || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="state" placeholder="Province" value={addresses[type]?.state || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="postalCode" placeholder="Postal Code" value={addresses[type]?.postalCode || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="country" placeholder="Country" value={addresses[type]?.country || ''} onChange={(e) => handleAddressChange(e, type)} />
          <button onClick={() => saveAddress(type)}>Save {type.charAt(0).toUpperCase() + type.slice(1)} Address</button>
        </div>
      ))}
    </div>
  );
};

export default AddressBook;
