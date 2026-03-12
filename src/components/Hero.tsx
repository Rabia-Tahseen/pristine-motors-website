import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-28 pb-16 overflow-hidden bg-background">

  {/* Premium gradient glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] 
    bg-blue-500/10 blur-[120px] rounded-full"></div>
  </div>

  {/* subtle grid pattern */}
  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>

  <div className="section-container relative z-10 text-center">

    <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground">
      Pristine
    </h1>

    <p className="mt-3 text-muted-foreground text-lg md:text-xl">
      Premium Japanese Cars & Auto Parts
    </p>

    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
      <Link to="/cars" className="btn-primary px-8 py-3.5 flex items-center gap-2">
        <Car size={18} />
        Browse Cars
      </Link>

      <Link to="/parts" className="btn-primary px-8 py-3.5 flex items-center gap-2">
        <Wrench size={18} />
        Browse Car Parts
      </Link>
    </div>

  </div>
</section>
    {/* Main content */}
    <div className="section-container relative z-10 text-center">
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
        <Link to="/cars" className="btn-primary text-base px-8 py-3.5 flex items-center justify-center gap-2">
          <Car size={18} />
          Browse Cars
        </Link>
        <Link to="/parts" className="btn-primary text-base px-8 py-3.5 flex items-center justify-center gap-2">
          <Wrench size={18} />
          Browse Car Parts
        </Link>
      </motion.div>
    </div>
  </section>
);

export default Hero;
