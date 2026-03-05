import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MessageCircle, Send } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/1234567890"; // Replace with actual owner's WhatsApp number

const RequestPart = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    partName: "",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.partName) {
      toast.error("Please fill in Name, Phone, and Part Name.");
      return;
    }
    const msg = `Name: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AVehicle: ${form.vehicleMake} ${form.vehicleModel} ${form.vehicleYear}%0APart: ${form.partName}%0ADetails: ${form.details}`;
    window.open(`${WHATSAPP_LINK}?text=${msg}`, "_blank");
    toast.success("Opening WhatsApp...");
    setForm({ name: "", phone: "", email: "", vehicleMake: "", vehicleModel: "", vehicleYear: "", partName: "", details: "" });
  };

  const inputClass =
    "w-full bg-cream/80 dark:bg-navy-dark/50 border-2 border-border/60 rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-body text-sm";

  return (
    <main className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--navy)/0.06),transparent_60%)]" />

      <div className="section-container max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-gold-dark text-xs font-body uppercase tracking-[0.2em] mb-4">Custom Request</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground section-heading">Request a Part</h1>
          <p className="mt-6 text-muted-foreground text-base font-body">
            Can't find what you need? Tell us what part you're looking for and we'll source it for you.
          </p>

          {/* WhatsApp quick link */}
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 mt-6 px-6 py-3 rounded-xl bg-[#25D366] text-white font-body font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-all duration-300"
          >
            <MessageCircle size={18} />
            Or message us on WhatsApp
          </motion.a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-primary/10 rounded-2xl p-8 md:p-10 space-y-5 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input placeholder="Your Name *" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Phone Number *" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <input placeholder="Email (optional)" type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <input placeholder="Vehicle Make" className={inputClass} value={form.vehicleMake} onChange={(e) => setForm({ ...form, vehicleMake: e.target.value })} />
            <input placeholder="Vehicle Model" className={inputClass} value={form.vehicleModel} onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })} />
            <input placeholder="Year" className={inputClass} value={form.vehicleYear} onChange={(e) => setForm({ ...form, vehicleYear: e.target.value })} />
          </div>

          <input placeholder="Part Name / Description *" className={inputClass} value={form.partName} onChange={(e) => setForm({ ...form, partName: e.target.value })} />
          <textarea placeholder="Additional details (condition preference, budget, etc.)" rows={4} className={inputClass + " resize-none"} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full text-center flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Submit Request
          </motion.button>
        </motion.form>
      </div>
    </main>
  );
};

export default RequestPart;
