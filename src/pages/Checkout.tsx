import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, formatPrice } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const { items, subtotal, formattedSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // ✅ SIMPLE STATE (NO TYPES = NO ERRORS)
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "", // ✅ FIXED: empty allowed
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ FIXED INPUT HANDLER (supports select too)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };

  // ✅ SIMPLE VALIDATION (NO ZOD)
  const validate = () => {
    const errors: string[] = [];

    if (form.fullName.length < 2) errors.push("Name is required");
    if (form.phone.length !== 11) errors.push("Phone must be 11 digits");
    if (!form.email.includes("@")) errors.push("Valid email required");
    if (form.address.length < 5) errors.push("Address is required");
    if (!form.city) errors.push("Please select city");
    if (form.city !== "Lahore") errors.push("We only deliver in Lahore");

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const errors = validate();

    if (errors.length > 0) {
      toast.error(errors.join(", "));
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

      const { error } = await supabase.from("orders").insert({
        customer_name: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        notes: form.notes,
        items_ordered: orderItems,
        total_price: subtotal,
        payment_method: "Cash on Delivery",
        order_status: "new",
      });

      if (error) throw error;

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/order-confirmation");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  if (items.length === 0) {
    return (
      <main className="pt-24 text-center">
        <h1 className="text-xl font-bold mb-4">No items to checkout</h1>
        <Link to="/parts" className="btn-primary">
          Browse Parts
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="section-container">

        <Link to="/cart" className="flex items-center gap-2 mb-6">
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">

            <div className="border rounded-xl p-6 space-y-4">

              <div>
                <Label>Full Name *</Label>
                <Input name="fullName" value={form.fullName} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <Label>Phone *</Label>
                <Input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <Label>Email *</Label>
                <Input name="email" value={form.email} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <Label>Address *</Label>
                <Input name="address" value={form.address} onChange={handleChange} className={inputClass} />
              </div>

              {/* CITY FIXED */}
              <div>
                <Label>City *</Label>

                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select City</option>
                  <option value="Lahore">Lahore</option>
                </select>

                <p className="text-xs text-gray-500 mt-1">
                  We only deliver in Lahore
                </p>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea name="notes" value={form.notes} onChange={handleChange} className={inputClass} />
              </div>

            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Placing Order..." : "Place Order"}
            </Button>

          </form>

          {/* SUMMARY */}
          <div className="border rounded-xl p-6 h-fit">
            <h2 className="font-bold mb-4">Order Summary</h2>

            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between mb-2">
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
