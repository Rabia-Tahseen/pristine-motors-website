import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

interface OrderData {
  id: string;
  customer: { fullName: string; phone: string; email: string; address: string; city: string };
  items: { name: string; vehicle: string; quantity: number; lineTotal: string }[];
  total: string;
  paymentMethod: string;
  date: string;
}

const OrderConfirmation = () => {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pristine-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  if (!order) {
    return (
      <main className="pt-24 pb-20 bg-background min-h-screen">
        <div className="section-container text-center py-20">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">No order found</h1>
          <Link to="/parts" className="btn-primary mt-4 inline-block">Browse Parts</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Thank You for Your Order!
          </h1>
          <p className="text-muted-foreground font-body mt-2">
            Your order <span className="font-semibold text-foreground">{order.id}</span> has been placed successfully.
          </p>
        </motion.div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div>
            <h2 className="font-display font-bold text-foreground text-lg mb-3">Order Summary</h2>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between font-body text-sm">
                  <span className="text-foreground">
                    {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold">{item.lineTotal}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-3 pt-3 flex justify-between font-body">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-primary text-lg">{order.total}</span>
            </div>
          </div>

          <div>
            <h3 className="font-body font-semibold text-foreground text-sm mb-2">Delivery Details</h3>
            <div className="space-y-1 text-sm font-body text-muted-foreground">
              <p>{order.customer.fullName}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.email}</p>
              <p>{order.customer.address}, {order.customer.city}</p>
            </div>
          </div>

          <div>
            <h3 className="font-body font-semibold text-foreground text-sm mb-1">Payment Method</h3>
            <p className="text-sm font-body text-muted-foreground">{order.paymentMethod}</p>
          </div>

          <div className="bg-muted rounded-lg p-4 flex items-start gap-3">
            <Phone size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-body font-semibold text-foreground text-sm">Need Help?</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Call us at <a href="tel:+923013917380" className="text-primary font-medium">+92 301 3917380</a> or
                WhatsApp <a href="https://wa.me/923219454136" target="_blank" rel="noopener noreferrer" className="text-primary font-medium">+92 321 9454136</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <Link to="/parts" className="btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
