import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  // 1. Pull clearCart from useCart
  const { cartItems, clearCart } = useCart(); 
  const navigate = useNavigate();
  
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. Logic Flow for Order Completion
    
    // A. Show the Success notification
    toast.success('Order Placed Successfully! 🚀', {
      duration: 5000,
      icon: '📦',
    });

    // B. Wipe the cart clean (updates Navbar and LocalStorage)
    clearCart();

    // C. Redirect to home after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty!</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Shipping Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                placeholder="Esther Ayooluwa"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input 
                type="email" required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                placeholder="esther@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shipping Address</label>
              <input 
                type="text" required
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                placeholder="123 Lekki Phase 1, Lagos"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input 
                  type="text" required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                  placeholder="Lagos"
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input 
                  type="tel" required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                  placeholder="+234..."
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition mt-6"
            >
              Complete Purchase (${total.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-gray-50 p-8 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-6">Your Order</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-200 text-xs font-bold px-2 py-1 rounded-full">{item.qty}x</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-gray-600">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total to Pay</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center italic">
            Secure Encrypted Checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;