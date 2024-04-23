import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Context for user authentication
import { db } from '../firebase/firebaseConfig'; // Firebase database configuration
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore methods to handle documents

// AddressBook component using functional component style
const AddressBook = () => {
  // Hooks to access the current user from the AuthContext and manage state
  const { currentUser } = useAuth(); // Retrieves the current authenticated user
  const [addresses, setAddresses] = useState({ shipping: {}, billing: {} }); // State for storing address data
  const [message, setMessage] = useState(''); // State for storing status messages

  // Effect hook to fetch address data from Firestore when currentUser is available or changes
  useEffect(() => {
    if (currentUser) {
      const addressRef = doc(db, 'Addresses', currentUser.uid); // Reference to user-specific address document in Firestore
      getDoc(addressRef).then((docSnap) => {
        if (docSnap.exists()) {
          setAddresses(docSnap.data()); // Update state if document exists
        }
      });
    }
  }, [currentUser]);

  // Handler for changes to input fields, updates the relevant part of the address state
  const handleAddressChange = (e, type) => {
    setAddresses({
      ...addresses,
      [type]: {
        ...addresses[type],
        [e.target.name]: e.target.value, // Dynamically update the correct field based on input name
      },
    });
  };

  // Function to save the updated address to Firestore
  const saveAddress = (type) => {
    const addressRef = doc(db, 'Addresses', currentUser.uid); // Document reference
    setDoc(addressRef, { [type]: addresses[type] }, { merge: true }) // Set document with merge option to update partially
      .then(() => {
        setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} address saved successfully!`); // Success message
        setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
      })
      .catch((error) => {
        setMessage(`Failed to save address: ${error.message}`); // Error message
        setTimeout(() => setMessage(''), 6000); // Clear message after 6 seconds
      });
  };

  // JSX to render the AddressBook UI
  return (
    <div className="address-book">
      <h2>Address Book</h2>
      {message && <div>{message}</div> /* Display message if it exists */}

      {['shipping', 'billing'].map((type) => ( 
        <div key={type} className="address-section">
          <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Address</h3>
          {/* Input fields for address, one for each field like line1, line2, city, etc. */}
          <input type="text" name="line1" placeholder="Address Line 1" value={addresses[type]?.line1 || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="line2" placeholder="Address Line 2" value={addresses[type]?.line2 || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="city" placeholder="City" value={addresses[type]?.city || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="state" placeholder="Province" value={addresses[type]?.state || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="postalCode" placeholder="Postal Code" value={addresses[type]?.postalCode || ''} onChange={(e) => handleAddressChange(e, type)} />
          <input type="text" name="country" placeholder="Country" value={addresses[type]?.country || ''} onChange={(e) => handleAddressChange(e, type)} />
          <button onClick={() => saveAddress(type)}>Save {type.charAt(0).toUpperCase() + type.slice(1)} Address</button> {/* Button to trigger address save*/}
        </div>
      ))}
    </div>
  );
};

export default AddressBook;