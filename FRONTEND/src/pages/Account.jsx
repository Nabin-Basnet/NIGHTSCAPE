import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct named import for Vite
import AxiosInstance from "../Components/Axios";

export default function Account() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Use named import
        setUser(decoded);
        fetchAddresses();
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchAddresses = async () => {
    try {
      const res = await AxiosInstance.get("/addresses/");
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("/addresses/", newAddress);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      });
      fetchAddresses();
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">👤 My Account</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <p className="font-semibold">Full Name:</p>
          <p>{user.name}</p>
        </div>

        <div>
          <p className="font-semibold">Email:</p>
          <p>{user.email}</p>
        </div>

        <div>
          <p className="font-semibold">Role:</p>
          <p className="capitalize">{user.role}</p>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">📍 Addresses</p>
            {addresses.length === 0 ? (
              <p className="text-sm text-gray-500">No address added yet.</p>
            ) : (
              addresses.map((addr, index) => (
                <div key={index} className="text-sm">
                  {addr.street}, {addr.city}, {addr.state} - {addr.zip_code}, {addr.country}
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddressSubmit} className="space-y-2">
            <h2 className="text-lg font-semibold">➕ Add New Address</h2>
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleAddressChange}
              placeholder="Street"
              className="w-full border px-3 py-1 rounded"
              required
            />
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleAddressChange}
              placeholder="City"
              className="w-full border px-3 py-1 rounded"
              required
            />
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleAddressChange}
              placeholder="State"
              className="w-full border px-3 py-1 rounded"
              required
            />
            <input
              type="text"
              name="zip_code"
              value={newAddress.zip_code}
              onChange={handleAddressChange}
              placeholder="Zip Code"
              className="w-full border px-3 py-1 rounded"
              required
            />
            <input
              type="text"
              name="country"
              value={newAddress.country}
              onChange={handleAddressChange}
              placeholder="Country"
              className="w-full border px-3 py-1 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Address
            </button>
          </form>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">🛒 Wishlist</p>
            <p>Items you've saved to purchase later.</p>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">📦 Orders</p>
            <p>Your recent purchases will be shown here.</p>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">⚙️ Profile Settings</p>
            <p>Manage your account info (coming soon...)</p>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
