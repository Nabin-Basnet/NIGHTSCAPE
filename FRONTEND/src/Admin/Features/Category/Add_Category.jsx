import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Components/Axios";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
    image: null,
  });
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get("categories/").then((res) => setParents(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await AxiosInstance.post("categories/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Category added successfully!");
      navigate("/admin/category");
    } catch (err) {
      alert("❌ Failed to add category.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">➕ Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Category name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="parent"
          value={formData.parent}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Parent (optional)</option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Add Category
        </button>
      </form>
    </div>
  );
}
