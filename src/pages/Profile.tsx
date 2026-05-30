import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ✅ check role — if admin, redirect away from public profile
  const resolveUser = async (sessionUser: any) => {
    if (!sessionUser) {
      setUser(null);
      setAuthChecked(true);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionUser.id)
      .maybeSingle();

    if (profile?.role === "admin") {
      // admin shouldn't be on public profile page
      setUser(null);
      setAuthChecked(true);
      navigate("/"); // send them back home
    } else {
      setUser(sessionUser);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      await resolveUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      resolveUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchData = async (userId: string) => {
    if (!userId) return;
    try {
      setLoading(true);
      const [orderRes, requestRes] = await Promise.all([
        supabase.from("orders").select("*").eq("user_id", userId),
        supabase.from("part_requests").select("*").eq("user_id", userId),
      ]);
      setOrders(orderRes.data ?? []);
      setRequests(requestRes.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchData(user.id);
  }, [user?.id]);

  useEffect(() => {
    if (user?.id && location.pathname === "/profile") {
      fetchData(user.id);
    }
  }, [location.pathname, user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("profile-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => fetchData(user.id))
      .on("postgres_changes", { event: "*", schema: "public", table: "part_requests" }, () => fetchData(user.id))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user?.id]);

  // ✅ wait for auth check before showing anything
  if (!authChecked) return null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Please login first.
      </div>
    );
  }

  const totalSpent = orders.reduce(
    (acc, order) => acc + (Number(order.total_price) || 0), 0
  );

  const getOrderName = (order: any) => {
    const items = order.items_ordered;
    if (Array.isArray(items)) return items.map((i: any) => i.name || i.title || "Item").join(" + ");
    if (items && typeof items === "object") return items.name || items.title || "Car Part";
    return "Car Part";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
      case "pending": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-14 pb-10">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        <div>
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-700 transition">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-3 text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>

        <div className="flex gap-6 text-sm text-gray-700">
          <span>Orders: <b>{orders.length}</b></span>
          <span>Requests: <b>{requests.length}</b></span>
          <span>Total Spent: <b>Rs {totalSpent}</b></span>
        </div>

        <Link to="/cart" className="flex items-center gap-3 bg-white border rounded-xl p-4 hover:shadow transition">
          <ShoppingBag className="text-blue-600" />
          <div><p className="font-semibold">View Cart</p></div>
        </Link>

        {/* ORDERS */}
        <section className="bg-white border rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-5">Your Orders</h2>
          {loading ? <p>Loading...</p> : orders.length === 0 ? <p>No orders yet</p> : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={order.id} className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-100 p-5 shadow-sm">
                  <div className="flex justify-between">
                    <p className="font-semibold">Order {index + 1}: {getOrderName(order)}</p>
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.order_status || "new")}`}>
                      {order.order_status || "new"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Rs {order.total_price}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* REQUESTS */}
        <section className="bg-white border rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-5">Your Requests</h2>
          {loading ? <p>Loading...</p> : requests.length === 0 ? <p>No requests yet</p> : (
            <div className="space-y-4">
              {requests.map((req, index) => (
                <div key={req.id} className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-100 p-5">
                  <div className="flex justify-between">
                    <p className="font-semibold">Request {index + 1}: {req.part}</p>
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(req.status || "pending")}`}>
                      {req.status || "pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{req.brand} • {req.model}</p>
                  <p className="text-sm mt-2">Budget: Rs {req.budget || "Not set"}</p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
};

export default Profile;
