import React, { useState } from 'react'; // MUST have this
import { Link } from 'react-router-dom'; // MUST have this
import { toast } from 'react-hot-toast';
import axios from 'axios'; // MUST have this

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data } = await axios.post('https://nexus-ecommerce-yu7k.onrender.com/api/auth/forgot-password', { email });
    
    // This will now show "Reset link sent to your email!" 
    // because that's what my authController returns in res.json
    toast.success(data.message); 

  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl">
        <h2 className="text-3xl font-black mb-2 tracking-tight">Reset Password.</h2>
        <p className="text-gray-400 mb-8 text-sm">
          Enter your email and we'll send you a link to get back into your account.
        </p>
        
        <form onSubmit={handleReset} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;