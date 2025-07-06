import React, { useEffect, useState } from "react";
import AxiosInstance from "../../components/Axios";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
    alert(`Edit product ID ${product.id} - implement your edit logic here`);
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        className="border rounded px-4 py-2 mb-4 max-w-md w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Brand</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock Qty</th>
              <th className="border border-gray-300 p-2">Discount</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Created At</th>
              <th className="border border-gray-300 p-2">Updated At</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border border-gray-300 p-2">{p.id}</td>
                <td className="border border-gray-300 p-2">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
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
                <td className="border border-gray-300 p-2">{p.name}</td>
                <td className="border border-gray-300 p-2">{p.category?.name || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{p.brand?.name || 'N/A'}</td>
                <td className="border border-gray-300 p-2">${p.price.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{p.stock_quantity}</td>
                <td className="border border-gray-300 p-2">{p.discount ? `${p.discount}%` : "0%"}</td>
                <td className="border border-gray-300 p-2">{p.description}</td>
                <td className="border border-gray-300 p-2">{new Date(p.created_at).toLocaleString()}</td>
                <td className="border border-gray-300 p-2">{new Date(p.updated_at).toLocaleString()}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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
        <p>No products found.</p>
      )}
    </div>
  );
}
