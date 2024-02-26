import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutPage.css';


const stripePromise = loadStripe("pk_test_51OmDwQARlON62CXmxbObS09bJrOzU4WGMtwuFbjJizl8GhTmW4pgHrros9z3FecBbg66MOe7K5N0oOIbqlaSFFq800sxoEjHai");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
     
      return;
    }

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

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-section">
        {/* Shipping Information Inputs */}
        <h2>Shipping Information</h2>
        <input name="fullName" type="text" placeholder="Full Name" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="address" type="text" placeholder="Address" required onChange={handleChange} />
        <input name="city" type="text" placeholder="City" required onChange={handleChange} />
        <input name="state" type="text" placeholder="State" required onChange={handleChange} />
        <input name="zipCode" type="text" placeholder="Zip Code" required onChange={handleChange} />
      </div>
      <div className="form-section">
        {/* Payment Information Section */}
        <h2>Payment Information</h2>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>Place Order</button>
    </form>
  );
};

const CheckoutPage = () => (
  <div className="checkout-page">
    <h1>Checkout</h1>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default CheckoutPage;
