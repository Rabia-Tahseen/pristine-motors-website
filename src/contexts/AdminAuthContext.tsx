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

export const AdminAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // FETCH ROLE
  const fetchRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error(error);
      return "user";
    }

    const userRole = data?.role || "user";
    setRole(userRole);

    return userRole;
  };

  // INIT AUTH
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      const currentUser = data.user;

      setUser(currentUser);

      if (currentUser) {
        await fetchRole(currentUser.id);
      }

      setLoading(false);
    };

    init();

    const { data: listener } =
      supabase.auth.onAuthStateChange(async (_, session) => {
        const currentUser = session?.user || null;

        setUser(currentUser);

        if (currentUser) {
          await fetchRole(currentUser.id);
        } else {
          setRole(null);
        }

        setLoading(false);
      });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // LOGIN
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    const user = data.user;

    if (!user) {
      return { error: "Login failed" };
    }

    setUser(user);

    const userRole = await fetchRole(user.id);

    return {
      user,
      role: userRole,
    };
  };

  // ADMIN LOGIN
  const adminSignIn = async (email: string, password: string) => {
    const res = await signIn(email, password);

    if (res?.error) return res;

    if (res.role !== "admin") {
      await supabase.auth.signOut();

      setUser(null);
      setRole(null);

      return {
        error: "Access denied. Admins only.",
      };
    }

    return res;
  };

 const signOut = async () => {
  setUser(null);
  setRole(null);

  await supabase.auth.signOut();

  window.location.href = "/";
};

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        role,
        loading,
        signIn,
        adminSignIn,
        signOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }

  return context;
};
