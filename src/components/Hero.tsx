import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-32 pb-24 overflow-hidden bg-background">

    {/* car silhouette */}
    <svg
      className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] opacity-[0.06]"
      viewBox="0 0 800 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M50 120 Q150 30 350 80 Q550 120 750 70" />
      <circle cx="250" cy="130" r="25" />
      <circle cx="550" cy="130" r="25" />
    </svg>

    <div className="section-container relative z-10 text-center">

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display font-bold text-5xl md:text-6xl text-foreground"
      >
        Pristine
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-lg md:text-xl text-muted-foreground"
      >
        Premium Japanese Cars & Auto Parts
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/cars" className="btn-primary px-8 py-3.5 flex items-center gap-2">
          <Car size={18} />
          Browse Cars
        </Link>

        <Link to="/parts" className="btn-primary px-8 py-3.5 flex items-center gap-2">
          <Wrench size={18} />
          Browse Car Parts
        </Link>
      </motion.div>

    </div>
  </section>
);

export default Hero;
