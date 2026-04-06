import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">

      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg" 
        />
      </Link>

      <div className="p-4">

        <h2 className="font-semibold text-lg mb-2">
          {product.name}
        </h2>

        <p className="text-gray-600 mb-3">
          ${product.price}
        </p>

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;