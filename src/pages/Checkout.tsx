import { useState } from "react";
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

// ✅ Validation schema (Lahore only)
const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().length(11, "Phone must be exactly 11 digits"),
  email: z.string().trim().email("Valid email required").max(255),
  address: z.string().trim().min(5, "Delivery address is required").max(500),

  city: z
    .string()
    .trim()
    .refine((val) => val === "Lahore", {
      message: "We only deliver within Lahore currently",
    }),

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
    city: "", // ❗ empty initially
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

      const { error } = await supabase
        .from("orders")
        .insert(orderPayload);

      if (error) throw error;

      const productIds = items.map((i) => i.product.id);

      const { error: updateError } = await supabase
        .from("products")
        .update({ stock_status: "sold" })
        .in("id", productIds);

      if (updateError) {
        console.error("Failed to update stock status:", updateError);
      }

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
    "w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-gray-400";

  const errorClass = "text-red-500 text-xs mt-1";

  const errors = submitted ? getErrors() : {};

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 bg-background min-h-screen">
        <div className="section-container text-center py-20">
          <h1 className="text-2xl font-bold mb-4">
            No items to checkout
          </h1>

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

        <Link
          to="/cart"
          className="inline-flex items-center gap-2 mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-5"
          >

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
                <Input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div>
                <Label>Address *</Label>
                <Input name="address" value={form.address} onChange={handleChange} className={inputClass} />
                {errors.address && <p className={errorClass}>{errors.address}</p>}
              </div>

              {/* ✅ City dropdown (ONLY Lahore, no select option) */}
              <div>
                <Label>City *</Label>

                <select
                  name="city"
                  value={form.city}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className={inputClass}
                >
                  <option value="Lahore">Lahore</option>
                </select>

                <p className="text-xs text-gray-500 mt-1">
                  We only deliver within Lahore currently
                </p>

                {errors.city && <p className={errorClass}>{errors.city}</p>}
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

          <div className="rounded-xl border p-6 h-fit">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between mb-3">
                <span>{item.product.title} x{item.quantity}</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}

            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>{formattedSubtotal}</span>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
};

export default Checkout;
