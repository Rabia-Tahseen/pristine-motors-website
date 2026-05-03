import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Car, Clock, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCars: number;
  totalParts: number;
  totalRequests: number;
}

interface RecentOrder {
  id: string;
  customer_name: string;
  total_price: number;
  order_status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCars: 0,
    totalParts: 0,
    totalRequests: 0,
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count: totalProducts } = await supabase
          .from("products")
          .select("id", { count: "exact", head: true });

        const { count: totalOrders } = await supabase
          .from("orders")
          .select("id", { count: "exact", head: true });

        const { count: totalCars } = await supabase
          .from("products")
          .select("id", { count: "exact", head: true })
          .eq("product_type", "car");

        const { count: totalParts } = await supabase
          .from("products")
          .select("id", { count: "exact", head: true })
          .eq("product_type", "car_part");

        const { count: totalRequests } = await supabase
          .from("part_requests")
          .select("id", { count: "exact", head: true });

        setStats({
          totalProducts: totalProducts ?? 0,
          totalOrders: totalOrders ?? 0,
          totalCars: totalCars ?? 0,
          totalParts: totalParts ?? 0,
          totalRequests: totalRequests ?? 0,
        });

        const { data } = await supabase
          .from("orders")
          .select("id, customer_name, total_price, order_status, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentOrders(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      link: "/admin/products",
      color: "text-blue-600",
    },
    {
      label: "Cars Listed",
      value: stats.totalCars,
      icon: Car,
      link: "/admin/products?filter=cars",
      color: "text-sky-600",
    },
    {
      label: "Car Parts",
      value: stats.totalParts,
      icon: Package,
      link: "/admin/products?filter=car-parts",
      color: "text-cyan-600",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      link: "/admin/orders",
      color: "text-indigo-600",
    },
    {
      label: "Requests",
      value: stats.totalRequests,
      icon: MessageCircle,
      link: "/admin/requests",
      color: "text-pink-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your store
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link key={card.label} to={card.link} className="h-full">
              <Card
                className="
                  h-full
                  bg-gradient-to-br from-white to-blue-50
                  dark:from-card dark:to-blue-900/10
                  border
                  hover:shadow-lg
                  transition-all
                  hover:-translate-y-1
                "
              >
                <CardContent className="p-5 flex items-center justify-between h-full">

                  <div>
                    <p className="text-xs uppercase text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {card.value}
                    </p>
                  </div>

                  <Icon className={`h-8 w-8 ${card.color}`} />

                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* RECENT ORDERS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={18} /> Recent Orders
          </CardTitle>
        </CardHeader>

        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              No orders yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition"
                >
                  <div>
                    <p className="font-medium">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-PK")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge>{order.order_status}</Badge>
                    <span className="font-bold">
                      Rs. {Number(order.total_price).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              <Link
                to="/admin/orders"
                className="block text-center text-sm text-primary pt-2 hover:underline"
              >
                View All Orders →
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default AdminDashboard;
