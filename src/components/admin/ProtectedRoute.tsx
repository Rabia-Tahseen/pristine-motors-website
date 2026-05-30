import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAdminAuth();

  // ✅ while loading, render nothing but don't redirect yet
  if (loading) return null;

  if (!user) return <Navigate to="/admin/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
