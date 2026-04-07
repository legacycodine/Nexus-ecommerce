import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // --- CART LOGIC ---
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
    toast.success(`${product.name} added to cart!`);
  };

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

  const removeItemCompletely = (id) => {
    setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
    toast.error('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  // --- ORDER HISTORY LOGIC ---
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('nexus_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus_orders', JSON.stringify(orders));
  }, [orders]);

  const saveOrder = (orderDetails) => {
    const newOrder = {
      id: `NX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      status: 'Processing',
      ...orderDetails
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        decreaseQty, 
        removeItemCompletely,
        clearCart,
        orders,      // Shared with Profile page
        saveOrder    // Shared with Checkout page
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);