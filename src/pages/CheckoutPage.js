import React, { useState } from 'react';
import './CheckoutPage.css'; 

const CheckoutPage = () => {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerInfo);
    alert('Checkout complete!'); 
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        {/* Shipping Information */}
        <div className="section">
          <h2>Shipping Information</h2>
          <input name="fullName" type="text" placeholder="Full Name" required onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          <input name="address" type="text" placeholder="Address" required onChange={handleChange} />
          <input name="city" type="text" placeholder="City" required onChange={handleChange} />
          <input name="state" type="text" placeholder="State" required onChange={handleChange} />
          <input name="zipCode" type="text" placeholder="Zip Code" required onChange={handleChange} />
        </div>

        {/* Payment Information */}
        <div className="section">
          <h2>Payment Information</h2>
          <select name="paymentMethod" required onChange={handleChange}>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          {customerInfo.paymentMethod === 'creditCard' && (
            <>
              <input name="cardNumber" type="text" placeholder="Card Number" required onChange={handleChange} />
              <input name="cardExpiry" type="text" placeholder="MM/YY" required onChange={handleChange} />
              <input name="cardCVV" type="text" placeholder="CVV" required onChange={handleChange} />
            </>
          )}
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
