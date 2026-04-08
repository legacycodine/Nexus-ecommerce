import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggle
  const [loading, setLoading] = useState(false); // State for button loading
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Send the real data to your backend
      const { data } = await axios.post('https://nexus-ecommerce-yu7k.onrender.com/api/auth/login', {
  email,
  password,
});

      // 2. If successful, log them in
      login(data); 
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/profile');
      
    } catch (error) {
      // 3. Handle specific error messages from backend
      const message = error.response?.data?.message || "Login failed. Please check your connection.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl">
        <h2 className="text-3xl font-black mb-2 tracking-tight">Welcome Back.</h2>
        <p className="text-gray-400 mb-8 text-sm">Login to manage your orders and profile.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input with Show/Hide Toggle */}
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right px-1">
            <Link 
              to="/forgot-password" 
              className="text-xs font-bold text-gray-400 hover:text-black transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          New here? <Link to="/register" className="text-black font-bold underline hover:text-gray-700">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;