import { motion } from "framer-motion";
import { ShieldCheck, Award, MessageCircle, Zap } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, text: "Genuine Japanese Auto Parts" },
  { icon: Award, text: "Trusted Supplier" },
  { icon: MessageCircle, text: "Direct Dealer Communication" },
  { icon: Zap, text: "Fast Response via WhatsApp" },
];

const TrustIndicators = () => (
  <section className="py-10 bg-white border-b border-[#1D2A55]">
    <div className="section-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {indicators.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-lg bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
              <item.icon size={24} className="text-yellow-400" />
            </div>
            <span className="text-sm md:text-base font-medium text-[#1D2A55] font-body leading-tight">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
