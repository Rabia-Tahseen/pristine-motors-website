import { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Package, MessageCircle, ShoppingCart, ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user } = useAdminAuth();

  const [orders, setOrders] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);

      const [{ data: orderData }, { data: requestData }] = await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .eq("email", user.email)
          .order("created_at", { ascending: false }),

        supabase
          .from("part_requests")
          .select("*")
          .eq("user_email", user.email)
          .order("id", { ascending: false }),
      ]);

      setOrders(orderData || []);
      setRequests(requestData || []);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 bg-[#f5f9ff]">
        Please login first.
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-16 pb-12 bg-[#f5f9ff] text-gray-900">

      <div className="max-w-5xl mx-auto px-6 space-y-10">

        {/* HEADER */}
        <div className="flex items-start justify-between">

          {/* LEFT */}
          <div className="space-y-1">
            
            {/* BACK BUTTON (TOP LEFT REAL STYLE) */}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0b1b3a] transition"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <h1 className="text-3xl font-bold text-[#0b1b3a]">
              My Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              {user.email}
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="flex flex-wrap gap-10 text-sm border-b border-gray-200 pb-6">

          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-500" size={18} />
            <span className="font-medium text-[#0b1b3a]">{orders.length}</span>
            <span className="text-gray-500">Orders</span>
          </div>

          <div className="flex items-center gap-2">
            <MessageCircle className="text-cyan-500" size={18} />
            <span className="font-medium text-[#0b1b3a]">{requests.length}</span>
            <span className="text-gray-500">Requests</span>
          </div>

          <div className="flex items-center gap-2">
            <Package className="text-green-500" size={18} />
            <span className="font-medium text-[#0b1b3a]">
              Rs {orders.reduce((acc, o) => acc + (o.total_price || 0), 0)}
            </span>
            <span className="text-gray-500">Spent</span>
          </div>

        </div>

        {/* QUICK LINKS */}
        <div className="flex gap-6 text-sm text-blue-600 pt-2">

          <Link to="/cart" className="hover:underline">
            View Cart
          </Link>

          <Link to="/parts" className="hover:underline">
            Browse Parts
          </Link>

          <Link to="/request-part" className="hover:underline">
            Request a Part
          </Link>

        </div>

        {/* ORDERS */}
        <div className="pt-6 border-t border-gray-200">

          <h2 className="text-lg font-semibold text-[#0b1b3a] mb-4">
            Order History
          </h2>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You haven’t placed any orders yet.
            </p>
          ) : (
            <div className="space-y-3">

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >

                  {/* LEFT */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#0b1b3a]">
                      Order #{order.id.slice(0, 6)}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()} • {order.order_status}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <p className="text-sm font-semibold text-blue-600">
                    Rs {order.total_price}
                  </p>

                </div>
              ))}

            </div>
          )}
        </div>

        {/* REQUESTS */}
        <div className="pt-6 border-t border-gray-200">

          <h2 className="text-lg font-semibold text-[#0b1b3a] mb-4">
            Part Requests
          </h2>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You haven’t requested any parts yet.
            </p>
          ) : (
            <div className="space-y-3">

              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#0b1b3a]">
                      {req.part}
                    </p>

                    <p className="text-xs text-gray-500">
                      {req.brand} • {req.model}
                    </p>
                  </div>

                  <p className="text-xs text-cyan-600 font-medium">
                    {req.budget || "No budget"}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
};

export default Profile;
