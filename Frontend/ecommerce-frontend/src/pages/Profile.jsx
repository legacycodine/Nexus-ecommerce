import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import Auth hook
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { orders } = useCart();
  const { user } = useAuth(); // 2. Get the real user data
  const navigate = useNavigate();

  // 3. Security: Redirect guest users to Login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent flicker before redirect

  // 4. Extract initials for the avatar (e.g., "Esther Ayooluwa" -> "EA")
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      {/* Profile Header - Now Dynamic */}
      <div className="flex items-center gap-4 mb-12 bg-black text-white p-8 rounded-3xl shadow-lg">
        <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-2xl font-black tracking-tighter">
          {getInitials(user.name)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400 text-sm">{user.email} | Member since 2026</p>
        </div>
      </div>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Order History</h2>
            <span className="bg-gray-100 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {orders.length} Total Orders
            </span>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-6 font-medium">You haven't placed any orders yet.</p>
            <button 
                onClick={() => navigate('/')}
                className="bg-black text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-gray-800 transition shadow-lg"
            >
                Explore Latest Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-widest">Order ID: {order.id.slice(-8)}</p>
                    <p className="text-sm text-gray-400">{order.date}</p>
                  </div>
                  <span className="bg-green-50 text-green-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                    {order.status}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 mb-4">
                  <p className="text-[10px] uppercase text-gray-400 font-black mb-3 tracking-widest">Package Contents</p>
                  <div className="text-sm text-gray-800 space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-medium">{item.qty}x {item.name}</span>
                        <span className="text-gray-400 font-mono">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-4">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Amount Paid</p>
                    <p className="font-black text-2xl tracking-tighter">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;