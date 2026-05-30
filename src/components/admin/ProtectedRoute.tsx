import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAdminAuth();

  // ✅ wait for auth to initialize before making any decision
  if (loading) return null;

  // ✅ not logged in → go to admin login page
  if (!user) return <Navigate to="/admin/login" replace />;

  // ✅ logged in but not admin → go to home
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
