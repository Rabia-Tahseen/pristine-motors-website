import { motion } from "framer-motion";
import { ShieldCheck, Award, MessageCircle, Zap } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, text: "Genuine Japanese Auto Parts" },
  { icon: Award, text: "Trusted Supplier" },
  { icon: MessageCircle, text: "Direct Dealer Communication" },
  { icon: Zap, text: "Fast Response via WhatsApp" },
];

const TrustIndicators = () => (
  <section className="py-3 bg-white">
    <div className="section-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {indicators.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-1 sm:gap-1.5"
          >
            <item.icon size={18} className="text-yellow-400 flex-shrink-0" />
            <span className="text-[#1D2A55] font-medium text-sm font-body flex items-center gap-0.5">
              : {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
