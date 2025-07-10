import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../Components/Axios";
import { HOME_ROUTE } from "../constants/navMenu";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AxiosInstance.post("/token/", {
        email,
        password,
      });

      const { access, refresh } = response.data;

      // ✅ Store tokens correctly
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Optional: decode token and save user info
      const decoded = jwtDecode(access);
      localStorage.setItem("user_role", decoded.role);

      // Optional: set header immediately (although Axios interceptor will handle it)
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      navigate(HOME_ROUTE);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
