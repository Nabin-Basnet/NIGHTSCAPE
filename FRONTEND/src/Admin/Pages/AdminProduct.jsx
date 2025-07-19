"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../Components/Axios";
import { ADD_PRODUCT } from "../Constants/AdminMenu";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaSpinner,
  FaBoxOpen,
} from "react-icons/fa";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = (searchTerm) => {
    setLoading(true);
    AxiosInstance.get("products/", { params: { search: searchTerm } })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  const handleEdit = (product) => {
    navigate(`/admin/update-product/${product.id}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await AxiosInstance.delete(`products/${productId}/`);
        fetchProducts(search);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="p-6 bg-white text-gray-800 min-h-screen rounded-lg shadow-lg border border-gray-200">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => navigate(`/admin/${ADD_PRODUCT}`)}
          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-transform duration-300 hover:scale-105"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      {/* Search Box */}
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search products by name..."
          className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <FaSpinner className="animate-spin text-orange-500 w-8 h-8 mr-2" />
          <span className="text-gray-600 text-lg">Loading products...</span>
        </div>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-center">Featured</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3 font-medium">{p.id}</td>
                  <td className="px-4 py-3">
                    <img
                      src={p.image || "/placeholder.svg"}
                      alt={p.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg";
                      }}
                      className="w-14 h-14 object-cover rounded-md border border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{p.category?.name || "N/A"}</td>
                  <td className="px-4 py-3">{p.brand?.name || "N/A"}</td>
                  <td className="px-4 py-3 text-green-600">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{p.stock_quantity}</td>
                  <td className="px-4 py-3">{p.discount || 0}%</td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {p.description || "No description"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.featured ? (
                      <span className="text-green-600">✅</span>
                    ) : (
                      <span className="text-red-500">❌</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {new Date(p.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {new Date(p.updated_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:text-blue-500 transition"
                      title="Edit"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-500 transition"
                      title="Delete"
                    >
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-100 rounded-lg border border-gray-200">
          <FaBoxOpen className="w-14 h-14 text-gray-400 mx-auto mb-3" />
          <p className="text-xl text-gray-700 font-semibold">No products found</p>
          <p className="text-gray-500 text-sm mt-1">
            Try adjusting your search or add a new product.
          </p>
        </div>
      )}
    </div>
  );
}
