import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100">
    
    {/* Background Decorative Elements */}

    {/* Large Blur Shape */}
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-300 opacity-20 blur-3xl rounded-full"></div>

    {/* Diagonal Shape */}
    <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-200 opacity-20 rotate-12 translate-x-40 -translate-y-32 rounded-3xl"></div>

    {/* Subtle Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>

    <div className="relative section-container text-center">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground"
      >
        Pristine
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-3 text-muted-foreground text-lg md:text-xl font-body"
      >
        Premium Japanese Cars & Auto Parts
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
      >
        <Link to="/cars" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
          <Car size={18} />
          Browse Cars
        </Link>

        <Link to="/parts" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
          <Wrench size={18} />
          Browse Car Parts
        </Link>
      </motion.div>

    </div>
  </section>
);

export default Hero;
