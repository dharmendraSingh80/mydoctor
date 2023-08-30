import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ userData, children }) {
  if (!userData) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}
