import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/productApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the search term from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchString = queryParams.get("search") || "";

  // Defined Categories
  const categories = ["All", "Electronics", "Apparel", "Accessories"];

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    loadProducts();
  }, []);

  // Filter logic for both Search Bar and Category Pills
  useEffect(() => {
    if (searchString) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchString.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchString.toLowerCase()))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchString, products]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Dynamic Header */}
      <h1 className="text-3xl font-bold mb-4 text-center uppercase tracking-widest">
        {searchString ? `Results for: ${searchString}` : "Latest Products"}
      </h1>

      {/* --- CATEGORY PILLS --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => {
          const isActive = 
            (cat === "All" && !searchString) || 
            searchString.toLowerCase() === cat.toLowerCase();

          return (
            <button
              key={cat}
              onClick={() => navigate(cat === "All" ? "/" : `/?search=${cat}`)}
              className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300
                ${isActive 
                  ? "bg-black text-white border-black shadow-md scale-105" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
      
      {/* Product Grid */}
      {products.length > 0 ? (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-xl text-gray-400">No products found matching your search.</p>
              <button 
                onClick={() => navigate("/")}
                className="mt-4 bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-gray-500 font-medium">Curating the collection...</p>
        </div>
      )}
    </div>
  );
};

export default Home;