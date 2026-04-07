import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { orders } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      {/* 1. Profile Header - Gives it that "Account" feel */}
      <div className="flex items-center gap-4 mb-12 bg-black text-white p-8 rounded-3xl shadow-lg">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold">
          EA
        </div>
        <div>
          <h1 className="text-2xl font-bold">Esther Ayooluwa</h1>
          <p className="text-gray-400 text-sm">Lagos, Nigeria | Customer since 2026</p>
        </div>
      </div>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Order History</h2>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                {orders.length} Orders
            </span>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <button 
                onClick={() => navigate('/')}
                className="bg-black text-white px-6 py-2 rounded-xl text-sm"
            >
                Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-mono text-blue-600 mb-1">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                    {order.status}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs uppercase text-gray-400 font-bold mb-2">Items Purchased</p>
                  <div className="text-sm text-gray-800 space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.qty}x {item.name}</span>
                        <span className="text-gray-400">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <p className="text-gray-500 text-sm">Total Paid</p>
                    <p className="font-black text-xl">${order.total.toFixed(2)}</p>
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