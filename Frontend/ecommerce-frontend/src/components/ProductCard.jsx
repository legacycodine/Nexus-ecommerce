import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    /* This 'max-w-[300px]' is the secret to stopping the card from being too wide */
    <div className="max-w-[300px] mx-auto rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* Container for the image with a fixed height */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 text-center">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 truncate">
          {product.name}
        </h5>
        
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4">
          <p className="text-xl font-bold text-gray-900 mb-2">${product.price}</p>
          <button className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;