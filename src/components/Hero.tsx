import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Pristine Motors hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 gradient-overlay" />

      <div className="relative z-10 section-container text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-cream leading-tight"
        >
          Premium Auto Parts.
          <br />
          <span className="text-gradient">Trusted Quality.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-cream/70 text-lg md:text-xl max-w-2xl mx-auto font-body"
        >
          Engineered for performance. Built for reliability. Shop the finest auto parts from Pristine Motors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10"
        >
          <Link to="/parts" className="btn-primary text-base md:text-lg">
            Browse Parts
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
