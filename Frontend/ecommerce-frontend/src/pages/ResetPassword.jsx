import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams(); // Gets the secret token from the URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords don't match");

    try {
      // This matches your /api/auth route structure
      await axios.put(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      toast.success("Password updated successfully!");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Link expired or invalid");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl">
        <h2 className="text-3xl font-black mb-2">New Password.</h2>
        <p className="text-gray-400 mb-8 text-sm">Enter a strong password you won't forget.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="New Password" required
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-[10px] font-black uppercase text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input 
            type="password" placeholder="Confirm New Password" required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;