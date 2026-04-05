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

      <h1 className="text-3xl font-bold mb-6">
        Latest Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

      </div>

    </MainLayout>
  );
};

export default Home;