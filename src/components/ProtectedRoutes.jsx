import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role !== allowedRoles) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes;