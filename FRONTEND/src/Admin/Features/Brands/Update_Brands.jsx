import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Components/Axios";

export default function UpdateBrand() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
  });
  const [originalLogo, setOriginalLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AxiosInstance.get(`brands/${id}/`) // ✅ FIXED: 'brands' instead of 'brand'
      .then((res) => {
        setFormData({
          name: res.data.name,
          description: res.data.description,
          logo: null,
        });
        setOriginalLogo(res.data.logo);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching brand:", err);
        alert("Brand not found.");
        navigate("/admin/brands");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewLogo(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") data.append(key, value);
    });

    try {
      await AxiosInstance.put(`brands/${id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Brand updated successfully!");
      navigate("/admin/brand");
    } catch (err) {
      console.error("Error updating brand:", err);
      alert("❌ Failed to update brand.");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading brand...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">✏️ Update Brand</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
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
        {previewLogo ? (
          <img
            src={previewLogo}
            className="w-32 h-32 mt-2 object-cover rounded"
            alt="Preview"
          />
        ) : originalLogo ? (
          <img
            src={originalLogo}
            className="w-32 h-32 mt-2 object-cover rounded"
            alt="Original Logo"
          />
        ) : null}
        <button
          type="submit"
          className="bg-yellow-600 text-white px-6 py-2 rounded"
        >
          Update Brand
        </button>
      </form>
    </div>
  );
}
