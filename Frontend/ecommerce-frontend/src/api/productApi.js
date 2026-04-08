import axios from "axios";

const API_URL = "https://nexus-ecommerce-yu7k.onrender.com/api/products";

export const fetchProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data.products || data;
};