import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Cog, Settings } from "lucide-react";
import QuickSearch from "./QuickSearch";

const Hero = () => (
  <section className="relative pt-16 pb-12 overflow-hidden bg-background">
    {/* Floating icons */}
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <Wrench className="absolute top-16 left-24 w-8 h-8 rotate-12"/>
      <Cog className="absolute top-40 right-32 w-10 h-10 -rotate-6"/>
      <Settings className="absolute bottom-32 left-40 w-9 h-9 rotate-12"/>
      <Wrench className="absolute bottom-20 right-24 w-8 h-8 -rotate-12"/>
      <Cog className="absolute top-72 left-1/2 w-10 h-10 rotate-6"/>
    </div>

    <div className="section-container relative z-10 text-center">
      <motion.h1
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5 }}
        className="font-display font-bold text-5xl md:text-6xl text-foreground"
      >
        Pristine
      </motion.h1>

      <motion.p
        initial={{ opacity:0, y:15 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.1 }}
        className="mt-4 text-lg md:text-xl text-muted-foreground"
      >
        Premium Japanese Cars & Auto Parts
      </motion.p>

      {/* Hero Buttons */}
      <motion.div
        initial={{ opacity:0, y:15 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.2 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/cars" className="btn-primary px-8 py-3.5 flex items-center gap-2 hover:scale-105 transition-transform">
          <Car size={18}/> Browse Cars
        </Link>

        <Link to="/parts" className="btn-primary px-8 py-3.5 flex items-center gap-2 hover:scale-105 transition-transform">
          <Wrench size={18}/> Browse Car Parts
        </Link>
      </motion.div>

      {/* QuickSearch inside Hero */}
      <QuickSearch />
    </div>
  </section>
);

export default Hero;
