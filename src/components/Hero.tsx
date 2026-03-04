import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/products/part-1.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Pristine Auto Hub hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--navy))]/90 via-[hsl(var(--navy))]/70 to-[hsl(var(--navy))]/90" />

      <div className="relative z-10 section-container text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-cream leading-tight"
        >
          Pristine Auto Hub
          <br />
          <span className="text-gradient">Quality Parts. Trusted Service.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-cream/70 text-lg md:text-xl max-w-2xl mx-auto font-body"
        >
          Your one-stop shop for genuine Japanese auto parts. Toyota, Daihatsu & more — all at competitive prices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/parts" className="btn-primary text-base md:text-lg">
            Browse Parts
          </Link>
          <Link to="/request-part" className="btn-primary text-base md:text-lg !bg-transparent !border-2 !border-cream/50 hover:!bg-cream/10">
            Request a Part
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
