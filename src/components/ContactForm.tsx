import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MessageCircle, Send } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/1234567890"; // Replace with actual owner's WhatsApp number

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
    "w-full bg-cream/80 dark:bg-navy-dark/50 border-2 border-border/60 rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-body text-sm";

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-navy to-navy-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.08),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="section-container max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold text-xs font-body uppercase tracking-[0.2em] mb-4">Contact Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream section-heading">Get in Touch</h2>
          <p className="mt-6 text-cream/70 text-base font-body">
            Need a specific part? Send us a message and we'll help you find it.
          </p>

          {/* WhatsApp CTA */}
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 mt-6 px-6 py-3 rounded-xl bg-[#25D366] text-white font-body font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-all duration-300"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </motion.a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-card/95 backdrop-blur-xl border border-border/30 rounded-2xl p-8 md:p-10 space-y-5 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input placeholder="Name *" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Phone" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <input placeholder="Email *" type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Part Required" className={inputClass} value={form.partRequired} onChange={(e) => setForm({ ...form, partRequired: e.target.value })} />
          <textarea placeholder="Message *" rows={4} className={inputClass + " resize-none"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full text-center flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;
