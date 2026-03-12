import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-24 pb-12 bg-background overflow-hidden">
    {/* Abstract pattern / geometric shapes */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Example pattern 1: faint gear shapes */}
      <svg className="absolute top-0 left-1/4 w-72 h-72 opacity-10" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" stroke="gray" strokeWidth="2" fill="none" />
        <line x1="50" y1="2" x2="50" y2="98" stroke="gray" strokeWidth="1" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="gray" strokeWidth="1" />
      </svg>
      {/* Example pattern 2: diagonal lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.02),rgba(0,0,0,0.02) 1px,transparent 1px,transparent 10px)]"></div>
      {/* Example pattern 3: subtle car outline */}
      <svg className="absolute bottom-0 right-0 w-64 h-32 opacity-5" viewBox="0 0 200 100" fill="none" stroke="gray" strokeWidth="2">
        <path d="M10 70 Q30 10 90 40 Q140 60 190 40" />
      </svg>
    </div>

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
