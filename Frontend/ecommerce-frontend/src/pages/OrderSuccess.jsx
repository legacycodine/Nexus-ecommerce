import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  // Generate a random Order ID for the "real" feel
  const orderId = Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 text-lg mb-2">Thank you for shopping with Nexus Store.</p>
      <p className="text-sm font-mono text-gray-400 mb-8">Order ID: #NX-{orderId}</p>

      <div className="bg-gray-50 p-6 rounded-2xl max-w-md w-full mb-8 border border-gray-100">
        <h3 className="font-bold mb-2">What happens next?</h3>
        <p className="text-sm text-gray-500">
          We’ve sent a confirmation email to your inbox. Our team in Lagos is currently preparing your package for dispatch.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
        <Link 
          to="/profile" 
          className="bg-white border border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
        >
          View Order History
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;