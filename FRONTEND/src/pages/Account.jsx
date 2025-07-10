import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">👤 My Account</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
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
