import React from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLogin, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
