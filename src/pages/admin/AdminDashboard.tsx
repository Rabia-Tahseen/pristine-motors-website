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

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  processing: "bg-yellow-100 text-yellow-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({ totalProducts: 0, totalOrders: 0, totalCars: 0, totalParts: 0 });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, ordersRes, recentRes] = await Promise.all([
        supabase.from("products").select("category", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("id, customer_name, total_price, order_status, created_at").order("created_at", { ascending: false }).limit(5),
      ]);

      // Count by category
      const allProducts = await supabase.from("products").select("category");
      const cars = allProducts.data?.filter(p => p.category === "car").length ?? 0;
      const parts = allProducts.data?.filter(p => p.category === "car_part").length ?? 0;

      setStats({
        totalProducts: (productsRes.count ?? 0),
        totalOrders: (ordersRes.count ?? 0),
        totalCars: cars,
        totalParts: parts,
      });
      setRecentOrders(recentRes.data ?? []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.totalProducts, icon: Package, color: "text-primary", link: "/admin/products" },
    { label: "Cars Listed", value: stats.totalCars, icon: Car, color: "text-gold", link: "/admin/products" },
    { label: "Car Parts", value: stats.totalParts, icon: Package, color: "text-emerald-600", link: "/admin/products" },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-purple-600", link: "/admin/orders" },
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
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-body text-sm">Welcome to your store management panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} to={card.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground font-body text-xs uppercase tracking-wide">{card.label}</p>
                    <p className="font-display text-3xl font-bold text-foreground mt-1">{card.value}</p>
                  </div>
                  <card.icon className={`h-10 w-10 ${card.color} opacity-70`} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Clock size={18} /> Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground font-body text-sm py-4 text-center">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="font-body font-medium text-foreground text-sm">{order.customer_name}</p>
                    <p className="text-muted-foreground text-xs font-body">
                      {new Date(order.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${statusColor[order.order_status] ?? "bg-muted text-foreground"} text-xs font-body`}>
                      {order.order_status}
                    </Badge>
                    <span className="font-body font-bold text-foreground text-sm">Rs. {order.total_price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <Link to="/admin/orders" className="block text-center text-primary text-sm font-body font-medium hover:underline pt-2">
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
