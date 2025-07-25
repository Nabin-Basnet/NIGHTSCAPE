import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Components/Axios";

export default function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent: "",
    image: null,
  });
  const [parents, setParents] = useState([]);
  const [originalImage, setOriginalImage] = useState(null);

  useEffect(() => {
    AxiosInstance.get("categories/").then((res) => setParents(res.data));
    AxiosInstance.get(`categories/${id}/`).then((res) => {
      const cat = res.data;
      setFormData({
        name: cat.name,
        description: cat.description,
        parent: cat.parent || "",
        image: null,
      });
      setOriginalImage(cat.image);
    });
  }, [id]);

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
      if (value !== null && value !== "") data.append(key, value);
    });

    try {
      await AxiosInstance.put(`categories/${id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Category updated!");
      navigate("/admin/category");
    } catch (err) {
      alert("❌ Update failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">✏️ Update Category</h2>
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
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
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
        {originalImage && !formData.image && (
          <img src={originalImage} alt="Current" className="w-32 h-32 mt-2 object-cover" />
        )}
        <button type="submit" className="bg-yellow-600 text-white px-6 py-2 rounded">
          Update Category
        </button>
      </form>
    </div>
  );
}
