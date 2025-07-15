import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/Axios";

export default function Featured_Product() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await AxiosInstance.get("/featured/");

      // Extract actual product objects from each featured item
      const extractedProducts = res.data.map((item) => item.product);

      setFeaturedProducts(extractedProducts);
    } catch (err) {
      console.error("Error fetching featured products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">🌟 Featured Products</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : featuredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No featured products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white text-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Stock</th>
                <th className="border px-4 py-2">Discount</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {featuredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{product.id}</td>
                  <td className="border px-4 py-2 text-center">
                    <img
                      src={product.image || "https://placehold.co/64x64?text=No+Image"}
                      alt={product.name}
                      className="h-16 w-16 object-cover mx-auto rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/64x64?text=No+Image";
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.category?.name || "N/A"}</td>
                  <td className="border px-4 py-2">{product.brand?.name || "N/A"}</td>
                  <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="border px-4 py-2 text-center">{product.stock_quantity}</td>
                  <td className="border px-4 py-2 text-center">
                    {product.discount ? `${product.discount}%` : "0%"}
                  </td>
                  <td className="border px-4 py-2">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
