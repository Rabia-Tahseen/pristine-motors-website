import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, formatPrice } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

// Validation schema
const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().length(11, "Phone must be exactly 11 digits"),
  email: z.string().trim().email("Valid email required").max(255),
  address: z.string().trim().min(5, "Delivery address is required").max(500),
  city: z.string().trim().min(2, "City is required").max(100),
  notes: z.string().max(500).optional(),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, subtotal, formattedSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAdminAuth();

  const [form, setForm] = useState<CheckoutData>({
  fullName: "",
  phone: "",
  email: user?.email || "",
  address: "",
  city: "Lahore",
  notes: "",
});

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
useEffect(() => {
  if (user?.email) {
    setForm((prev) => ({
      ...prev,
      email: user.email || "",
    }));
  }
}, [user]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof CheckoutData;

    const newValue = key === "phone" ? value.replace(/\D/g, "") : value;

    setForm((prev) => ({ ...prev, [key]: newValue }));
  };

  const getErrors = () => {
    try {
      checkoutSchema.parse(form);
      return {};
    } catch (e: any) {
      const errors: Record<string, string> = {};
      e.issues.forEach((issue: any) => {
        errors[issue.path[0]] = issue.message;
      });
      return errors;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // LOGIN REQUIRED
  if (!user) {
    toast.error("Please login before placing an order");
    navigate("/login");
    return;
  }

  setSubmitted(true);

    const errors = getErrors();

    if (Object.keys(errors).length > 0) {
      const missing = Object.values(errors).join(", ");
      toast.error(`Please fix: ${missing}`);
      return;
    }

    setSubmitting(true);

    try {
      const orderItems = items.map((i) => ({
        id: i.product.id,
        name: i.product.title,
        vehicle: i.product.vehicle,
        price: i.product.price,
        quantity: i.quantity,
      }));

      const orderPayload = {
        customer_name: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        notes: form.notes ?? "",
        items_ordered: orderItems,
        total_price: subtotal,
        payment_method: "Cash on Delivery",
        order_status: "new",
      };

      const { error } = await supabase.from("orders").insert(orderPayload);

      if (error) throw error;

      const productIds = items.map((i) => i.product.id);

      await supabase
        .from("products")
        .update({ stock_status: "sold" })
        .in("id", productIds);

      const receiptData = {
        id: `PM-${Date.now()}`,
        customer: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
        },
        items: items.map((i) => ({
          name: i.product.title,
          vehicle: i.product.vehicle,
          quantity: i.quantity,
          lineTotal: formatPrice(i.product.price * i.quantity),
        })),
        total: formattedSubtotal,
        paymentMethod: "Cash on Delivery",
        date: new Date().toLocaleString(),
      };

      localStorage.setItem(
        "pristine-last-order",
        JSON.stringify(receiptData)
      );

      clearCart();

      toast.success("Order placed successfully!");
      navigate("/order-confirmation");

    } catch (err: any) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  const errorClass = "text-red-500 text-xs mt-1";

  const errors = submitted ? getErrors() : {};

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 bg-background min-h-screen">
        <div className="section-container text-center py-20">
          <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
          <Link to="/parts" className="btn-primary">
            Browse Parts
          </Link>
        </div>
      </main>
    );
  }

 return (
  <main className="pt-24 pb-20 bg-background min-h-screen">
    <div className="section-container">
      <Link to="/cart" className="inline-flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft size={16} />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE (2/3 FORM) */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">

          {!user && (
            <div className="rounded-xl border border-blue-200 bg-white/85 p-4 text-center shadow-sm">
              <p className="text-sm text-blue-950 font-medium">
                Please login or create an account before placing your order.
              </p>

              <div className="flex justify-center gap-3 mt-4">
                  <Link to="/login">
    <Button className="bg-blue-950 text-white hover:bg-blue-400 hover:-translate-y-1 transition-all duration-200">
      Login
    </Button>
  </Link>

  <Link to="/signup">
    <Button
      variant="outline"
      className="border-blue-950 text-blue-950 hover:bg-blue-400 hover:-translate-y-1 transition-all duration-200"
    >
      Create Account
    </Button>
  </Link>
              </div>
            </div>
          )}

          {/* FORM CARD */}
          <div className="rounded-xl border p-6 space-y-4">

            <div>
              <Label>Full Name *</Label>
              <Input name="fullName" value={form.fullName} onChange={handleChange} className={inputClass} />
              {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
            </div>

            <div>
              <Label>Phone Number *</Label>
              <Input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                readOnly={!!user}
                className={`${inputClass} ${user ? "bg-gray-100" : ""}`}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <Label>Address *</Label>
              <Input name="address" value={form.address} onChange={handleChange} className={inputClass} />
              {errors.address && <p className={errorClass}>{errors.address}</p>}
            </div>

            <div>
              <Label>City *</Label>
              <Input value="Lahore" readOnly className={`${inputClass} bg-gray-100`} />
            </div>

            <div>
              <Label>Notes</Label>
              <Textarea name="notes" value={form.notes} onChange={handleChange} className={inputClass} />
              {errors.notes && <p className={errorClass}>{errors.notes}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Placing Order..." : "Place Order"}
          </Button>
        </form>


      </div>
    </div>
  </main>
);
};
export default Checkout;
