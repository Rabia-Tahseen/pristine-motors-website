import { Mail } from "lucide-react";
import { motion } from "framer-motion";

// Utility to detect mobile
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const EmailCard = () => {
  const email = "hamzanaveed1@gmail.com";

  // Build mailto link
  const mailtoLink = `mailto:${email}?subject=Hello&body=Hi, I wanted to contact you regarding...`;

  return (
    <motion.a
      href={mailtoLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.16 }}
      className="flex flex-col items-center gap-3 p-6 rounded-xl bg-muted border border-border hover:bg-muted/80 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={(e) => {
        if (isMobile()) {
          // On mobile, open Gmail compose directly
          e.preventDefault();
          window.location.href = `googlegmail://co?to=${email}&subject=Hello&body=Hi, I wanted to contact you regarding...`;
        }
        // On desktop, normal mailto works
      }}
    >
      <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
        <Mail size={24} className="text-foreground" />
      </div>

      <span className="font-semibold text-foreground font-body text-sm">
        Email
      </span>

      <span className="text-muted-foreground text-xs font-body">
        {email}
      </span>
    </motion.a>
  );
};

export default EmailCard;
