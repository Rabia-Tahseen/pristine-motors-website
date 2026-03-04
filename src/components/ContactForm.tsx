import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", partRequired: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in Name, Email, and Message.");
      return;
    }
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", phone: "", email: "", partRequired: "", message: "" });
  };

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-body text-sm";

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="section-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Need a specific part? Send us a message and we'll help you find it.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input placeholder="Name *" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Phone" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <input placeholder="Email *" type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Part Required" className={inputClass} value={form.partRequired} onChange={(e) => setForm({ ...form, partRequired: e.target.value })} />
          <textarea placeholder="Message *" rows={4} className={inputClass + " resize-none"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button type="submit" className="btn-primary w-full text-center">Send Message</button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;
