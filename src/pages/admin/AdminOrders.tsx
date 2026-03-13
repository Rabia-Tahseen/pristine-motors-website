import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Eye } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  items_ordered: { name: string; price: number; quantity: number }[];
  total_price: number;
  payment_method: string;
  order_status: string;
  created_at: string;
}

const statuses = ["new", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  processing: "bg-yellow-100 text-yellow-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders").update({ order_status: status }).eq("id", orderId);
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Status updated to ${status}`);
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => prev ? { ...prev, order_status: status } : null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground font-body text-sm">{orders.length} orders total</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center text-muted-foreground py-10 font-body">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground hidden md:table-cell">Phone</th>
                    <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                    <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-body font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-body font-medium text-foreground">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground font-body">{order.email}</p>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell font-body text-foreground">{order.phone}</td>
                      <td className="py-3 px-4 hidden lg:table-cell font-body text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-4 font-body font-semibold text-foreground">Rs. {order.total_price.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.order_status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`text-xs font-body font-medium rounded-full px-2 py-1 border-0 cursor-pointer ${statusColor[order.order_status] ?? "bg-muted"}`}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                          <Eye size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 font-body text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground text-xs">Customer</p>
                  <p className="font-medium text-foreground">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Phone</p>
                  <p className="font-medium text-foreground">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="font-medium text-foreground">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">City</p>
                  <p className="font-medium text-foreground">{selectedOrder.city}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground text-xs">Address</p>
                  <p className="font-medium text-foreground">{selectedOrder.address}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Payment</p>
                  <p className="font-medium text-foreground">{selectedOrder.payment_method}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <Badge className={`${statusColor[selectedOrder.order_status]} text-xs`}>
                    {selectedOrder.order_status}
                  </Badge>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-muted-foreground text-xs">Notes</p>
                  <p className="text-foreground">{selectedOrder.notes}</p>
                </div>
              )}

              <div>
                <p className="text-muted-foreground text-xs mb-2">Items Ordered</p>
                <div className="space-y-2">
                  {selectedOrder.items_ordered?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">Rs. {selectedOrder.total_price.toLocaleString()}</span>
              </div>

              <div>
                <p className="text-muted-foreground text-xs mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selectedOrder.order_status === s ? "default" : "outline"}
                      className="text-xs capitalize"
                      onClick={() => updateStatus(selectedOrder.id, s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
