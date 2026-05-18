import { motion } from "framer-motion";
import { ShieldCheck, Award, MessageCircle } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, text: "Genuine Japanese Auto Parts" },
  { icon: Award, text: "Trusted Supplier" },
  { icon: MessageCircle, text: "Direct Dealer Communication" },
];

const TrustIndicators = () => (
  <section className="py-8 bg-gradient-to-b from-white to-blue-50/40 border-b border-gray-100">
    <div className="section-container">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {indicators.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
            className="
              group flex items-center gap-4
              bg-white/80 backdrop-blur
              border border-gray-100
              rounded-2xl px-5 py-4
              shadow-sm
              hover:shadow-md hover:-translate-y-1
              transition-all duration-300
            "
          >
            {/* Icon Badge */}
            <div className="
              w-11 h-11 rounded-xl
              bg-blue-100
              flex items-center justify-center
              group-hover:bg-blue-200
              transition
            ">
              <item.icon size={20} className="text-[#1D2A55]" />
            </div>

            {/* Text */}
            <span className="text-[#1D2A55] font-semibold text-sm sm:text-base leading-snug">
              {item.text}
            </span>
          </motion.div>
        ))}

      </div>
    </div>
  </section>
);

export default TrustIndicators;
