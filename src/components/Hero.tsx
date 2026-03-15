import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Rectangle, Search } from "lucide-react"; // Rectangle replaces Wrench
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
    <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
      </div>

      <div className="section-container text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-6xl text-gray-900"
        >
          Pristine
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-gray-600"
        >
          Premium Japanese Cars & Auto Parts
        </motion.p>

        {/* Hero Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cars"
            className="group bg-[#1D2A55] text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:bg-[#162046] hover:shadow-xl hover:-translate-y-0.5"
          >
            <Car size={18} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            Browse Cars
          </Link>

          <Link
            to="/parts"
            className="group bg-[#1D2A55] text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:bg-[#162046] hover:shadow-xl hover:-translate-y-0.5"
          >
            <Rectangle size={18} className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            Browse Car Parts
          </Link>
        </div>

        {/* Horizontal Search Bar */}
        <div className="mt-10 flex flex-row max-w-3xl mx-auto w-full bg-white border rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center pl-4 flex-shrink-0">
            <Search size={18} className="text-yellow-400" />
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search parts (mirror, bumper, bonnet...)"
            className="flex-1 px-4 py-3 outline-none w-full"
          />

          <button
            onClick={handleSearch}
            className="bg-[#1D2A55] text-white px-6 py-3 hover:bg-[#162046] transition flex items-center justify-center"
          >
            <Search size={16} className="text-yellow-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
