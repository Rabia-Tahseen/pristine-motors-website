import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench } from "lucide-react";

const Hero = () => (
  <section className="relative pt-28 pb-28 bg-white overflow-hidden">

    {/* dark blue diagonal */}
    <div className="absolute inset-0 bg-blue-900 opacity-10 
    [clip-path:polygon(0_0,50%_0,35%_100%,0_100%)]"></div>

    {/* light blue diagonal */}
    <div className="absolute inset-0 bg-blue-400 opacity-20 
    [clip-path:polygon(0_0,70%_0,50%_100%,0_100%)]"></div>

    <div className="section-container text-center relative z-10">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-gray-900"
      >
        Pristine
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4 text-lg md:text-xl text-gray-600"
      >
        Premium Japanese Cars & Auto Parts
      </motion.p>

      {/* buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/cars" className="btn-primary px-8 py-3 flex items-center gap-2">
          <Car size={18} />
          Browse Cars
        </Link>

        <Link to="/parts" className="btn-primary px-8 py-3 flex items-center gap-2">
          <Wrench size={18} />
          Browse Car Parts
        </Link>
      </motion.div>

      {/* search bar inside hero */}
      <div className="mt-12 flex justify-center">
        <div className="flex w-full max-w-3xl bg-white rounded-xl shadow-lg border">
          <input
            type="text"
            placeholder="Search by part name, vehicle, color..."
            className="flex-1 px-5 py-4 rounded-l-xl outline-none"
          />
          <button className="bg-blue-900 text-white px-8 rounded-r-xl hover:bg-blue-800">
            Search
          </button>
        </div>
      </div>

    </div>
  </section>
);

export default Hero;
