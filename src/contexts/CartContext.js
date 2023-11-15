import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Hook to use cart context
export const useCart = () => useContext(CartContext);

// Provider component that wraps your app and makes the cart object available to any child component that calls useCart().
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems((currentItems) => {
      // Check if the item is already in the cart
      const itemIndex = currentItems.findIndex(item => item.id === product.id);
      
      if (itemIndex > -1) {
        // If the item is already in the cart, update the quantity
        const newItems = [...currentItems];
        newItems[itemIndex].quantity += quantity;
        return newItems;
      } else {
        // If the item is not in the cart, add it
        return [...currentItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => {
      return currentItems.filter(item => item.id !== productId);
    });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
