import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/Axios";
import { Link } from "react-router-dom";


const AdminWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await AxiosInstance.get("admin/wishlist/");
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

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return <div className="text-center mt-10 text-gray-600">No wishlist items found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white rounded-lg">
      <h1 className="text-4xl font-bold mb-6">Admin Wishlist</h1>
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-600 px-4 py-2 text-left">User Email</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Product Name</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((item) => (
            <tr key={item.id} className="hover:bg-gray-800">
              <td className="border border-gray-700 px-4 py-2">{item.id}</td>
              <td className="border border-gray-700 px-4 py-2">{item.user.email}</td>
              <td className="border border-gray-700 px-4 py-2">{item.product.name}</td>
              <td className="border border-gray-700 px-4 py-2">
                <Link
                  to={`/admin/user-wishlist/${item.user.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  View Wishlist
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWishlist;

