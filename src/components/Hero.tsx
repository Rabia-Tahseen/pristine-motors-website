import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-parts.png";

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image with subtle zoom animation */}
      <motion.img
        src={heroBg}
        alt="Pristine Auto Hub"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      
      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 via-navy/60 to-navy-dark/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/40 via-transparent to-navy-dark/40" />
      
      {/* Decorative gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative z-10 section-container text-center py-20">
        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm text-gold text-xs font-body uppercase tracking-[0.2em]">
            Est. 2025 — Genuine Japanese Auto Parts
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-[1.05]"
        >
          Pristine
          <br />
          <span className="text-gradient">Auto Hub</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 text-cream/60 text-base md:text-lg max-w-lg mx-auto font-body leading-relaxed"
        >
          Your trusted source for genuine Toyota Raize, Daihatsu Mira & Taft parts.
          Quality you can see. Prices you'll love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/parts" className="btn-primary text-sm md:text-base">
            Browse All Parts
          </Link>
          <Link to="/request-part" className="btn-outline text-sm md:text-base">
            Request a Part
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 flex justify-center gap-12 md:gap-20"
        >
          {[
            { value: "50+", label: "Parts" },
            { value: "200+", label: "Customers" },
            { value: "3", label: "Vehicle Brands" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-cream">{s.value}</p>
              <p className="text-cream/40 text-xs uppercase tracking-widest mt-1 font-body">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
