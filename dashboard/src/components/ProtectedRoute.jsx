import React from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p style={{ color: "#666", fontSize: "16px" }}>Authenticating...</p>
      </div>
    );
  }

  if (!user) {
    // If not authenticated, redirect to the login page on frontend
    window.location.href = "https://zerodha-frontend-6o7k.onrender.com";
    return null;
  }

  return children;
};

export default ProtectedRoute;
