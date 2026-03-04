import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
    toast.success("Part request submitted! We'll get back to you within 24 hours.");
    setForm({ name: "", phone: "", email: "", vehicleMake: "", vehicleModel: "", vehicleYear: "", partName: "", details: "" });
  };

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-body text-sm";

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">Request a Part</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Can't find what you need? Tell us what part you're looking for and we'll source it for you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 space-y-5"
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

          <button type="submit" className="btn-primary w-full text-center">Submit Request</button>
        </motion.form>
      </div>
    </main>
  );
};

export default RequestPart;
