import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/Axios";

export default function AdminBrand() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBrands = (searchTerm) => {
    setLoading(true);
    AxiosInstance.get("brand/", { params: { search: searchTerm } })
      .then((res) => {
        setBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBrands(search);
  }, [search]);

  const handleEdit = (brand) => {
    alert(`Edit brand ID ${brand.id} - implement your edit logic here`);
  };

  const handleDelete = async (brandId) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        await AxiosInstance.delete(`brand/${brandId}/`);
        fetchBrands(search);
      } catch (error) {
        console.error("Error deleting brand:", error);
        alert("Failed to delete brand.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Brands</h1>

      <input
        type="text"
        placeholder="Search brands..."
        className="border rounded px-4 py-2 mb-4 max-w-md w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : brands.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Logo</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="border border-gray-300 p-2">{brand.id}</td>
                <td className="border border-gray-300 p-2">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-16 w-16 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/64x64?text=No+Logo";
                      }}
                    />
                  ) : (
                    <span>No Logo</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">{brand.name}</td>
                <td className="border border-gray-300 p-2">
                  {brand.description || "No Description"}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
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
        <p>No brands found.</p>
      )}
    </div>
  );
}
