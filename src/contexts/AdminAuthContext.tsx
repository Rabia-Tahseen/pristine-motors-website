import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  user: any;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  adminSignIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error(error);
      setRole("user");
      return "user";
    }

    const userRole = data?.role || "user";
    setRole(userRole);
    return userRole;
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // ✅ only fetch role if there's actually a user
      // if no user, skip the DB call and finish loading immediately
      if (currentUser) {
        await fetchRole(currentUser.id);
      }

      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser?.id) {
          await fetchRole(currentUser.id);
        } else {
          setRole(null);
        }

        queueMicrotask(() => setLoading(false));
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (!data.user) return { error: "Login failed" };
    const userRole = await fetchRole(data.user.id);
    return { user: data.user, role: userRole };
  };

  const adminSignIn = async (email: string, password: string) => {
    const res = await signIn(email, password);
    if (res?.error) return res;

    if (res.role !== "admin") {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      return { error: "Access denied. Admins only." };
    }

    return res;
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error("Sign out failed:", error);
      throw error;
    }
  };

  return (
    <AdminAuthContext.Provider value={{ user, role, loading, signIn, adminSignIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return context;
};
