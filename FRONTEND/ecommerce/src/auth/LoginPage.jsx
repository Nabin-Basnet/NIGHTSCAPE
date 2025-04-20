import { useState } from "react";
import axiosInstance from "../api/axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/token/", {
        email,
        password,
      });

      const { access, refresh } = response.data;

      // Store tokens in localStorage or cookies (handle "remember me" here)
      if (rememberMe) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
      } else {
        localStorage.setItem("access_token", access);
      }

      // Set default auth header for future requests
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      console.log("Login successful!");
      // Redirect user or update UI
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Log In
        </button>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500 text-sm">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
