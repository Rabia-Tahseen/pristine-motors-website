import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Search } from "lucide-react";
import { useState } from "react";

// Categories list
const categories = ["lighting", "bumper", "interior", "body parts", "mirrors", "nose cut"];

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return;

    let url = "/parts";

    // Check for a partial match in categories
    const categoryMatch = categories.find(cat =>
      cat.toLowerCase().includes(trimmedQuery)
    );

    if (categoryMatch) {
      url += `?category=${encodeURIComponent(categoryMatch)}`;
    } else {
      // Anything else is treated as a general search (part name or vehicle)
      url += `?search=${encodeURIComponent(trimmedQuery)}`;
    }

    navigate(url);
  };

  return (
    <section className="relative pt-28 pb-28 overflow-hidden bg-gradient-to-b from-white to-blue-50">

      {/* radial highlight */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-blue-100 opacity-30 blur-3xl rounded-full"></div>
      </div>

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
          <Link
            to="/cars"
            className="bg-blue-900 hover:bg-blue-800 hover:scale-105 transition text-white px-8 py-3.5 rounded-lg flex items-center gap-2 shadow-md"
          >
            <Car size={18} />
            Browse Cars
          </Link>

          <Link
            to="/parts"
            className="bg-blue-900 hover:bg-blue-800 hover:scale-105 transition text-white px-8 py-3.5 rounded-lg flex items-center gap-2 shadow-md"
          >
            <Wrench size={18} />
            Browse Car Parts
          </Link>
        </motion.div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="mt-12 flex justify-center">
          <div className="flex w-full max-w-3xl bg-white rounded-xl shadow-md border overflow-hidden">

            <div className="flex items-center pl-4 text-gray-400">
              <Search size={18} />
            </div>

            <input
              placeholder="Search by part name or vehicle..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-4 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-900 text-white px-8 hover:bg-blue-800 transition"
            >
              Search
            </button>

          </div>
        </form>

      </div>
    </section>
  );
};

export default Hero;
