import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems((currentItems) => {
      const itemIndex = currentItems.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        
        const newItems = [...currentItems];
        newItems[itemIndex].quantity += quantity;
        return newItems;
      } else {
        
        return [...currentItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => currentItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartItemCount 
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
