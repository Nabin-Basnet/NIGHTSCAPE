import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AxiosInstance from "../../Components/Axios";

const UserWishlistDetails = () => {
  const { userId } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserWishlist = async () => {
    try {
      const res = await AxiosInstance.get(`/admin/user-wishlist/${userId}/`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching user wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserWishlist();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading user wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return <div className="text-center mt-10 text-gray-600">This user has no wishlist items.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Wishlist for User ID: {userId}</h1>
      <Link to="/admin/wishlists" className="inline-block mb-4 text-blue-400 hover:underline">
        &larr; Back to all wishlists
      </Link>
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-4 py-2">Image</th>
            <th className="border border-gray-600 px-4 py-2">Product Name</th>
            <th className="border border-gray-600 px-4 py-2">Description</th>
            <th className="border border-gray-600 px-4 py-2">Category</th>
            <th className="border border-gray-600 px-4 py-2">Brand</th>
            <th className="border border-gray-600 px-4 py-2">Price</th>
            <th className="border border-gray-600 px-4 py-2">Added At</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((item) => (
            <tr key={item.id} className="hover:bg-gray-800 align-top">
              <td className="border border-gray-700 px-4 py-2">
                {item.product.images && item.product.images.length > 0 ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded text-gray-400">
                    No Image
                  </div>
                )}
              </td>
              <td className="border border-gray-700 px-4 py-2">{item.product.name}</td>
              <td className="border border-gray-700 px-4 py-2 max-w-xs">{item.product.description}</td>
              <td className="border border-gray-700 px-4 py-2">{item.product.category?.name || "N/A"}</td>
              <td className="border border-gray-700 px-4 py-2">{item.product.brand?.name || "N/A"}</td>
              <td className="border border-gray-700 px-4 py-2">${item.product.price?.toFixed(2) || "N/A"}</td>
              <td className="border border-gray-700 px-4 py-2">{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserWishlistDetails;
