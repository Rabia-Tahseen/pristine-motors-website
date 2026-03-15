import { motion } from "framer-motion";
import { ShieldCheck, Award, MessageCircle } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, text: "Genuine Japanese Auto Parts" },
  { icon: Award, text: "Trusted Supplier" },
  { icon: MessageCircle, text: "Direct Dealer Communication" },
];

const TrustIndicators = () => (
  <section className="pt-4 pb-4 bg-white border-b-2 border-gray-200">
    <div className="section-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 justify-items-center">
        {indicators.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 pt-2"
          >
            {/* Icon in small light blue circle */}
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <item.icon size={18} className="text-[#1D2A55]" />
            </div>
            {/* Text next to icon */}
            <span className="text-[#1D2A55] font-medium text-base font-body">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
