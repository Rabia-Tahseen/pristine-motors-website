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

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/cars"
            className="bg-[#081a3a] text-white px-8 py-3 rounded-lg flex items-center gap-2
            transition-all duration-200 hover:bg-[#06132b] hover:shadow-xl hover:-translate-y-0.5"
          >
            <Car size={18}/>
            Browse Cars
          </Link>

          <Link
            to="/parts"
            className="bg-[#081a3a] text-white px-8 py-3 rounded-lg flex items-center gap-2
            transition-all duration-200 hover:bg-[#06132b] hover:shadow-xl hover:-translate-y-0.5"
          >
            <Wrench size={18}/>
            Browse Car Parts
          </Link>

        </div>

        {/* Search */}
        <div className="mt-12 flex max-w-3xl mx-auto bg-white border rounded-xl shadow-md overflow-hidden">

          <div className="flex items-center pl-4 text-gray-400">
            <Search size={18}/>
          </div>

          <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter") handleSearch();
            }}
            placeholder="Search parts (mirror, bumper, bonnet...)"
            className="flex-1 px-4 py-4 outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-[#081a3a] text-white px-8 hover:bg-[#06132b] transition"
          >
            Search
          </button>

        </div>

      </div>
    </section>
  );
};

export default Hero;
