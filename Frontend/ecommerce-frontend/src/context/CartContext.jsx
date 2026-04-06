import { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the Provider
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if it exists, otherwise empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adds an item or increases quantity by 1
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x._id === product._id);
      
      if (existItem) {
        return prevItems.map((x) =>
          x._id === product._id ? { ...existItem, qty: existItem.qty + 1 } : x
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  // Decreases quantity by 1, or removes if qty is 1
  const decreaseQty = (id) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x._id === id);
      
      if (existItem.qty === 1) {
        return prevItems.filter((x) => x._id !== id);
      }
      
      return prevItems.map((x) =>
        x._id === id ? { ...existItem, qty: existItem.qty - 1 } : x
      );
    });
  };

  // Removes the item entirely (Trash can functionality)
  const removeItemCompletely = (id) => {
    setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        decreaseQty, 
        removeItemCompletely 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useCart = () => useContext(CartContext);