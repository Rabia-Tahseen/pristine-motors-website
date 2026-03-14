import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, formatPrice, parsePrice } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
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

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutData, string>>
  >({});

  const [submitting, setSubmitting] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof CheckoutData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // EMAIL GENERATOR
  const sendOrderEmail = (order: any) => {
    const ownerEmail = "hamzanaveed1@gmail.com";

    const itemsText = order.items
      .map(
        (item: any) =>
          `${item.name} (${item.vehicle})
Quantity: ${item.quantity}
Price: ${item.price}`
      )
      .join("\n\n");

    const subject = `New Order ${order.id}`;

    const body = `
New Order Received

Order ID: ${order.id}
Date: ${new Date().toLocaleString()}

Customer Details
Name: ${order.customer.fullName}
Phone: ${order.customer.phone}
Email: ${order.customer.email}

Address
${order.customer.address}
${order.customer.city}

Items Ordered

${itemsText}

Total
${order.total}

Payment Method
Cash on Delivery
`;

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${ownerEmail}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const mailtoURL = `mailto:${ownerEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = mailtoURL;
    } else {
      window.open(gmailURL, "_blank");
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
      const orderItems = items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        vehicle: i.product.vehicle,
        price: parsePrice(i.product.price),
        quantity: i.quantity,
      }));

      const orderPayload = {
        customer_name: result.data.fullName,
        phone: result.data.phone,
        email: result.data.email,
        address: result.data.address,
        city: result.data.city,
        notes: result.data.notes ?? "",
        items_ordered: orderItems,
        total_price: subtotal,
        payment_method: "Cash on Delivery",
        order_status: "new",
      };

      const { data: savedOrder, error } = await supabase
        .from("orders")
        .insert(orderPayload)
        .select()
        .single();

      if (error) {
        console.error("Supabase order error:", error);
      }

      const order = {
        id: savedOrder?.id ?? `ORD-${Date.now()}`,
        customer: result.data,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          vehicle: i.product.vehicle,
          price: i.product.price,
          quantity: i.quantity,
        })),
        total: formattedSubtotal,
        paymentMethod: "Cash on Delivery",
        date: new Date().toISOString(),
      };

      localStorage.setItem("pristine-last-order", JSON.stringify(order));

      // SEND EMAIL
      sendOrderEmail(order);

      clearCart();

      toast.success("Order placed successfully!");

      navigate("/order-confirmation");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

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

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">

            <div className="rounded-xl border p-6 space-y-4">

              <input
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className={inputClass}
              />

              <textarea
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
                className={inputClass}
              />

            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>

          </form>

          {/* ORDER SUMMARY */}
          <div className="rounded-xl border p-6 h-fit">

            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between mb-3">
                <span>{item.product.name} x{item.quantity}</span>
                <span>
                  {formatPrice(parsePrice(item.product.price) * item.quantity)}
                </span>
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
