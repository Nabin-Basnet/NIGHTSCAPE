import React, { useEffect, useState } from "react";
import AxiosInstance from "../Components/Axios";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCartId, setAddingToCartId] = useState(null); // to show loading on add-to-cart

  const fetchWishlist = async () => {
    try {
      const res = await AxiosInstance.get("/wishlist/");
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await AxiosInstance.delete(`/wishlist/${itemId}/`);
      setWishlist((prev) => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const handleAddToCart = async (productId, wishlistItemId) => {
    try {
      setAddingToCartId(wishlistItemId);
      // Assuming your backend API for adding to cart accepts { product: productId, quantity: 1 }
      await AxiosInstance.post("/cart/", { product: productId, quantity: 1 });
      // Optionally remove from wishlist after adding to cart
      await AxiosInstance.delete(`/wishlist/${wishlistItemId}/`);
      setWishlist((prev) => prev.filter(item => item.id !== wishlistItemId));
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setAddingToCartId(null);
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-900 min-h-screen rounded-lg">
      <h2 className="text-4xl font-extrabold mb-10 text-white">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-400 text-lg text-center mt-20">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-green-400 font-bold text-lg mb-2">Rs. {item.product.price}</p>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {item.product.description || "No description available."}
                  </p>
                </div>

                <div className="mt-5 flex justify-between items-center">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => handleAddToCart(item.product.id, item.id)}
                    disabled={addingToCartId === item.id}
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {addingToCartId === item.id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>

                <Link
                  to={`/products/${item.product.id}`}
                  className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-600 underline"
                >
                  View Product Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
