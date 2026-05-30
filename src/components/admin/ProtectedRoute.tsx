import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAdminAuth();

  if (loading) return null; // or a spinner if you want
  if (!user) return <Navigate to="/admin/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
