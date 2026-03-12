import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, formatPrice, parsePrice } from "@/contexts/CartContext";
import { ArrowLeft, Truck } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone number required").max(20),
  email: z.string().trim().email("Valid email required").max(255),
  address: z.string().trim().min(5, "Delivery address is required").max(500),
  city: z.string().trim().min(2, "City is required").max(100),
  notes: z.string().max(500).optional(),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, subtotal, formattedSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 bg-background min-h-screen">
        <div className="section-container text-center py-20">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">No items to checkout</h1>
          <Link to="/parts" className="btn-primary mt-4 inline-block">Browse Parts</Link>
        </div>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof CheckoutData;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      // Build order summary for localStorage (will integrate with Cloud later)
      const order = {
        id: `ORD-${Date.now()}`,
        customer: result.data,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          vehicle: i.product.vehicle,
          price: i.product.price,
          quantity: i.quantity,
          lineTotal: formatPrice(parsePrice(i.product.price) * i.quantity),
        })),
        total: formattedSubtotal,
        paymentMethod: "Cash on Delivery",
        date: new Date().toISOString(),
      };

      localStorage.setItem("pristine-last-order", JSON.stringify(order));
      clearCart();
      navigate("/order-confirmation");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-body text-sm"
        >
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="font-display font-bold text-foreground text-lg">Delivery Information</h2>

              {([
                { name: "fullName", label: "Full Name", placeholder: "Your full name", type: "text" },
                { name: "phone", label: "Phone Number", placeholder: "+92 3XX XXXXXXX", type: "tel" },
                { name: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
                { name: "address", label: "Delivery Address", placeholder: "Street, house number, area", type: "text" },
                { name: "city", label: "City", placeholder: "e.g. Lahore, Karachi, Islamabad", type: "text" },
              ] as const).map((field) => (
                <div key={field.name}>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                    {field.label} <span className="text-destructive">*</span>
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                  {errors[field.name] && (
                    <p className="text-destructive text-xs font-body mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions..."
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display font-bold text-foreground text-lg mb-3">Payment Method</h2>
              <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary bg-primary/5">
                <Truck size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-body font-semibold text-foreground text-sm">Cash on Delivery (COD)</p>
                  <p className="text-muted-foreground text-xs font-body mt-0.5">
                    Payment will be collected in cash when the order is delivered.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full text-center disabled:opacity-60"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
              <h2 className="font-display font-bold text-foreground text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-xs font-semibold text-foreground leading-tight truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-body">Qty: {item.quantity}</p>
                      <p className="text-xs font-bold text-primary font-body">
                        {formatPrice(parsePrice(item.product.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between font-body">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">{formattedSubtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
