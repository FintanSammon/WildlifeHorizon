import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './CheckoutPage.css';

// Load Stripe
const stripePromise = loadStripe("pk_test_51OmDwQARlON62CXmxbObS09bJrOzU4WGMtwuFbjJizl8GhTmW4pgHrros9z3FecBbg66MOe7K5N0oOIbqlaSFFq800sxoEjHai");

// CheckoutForm component
const CheckoutForm = () => {
  const { currentUser } = useAuth(); // Accessing currentUser from AuthContext
  const stripe = useStripe();
  const elements = useElements();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Fetching user information from Firestore
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const addressRef = doc(db, 'Addresses', currentUser.uid);

        const [userSnap, addressSnap] = await Promise.all([
          getDoc(userRef),
          getDoc(addressRef)
        ]);

        if (userSnap.exists()) {
          const { name, email } = userSnap.data();
          setCustomerInfo(info => ({ ...info, fullName: name, email }));
        }

        if (addressSnap.exists() && addressSnap.data().shipping) {
          const { line1, line2, city, state, postalCode } = addressSnap.data().shipping;
          setCustomerInfo(info => ({
            ...info,
            addressLine1: line1,
            addressLine2: line2, 
            city,
            state,
            zipCode: postalCode,
          }));
        }
      }
    };

    fetchUserInfo();
  }, [currentUser]);

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: customerInfo.fullName,
        email: customerInfo.email,
      },
    });

    if (error) {
      console.log('[error]', error);
      alert(`Payment error: ${error.message}`);
    } else {
      console.log('PaymentMethod', paymentMethod);
      alert('Payment method successfully created. Proceeding to payment...');
    }
  };

  // JSX structure for the form
  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Shipping Information</h2>
      <input name="fullName" type="text" placeholder="Full Name" value={customerInfo.fullName} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={customerInfo.email} onChange={handleChange} required />
      <input name="addressLine1" type="text" placeholder="Address Line 1" value={customerInfo.addressLine1} onChange={handleChange} required />
      <input name="addressLine2" type="text" placeholder="Address Line 2" value={customerInfo.addressLine2} onChange={handleChange} /> 
      <input name="city" type="text" placeholder="City" value={customerInfo.city} onChange={handleChange} required />
      <input name="state" type="text" placeholder="State" value={customerInfo.state} onChange={handleChange} required />
      <input name="zipCode" type="text" placeholder="Zip Code" value={customerInfo.zipCode} onChange={handleChange} required />
      
      <h2>Payment Information</h2>
      <CardElement />
      <button type="submit" disabled={!stripe}>Place Order</button>
    </form>
  );
};

// CheckoutPage component
const CheckoutPage = () => (
  <div className="checkout-page">
    <h1>Checkout</h1>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default CheckoutPage;
