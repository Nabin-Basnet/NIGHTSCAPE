import React, { useState, useEffect } from "react";
import axios from "../../../Components/Axios";

export default function ProductAdd() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    discount: "",
    category: "",
    brand: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/brands/");
      setBrands(res.data);
    } catch (err) {
      console.error("Failed to load brands", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await axios.post("/products/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        discount: "",
        category: "",
        brand: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (err) {
      console.error("Failed to add product", err);
      alert("❌ Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-10">
          🛒 Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-sm font-mono">
          {/* Product Name */}
          <div>
            <label className="text-gray-300">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. iPhone 14"
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Write product description..."
              className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Price, Stock, Discount */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-gray-300">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                placeholder="e.g. 199.99"
                className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-300">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                min="0"
                required
                placeholder="e.g. 50"
                className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="text-gray-300">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="e.g. 10"
                className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Category and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-300">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-300">Brand</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-gray-300">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full mt-1 file:bg-purple-700 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer text-white"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 h-40 object-contain rounded-md border border-gray-600"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            🚀 Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
