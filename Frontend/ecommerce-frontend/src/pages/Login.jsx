import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    // 1. Send the real data to your backend
    const { data } = await axios.post('http://localhost:5000/api/users/login', {
      email,
      password,
    });

    // 2. If successful, log them in with the real data (including the JWT token)
    login(data); 
    toast.success(`Welcome back, ${data.name}!`);
    navigate('/profile');
    
  } catch (error) {
    // 3. If the password is wrong, this block catches the error
    const message = error.response?.data?.message || "Login failed";
    toast.error(message); // Now it will say "Invalid email or password"
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        <h2 className="text-3xl font-black mb-2">Welcome Back.</h2>
        <p className="text-gray-400 mb-8">Login to manage your orders and profile.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="Email Address" required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition">
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          New here? <Link to="/register" className="text-black font-bold underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;