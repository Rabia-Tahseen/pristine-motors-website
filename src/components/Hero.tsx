import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-32 pb-28 overflow-hidden bg-background">

    {/* spotlight glow */}
    <div className="absolute inset-0 flex justify-center pointer-events-none">
      <div className="w-[900px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full"></div>
    </div>

    {/* subtle radial fade */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.05))]" />

    <div className="section-container relative z-10 text-center">

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display font-bold text-6xl text-foreground"
      >
        Pristine
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-4 text-xl text-muted-foreground"
      >
        Premium Japanese Cars & Auto Parts
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
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
