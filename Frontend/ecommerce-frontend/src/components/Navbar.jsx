import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 1. Import the hook

const Navbar = () => {
  const { cartItems } = useCart(); // 2. Access the cartItems array

  // 3. Calculate total number of items
  // This sums up the 'qty' of every item so that adding 2 of the same 
  // item shows "2" instead of "1".
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-xl font-bold tracking-tight">
        NEXUS STORE
      </Link>
      
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-gray-400 transition">Home</Link>
        
        <Link to="/cart" className="relative hover:text-gray-400 transition flex items-center">
          Cart
          {/* 4. Only show the badge if there are items in the cart */}
          {cartCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        
        <Link to="/login" className="hover:text-gray-400 transition">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;