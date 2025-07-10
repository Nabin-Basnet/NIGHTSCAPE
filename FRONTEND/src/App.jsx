import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import LoginForm from "./auth/LoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import Store from "./pages/Store";
import Home from "./pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // On mount, check localStorage for login info
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  // Call this after successful login
  const handleLoginSuccess = (user) => {
    localStorage.setItem("access_token", user.access);
    localStorage.setItem("refresh_token", user.refresh);
    localStorage.setItem("user_role", user.role);
    localStorage.setItem("user_name", user.name);
    setIsAuthenticated(true);
    setUserRole(user.role);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Navbar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
        />
        {userRole === "admin" && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}
        {userRole === "customer" && <Route path="/store" element={<Store />} />}
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
