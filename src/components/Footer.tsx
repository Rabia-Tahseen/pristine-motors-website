import { motion } from "framer-motion";
import { ShieldCheck, Award, MessageCircle, Zap } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, text: "Genuine Japanese Auto Parts" },
  { icon: Award, text: "Trusted Supplier" },
  { icon: MessageCircle, text: "Direct Dealer Communication" },
  { icon: Zap, text: "Fast Response via WhatsApp" },
];

const TrustIndicators = () => (
  <section className="py-8 bg-white"> {/* gives separation from other sections */}
    <div className="section-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {indicators.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 bg-white p-2 rounded-md shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <item.icon size={20} className="text-yellow-400" />
            </div>
            <span className="text-[#1D2A55] font-medium text-sm font-body">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
