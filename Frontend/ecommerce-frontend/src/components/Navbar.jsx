import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import the Auth hook

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); // 2. Access user state and logout function
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      setSearchTerm(""); 
    }
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-xl font-black tracking-tight flex-shrink-0">
        NEXUS STORE
      </Link>
      
      {/* SEARCH BAR */}
      <form 
        onSubmit={handleSearch} 
        className="hidden md:flex flex-1 max-w-md mx-8"
      >
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full bg-gray-900 text-sm border border-gray-800 rounded-full px-5 py-2 focus:ring-2 focus:ring-white outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      
      {/* Links */}
      <div className="space-x-6 flex items-center flex-shrink-0">
        <Link to="/" className="hover:text-gray-400 transition text-sm font-medium">Home</Link>
        
        {/* 3. SMART AUTH LINK: Logic for showing Login vs Profile */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="hover:text-gray-400 transition text-sm font-medium">
              Profile
            </Link>
            <button 
              onClick={logout}
              className="text-[10px] uppercase font-bold bg-gray-800 px-2 py-1 rounded hover:bg-red-900 transition tracking-widest"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover:text-gray-400 transition text-sm font-medium">
            Login
          </Link>
        )}
        
        <Link to="/cart" className="relative hover:text-gray-400 transition flex items-center text-sm font-medium">
          Cart
          {cartCount > 0 && (
            <span className="ml-2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;