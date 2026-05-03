import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Car, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCars: number;
  totalParts: number;
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

        setStats({
          totalProducts: totalProducts ?? 0,
          totalOrders: totalOrders ?? 0,
          totalCars: totalCars ?? 0,
          totalParts: totalParts ?? 0,
        });

        const { data: recentData } = await supabase
          .from("orders")
          .select("id, customer_name, total_price, order_status, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentOrders(recentData ?? []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
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
      gradient: "from-sky-100 to-blue-200",
      iconColor: "text-blue-600",
    },
    {
      label: "Cars Listed",
      value: stats.totalCars,
      icon: Car,
      link: "/admin/products?filter=cars",
      gradient: "from-blue-100 to-sky-200",
      iconColor: "text-sky-600",
    },
    {
      label: "Car Parts",
      value: stats.totalParts,
      icon: Package,
      link: "/admin/products?filter=car-parts",
      gradient: "from-cyan-100 to-blue-200",
      iconColor: "text-cyan-600",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      link: "/admin/orders",
      gradient: "from-indigo-100 to-blue-200",
      iconColor: "text-indigo-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground font-body text-sm">
          Welcome to your store management panel
        </p>
      </div>

      {/* Stats Cards (UPDATED STYLE ONLY) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link key={card.label} to={card.link}>
              <Card
                className="
                  overflow-hidden
                  border border-border
                  bg-gradient-to-bl from-blue-200/40 via-card to-transparent
                  dark:from-blue-900/20 dark:via-card dark:to-transparent
                  shadow-sm hover:shadow-md
                  transition-all cursor-pointer
                  hover:-translate-y-1
                "
              >
                <CardContent className="relative p-5">

                  {/* soft glow */}
                  <div className="absolute inset-0 opacity-10 bg-white blur-2xl" />

                  <div className="relative flex items-center justify-between">

                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-wide font-body">
                        {card.label}
                      </p>

                      <p className="font-display text-3xl font-bold text-foreground mt-1">
                        {card.value}
                      </p>
                    </div>

                    <Icon className={`h-9 w-9 ${card.iconColor} opacity-80`} />

                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}

      </div>

      {/* Recent Orders (UNCHANGED) */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Clock size={18} /> Recent Orders
          </CardTitle>
        </CardHeader>

        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground font-body text-sm py-4 text-center">
              No orders yet
            </p>
          ) : (
            <div className="space-y-3">

              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-body font-medium text-foreground text-sm">
                      {order.customer_name}
                    </p>

                    <p className="text-muted-foreground text-xs font-body">
                      {new Date(order.created_at).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <Badge
                      className={`${
                        {
                          new: "bg-blue-100 text-blue-800",
                          confirmed: "bg-emerald-100 text-emerald-800",
                          processing: "bg-yellow-100 text-yellow-800",
                          shipped: "bg-purple-100 text-purple-800",
                          delivered: "bg-green-100 text-green-800",
                          cancelled: "bg-red-100 text-red-800",
                        }[order.order_status] ?? "bg-muted text-foreground"
                      } text-xs font-body`}
                    >
                      {order.order_status}
                    </Badge>

                    <span className="font-body font-bold text-foreground text-sm">
                      Rs. {Number(order.total_price).toLocaleString()}
                    </span>

                  </div>
                </div>
              ))}

              <Link
                to="/admin/orders"
                className="block text-center text-primary text-sm font-body font-medium hover:underline pt-2"
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
