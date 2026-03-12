import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";

const WHATSAPP_NUMBER = "923219454136";
const CALL_NUMBER = "+92 301 3917380";

const ContactSection = () => (
  <section id="contact" className="py-16 bg-background">
    <div className="section-container max-w-3xl">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Get in Touch
        </h2>
        <p className="mt-3 text-muted-foreground font-body">
          Contact the owner directly through any of these channels.
        </p>
      </motion.div>

      {/* Contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0 }}
          className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
            <MessageCircle size={24} className="text-white" />
          </div>
          <span className="font-semibold text-foreground font-body text-sm">WhatsApp</span>
          <span className="text-muted-foreground text-xs font-body">+92 321 9454136</span>
        </motion.a>

        {/* Call */}
        <motion.a
          href={`tel:${CALL_NUMBER.replace(/\s/g, "")}`}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="flex flex-col items-center gap-3 p-6 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Phone size={24} className="text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground font-body text-sm">Call Owner</span>
          <span className="text-muted-foreground text-xs font-body">{CALL_NUMBER}</span>
        </motion.a>

        {/* Email */}
        <motion.a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=hamzanaveed1@gmail.com&su=Inquiry%20about%20car%20part&body=Hello%20Pristine%20Team,%0A%0AI%20am%20interested%20in%20the%20following%20car%20part:%20[Part%20Name]%0A%0APlease%20provide%20more%20details%20about%20availability%20and%20pricing.%0A%0AThank%20you."
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: 15 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.16 }}
  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-muted border border-border hover:bg-muted/80 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer"
>
  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
    <Mail size={24} className="text-foreground" />
  </div>

  <span className="font-semibold text-foreground font-body text-sm">
    Email
  </span>

  <span className="text-muted-foreground text-xs font-body">
    hamzanaveed1@gmail.com
  </span>
</motion.a>
      </div>
    </div>
  </section>
);

export default ContactSection;
