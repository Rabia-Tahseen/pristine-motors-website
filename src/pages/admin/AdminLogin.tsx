import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const { adminSignIn, user, role, loading } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ✅ once we know user is admin, redirect
  useEffect(() => {
    if (!loading && user && role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [user, role, loading, navigate]);

  // ✅ only show spinner while loading
  // as soon as loading is false and no admin → show the form instantly
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await adminSignIn(email, password);

      if (res?.error) {
        setError(res.error);
        return;
      }

      navigate("/admin", { replace: true });

    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary-foreground" size={28} />
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <Label>Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
