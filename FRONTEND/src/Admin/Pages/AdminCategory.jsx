"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../Components/Axios";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaSpinner,
  FaFolderOpen,
} from "react-icons/fa";

export default function AdminCategoryList() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = (searchTerm) => {
    setLoading(true);
    AxiosInstance.get("categories/", { params: { search: searchTerm } })
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories(search);
  }, [search]);

  const handleEdit = (category) => {
    navigate(`/admin/update-category/${category.id}`);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await AxiosInstance.delete(`categories/${categoryId}/`);
        fetchCategories(search);
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category.");
      }
    }
  };

  return (
    <div className="p-6 min-h-[calc(100vh-160px)] text-gray-800 bg-white rounded-lg border border-gray-200 shadow-md">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <button
          onClick={() => navigate("/admin/add-category")}
          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-transform duration-300 hover:scale-105"
        >
          <FaPlus className="mr-2 w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories Table */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <FaSpinner className="animate-spin w-8 h-8 text-orange-500 mr-3" />
          <p className="text-lg text-gray-600">Loading categories...</p>
        </div>
      ) : categories.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Parent</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium">{cat.id}</td>
                  <td className="px-6 py-4">
                    <img
                      src={cat.image || "/placeholder.svg"}
                      alt={cat.name}
                      className="h-16 w-16 object-cover rounded-md border border-gray-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=64&width=64&text=No+Image";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">{cat.name}</td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {cat.description || "No Description"}
                  </td>
                  <td className="px-6 py-4">{cat.parent ? cat.parent.name : "None"}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 hover:text-blue-500 transition"
                      title="Edit Category"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:text-red-500 transition"
                      title="Delete Category"
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
          <FaFolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-2">
            No categories found.
          </p>
          <p className="text-gray-500">Try adjusting your search or add a new category.</p>
        </div>
      )}
    </div>
  );
}
