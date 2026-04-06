import React from 'react';
import { Link } from 'react-router-dom'; // 1. Added Link for navigation
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full transition-shadow hover:shadow-md">
      {/* 2. Wrapped the Image and Title in a Link for the "Bolder View" */}
      <Link to={`/product/${product._id}`} className="group cursor-pointer">
        <div className="overflow-hidden rounded-lg mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-black transition-colors">
          {product.name}
        </h3>
      </Link>

      <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold">${product.price}</span>
        <button 
          onClick={() => addToCart(product)} 
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;