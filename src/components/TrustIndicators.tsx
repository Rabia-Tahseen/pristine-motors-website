import { motion } from "framer-motion";
import { ShieldCheck, Award, MessageCircle, Zap } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, text: "Genuine Japanese Auto Parts" },
  { icon: Award, text: "Trusted Supplier" },
  { icon: MessageCircle, text: "Direct Dealer Communication" },
  { icon: Zap, text: "Fast Response via WhatsApp" },
];

const TrustIndicators = () => (
  <section className="py-10 bg-background border-y border-border">
    <div className="section-container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {indicators.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground font-body leading-tight">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
