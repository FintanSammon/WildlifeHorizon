import React from 'react';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
