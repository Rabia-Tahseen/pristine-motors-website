import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Cog, Search } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const carKeywords = [
      "toyota",
      "honda",
      "suzuki",
      "nissan",
      "daihatsu",
      "mazda",
      "civic",
      "corolla",
      "alto",
      "mehran",
      "cultus",
      "wagon r",
      "city",
      "prius"
    ];

    const isCarSearch = carKeywords.some(word =>
      q.includes(word)
    );

    if (isCarSearch) {
      navigate(`/cars?search=${encodeURIComponent(q)}`);
    } else {
      navigate(`/parts?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
      </div>

      <div className="section-container relative z-10">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

        {/* LEFT SIDE BUTTONS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <Link
            to="/cars"
            className="group bg-[#1D2A55] text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:bg-[#162046] hover:shadow-xl hover:-translate-y-0.5"
          >
            <Car
              size={18}
              className="text-yellow-400 group-hover:text-yellow-300 transition-colors"
            />
            Browse Cars
          </Link>

          <Link
            to="/parts"
            className="group bg-[#1D2A55] text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:bg-[#162046] hover:shadow-xl hover:-translate-y-0.5"
          >
            <Cog
              size={16}
              className="text-yellow-400 group-hover:text-yellow-300 transition-colors"
            />
            Browse Parts
          </Link>
        </motion.div>


        {/* RIGHT SIDE SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex w-full max-w-2xl bg-white border rounded-xl shadow-md overflow-hidden"
        >
          <div className="flex items-center pl-4 flex-shrink-0">
            <Search size={18} className="text-yellow-400" />
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search cars or parts (Civic, bumper, mirror...)"
            className="flex-1 px-4 py-3 outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-[#1D2A55] text-white px-6 py-3 hover:bg-[#162046] transition font-medium"
          >
            Search
          </button>
        </motion.div>

      </div>

    </div>
    </section>
  );
};

export default Hero;