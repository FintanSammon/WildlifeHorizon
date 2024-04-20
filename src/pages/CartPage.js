import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const calculateTotal = (items) => {
    const total = items.reduce((total, item) => total + item.price * item.quantity, 0);
    return discountApplied ? total - discountAmount : total;
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { discountCode, discountAmount } });
  };

  const applyDiscount = () => {
    if (discountCode === "WLH" && !discountApplied) {
      setDiscountAmount(10);  // Flat discount for demonstration
      setDiscountApplied(true);
      alert('Discount applied successfully!');
    } else if (discountApplied) {
      alert('Discount already applied');
    } else {
      alert('Invalid discount code');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">Price: €{item.price}</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <input
          type="text"
          placeholder="Discount Code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="discount-input"
        />
        <button onClick={applyDiscount} className="apply-discount-btn">
          Apply Discount
        </button>
        <p className="cart-total">Total Cost: €{calculateTotal(cartItems).toFixed(2)}</p>
        <button onClick={handleCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
