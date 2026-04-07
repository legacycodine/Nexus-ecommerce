import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic Validation
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      // 2. Call your real Backend API
const { data } = await axios.post('http://localhost:5000/api/auth/register', {
  name: formData.name,
  email: formData.email,
  password: formData.password
});

      // 3. Success! Log them in immediately with the returned JWT
      login(data);
      toast.success(`Welcome to Nexus, ${data.name}! 🚀`);
      navigate('/profile');

    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl">
        <h2 className="text-3xl font-black mb-2 tracking-tight text-black">Join the Future.</h2>
        <p className="text-gray-400 mb-8 text-sm">Create your Nexus account in seconds.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Full Name" required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input 
            type="password" placeholder="Confirm Password" required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition transform active:scale-95 mt-4">
            Create Account
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Already a member? <Link to="/login" className="text-black font-bold underline hover:text-gray-600">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;