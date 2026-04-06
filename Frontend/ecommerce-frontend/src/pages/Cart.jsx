import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  // 1. Update the destructuring to include decreaseQty and removeItemCompletely
  const { cartItems, addToCart, decreaseQty, removeItemCompletely } = useCart();

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* List of Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4 gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  {/* Optional: Add a 'Remove' text button to delete the whole row */}
                  <button
                    onClick={() => removeItemCompletely(item._id)}
                    className="text-xs text-red-400 hover:underline mt-1"
                  >
                    Remove item
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3 border rounded-lg px-2">
                  {/* 2. Update this button to use decreaseQty */}
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="text-xl font-bold px-2 hover:text-red-500"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="text-xl font-bold px-2 hover:text-green-500"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold w-20 text-right">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items ({cartItems.length})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")} // Now it redirects!
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
