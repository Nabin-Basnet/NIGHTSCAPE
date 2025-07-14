import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../Components/Axios";

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
    <div className="p-6">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📂 Admin Categories</h1>
        <button
          onClick={() => navigate("/admin/add-category")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add Category
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search categories..."
        className="border rounded px-4 py-2 mb-4 max-w-md w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories Table */}
      {loading ? (
        <p>Loading...</p>
      ) : categories.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Parent</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="border border-gray-300 p-2">{cat.id}</td>
                <td className="border border-gray-300 p-2">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-16 w-16 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/64x64?text=No+Image";
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">{cat.name}</td>
                <td className="border border-gray-300 p-2">
                  {cat.description || "No Description"}
                </td>
                <td className="border border-gray-300 p-2">
                  {cat.parent ? cat.parent.name : "None"}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}
