import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";

// Contact numbers
const WHATSAPP_NUMBER = "923219454136";
const CALL_NUMBER = "+92 301 3917380";

// Utility to detect mobile
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// EmailCard (no export)
const EmailCard = () => {
  const email = "hamzanaveed1@gmail.com";

  const gmailDesktop = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  const mailtoLink = `mailto:${email}`;

  return (
    <motion.a
      href={gmailDesktop}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.16 }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={(e) => {
        if (isMobile()) {
          e.preventDefault();
          window.location.href = mailtoLink;
        }
      }}
    >
      <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
        <Mail size={20} className="text-white" />
      </div>

      <span className="font-semibold text-gray-950 text-sm">
        Email
      </span>

      <span className="text-gray-700 text-xs">
        {email}
      </span>
    </motion.a>
  );
};

// Main ContactSection
const ContactSection = () => (
  <section id="contact" className="py-14 bg-background">
    <div className="section-container max-w-3xl">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
  Get in Touch
</h1>
        
        <p className="mt-2 text-gray-700 text-sm">
          Contact the owner directly through any of these channels.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>

          <span className="font-semibold text-gray-950 text-sm">
            WhatsApp
          </span>

          <span className="text-gray-700 text-xs">
            +92 321 9454136
          </span>
        </motion.a>

        {/* Call */}
        <motion.a
          href={`tel:${CALL_NUMBER.replace(/\s/g, "")}`}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Phone size={20} className="text-primary-foreground" />
          </div>

          <span className="font-semibold text-gray-950 text-sm">
            Call Owner
          </span>

          <span className="text-gray-700 text-xs">
            {CALL_NUMBER}
          </span>
        </motion.a>

        {/* Email */}
        <EmailCard />

      </div>
    </div>
  </section>
);

export default ContactSection;
