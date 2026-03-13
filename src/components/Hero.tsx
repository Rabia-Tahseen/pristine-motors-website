
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Search } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    navigate(`/parts?search=${encodeURIComponent(q)}`);
  };

  return (
    <section className="relative pt-32 pb-32 overflow-hidden bg-gradient-to-b from-white to-blue-50">

      {/* Background Glow (premium hero effect) */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[750px] h-[420px] bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
      </div>

      <div className="section-container text-center relative z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-gray-900"
        >
          Pristine
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 text-lg md:text-xl text-gray-600"
        >
          Premium Japanese Cars & Auto Parts
        </motion.p>

        {/* Browse Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/cars"
            className="bg-blue-900 text-white px-8 py-3 rounded-lg flex items-center gap-2 
            transition-all duration-200 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Car size={18} />
            Browse Cars
          </Link>

          <Link
            to="/parts"
            className="bg-blue-900 text-white px-8 py-3 rounded-lg flex items-center gap-2 
            transition-all duration-200 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Wrench size={18} />
            Browse Car Parts
          </Link>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 flex max-w-3xl mx-auto bg-white border rounded-xl shadow-md overflow-hidden"
        >

          {/* Icon */}
          <div className="flex items-center pl-4 text-gray-400">
            <Search size={18} />
          </div>

          {/* Input */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search parts (mirror, bumper, bonnet...)"
            className="flex-1 px-4 py-4 outline-none"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-900 text-white px-8 transition-all duration-200 hover:bg-blue-800 hover:shadow-lg"
          >
            Search
          </button>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

