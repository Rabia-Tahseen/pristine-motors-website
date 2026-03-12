import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-32 pb-24 overflow-hidden bg-background">

    {/* gradient waves */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-32 left-0 w-[600px] h-[600px] 
      bg-blue-400/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-0 w-[700px] h-[600px]
      bg-indigo-400/20 blur-[120px] rounded-full"></div>
    </div>

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
