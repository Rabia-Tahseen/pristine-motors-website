import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-24 pb-16 bg-white overflow-hidden">

    {/* Dark blue diagonal */}
    <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-10 
    [clip-path:polygon(0_0,35%_0,20%_100%,0_100%)]"></div>

    {/* Light blue diagonal */}
    <div className="absolute top-0 left-0 w-full h-full bg-blue-400 opacity-20 
    [clip-path:polygon(0_0,55%_0,35%_100%,0_100%)]"></div>

    <div className="section-container text-center relative z-10">
      
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
