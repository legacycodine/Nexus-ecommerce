import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../api/productApi'; // Reusing your fetch function

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProducts();
      const foundProduct = data.find((p) => p._id === id);
      setProduct(foundProduct);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/" className="text-gray-500 hover:text-black mb-8 inline-block">
        ← Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800">${product.price}</p>
          <div className="border-t border-b py-6">
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;