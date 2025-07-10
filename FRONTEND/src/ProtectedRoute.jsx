// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("access_token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwt_decode(token);
    const userRole = decoded.role;

    if (allowedRoles.includes(userRole)) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
