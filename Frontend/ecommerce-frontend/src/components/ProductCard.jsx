import React from 'react';
import { useCart } from '../context/CartContext'; // 1. Import the hook

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // 2. Pull the function from context

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold">${product.price}</span>
        <button 
          onClick={() => addToCart(product)} // 3. Link the click to the function
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;