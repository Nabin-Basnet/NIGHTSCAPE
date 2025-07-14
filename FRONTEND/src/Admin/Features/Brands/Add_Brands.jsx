import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Components/Axios";

export default function AddBrand() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
  });
  const [previewLogo, setPreviewLogo] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreviewLogo(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await AxiosInstance.post("brands/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Brand added successfully!");
      navigate("/admin/brand");
    } catch (err) {
      console.error("Error adding brand:", err);
      alert("❌ Failed to add brand.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Brand</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Brand name"
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
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        {previewLogo && (
          <img
            src={previewLogo}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
}
