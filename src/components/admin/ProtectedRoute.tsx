import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAdminAuth();

  // ✅ still loading session — wait
  if (loading) return null;

  // ✅ no user at all — go to login immediately, no delay
  if (!user) return <Navigate to="/admin/login" replace />;

  // ✅ user exists but role not admin
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
