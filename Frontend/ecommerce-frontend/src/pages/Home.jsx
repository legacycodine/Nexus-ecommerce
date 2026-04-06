import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/productApi";

const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();

  }, []);

  return (
    <MainLayout>
  {/* The 'container' and 'mx-auto' keeps the whole store centered and neat */}
  <div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-8 text-center">Latest Products</h1>
  
  {/* Ensure 'products' exists and has a length */}
  {products && products.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <p className="text-center">Loading products...</p>
  )}
</div>
</MainLayout>
  );
};

export default Home;