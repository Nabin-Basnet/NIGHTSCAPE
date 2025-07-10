import React, { useState } from "react";
import AxiosInstance from "../Components/Axios"; // Your configured axios instance

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer", // default role
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await AxiosInstance.post("/register/", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
        password2: formData.password2,
      });

      setSuccess("Registration successful! You can now log in.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "customer",
        password: "",
        password2: "",
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        // Show first error message returned by API
        const firstKey = Object.keys(err.response.data)[0];
        setError(err.response.data[firstKey][0]);
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Phone (optional)
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        {/* Optional: Role select */}
        <label className="block mb-2">
          Role
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label className="block mb-2">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-4">
          Confirm Password
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
