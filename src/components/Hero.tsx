import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Search } from "lucide-react";
import { useState, useMemo } from "react";

// Parts list
const parts = [
  "left side mirror",
  "right side mirror",
  "front bumper",
  "rear bumper",
  "headlight",
  "bonnet",
  "fender",
  "steering wheel",
  "nose cut",
  "trunk",
  "bumper",
];

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Suggestions: only parts that start with what user types
  const suggestions = useMemo(() => {
    const value = query.toLowerCase().trim();
    if (!value) return [];
    return parts.filter((part) => part.toLowerCase().startsWith(value));
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    navigate(`/parts?search=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (sug: string) => {
    setQuery(sug);
    handleSearch(sug);
  };

  return (
    <section className="relative pt-28 pb-28 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-blue-100 opacity-30 blur-3xl rounded-full"></div>
      </div>

      <div className="section-container text-center relative z-10">
        <motion.h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-gray-900">
          Pristine
        </motion.h1>
        <motion.p className="mt-4 text-lg md:text-xl text-gray-600">
          Premium Japanese Cars & Auto Parts
        </motion.p>

        <motion.div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cars"
            className="bg-blue-900 hover:bg-blue-800 hover:scale-105 transition text-white px-8 py-3.5 rounded-lg flex items-center gap-2 shadow-md"
          >
            <Car size={18} /> Browse Cars
          </Link>

          <Link
            to="/parts"
            className="bg-blue-900 hover:bg-blue-800 hover:scale-105 transition text-white px-8 py-3.5 rounded-lg flex items-center gap-2 shadow-md"
          >
            <Wrench size={18} /> Browse Car Parts
          </Link>
        </motion.div>

        {/* Search Bar */}
        <div className="mt-12 flex flex-col items-center relative w-full max-w-3xl mx-auto">
          <div className="flex bg-white rounded-xl shadow-md border overflow-hidden w-full">
            <div className="flex items-center pl-4 text-gray-400">
              <Search size={18} />
            </div>

            <input
              placeholder="Search car parts..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(query);
                }
              }}
              className="flex-1 px-4 py-4 outline-none"
            />

            <button
              onClick={() => handleSearch(query)}
              className="bg-blue-900 text-white px-8 hover:bg-blue-800 transition"
            >
              Search
            </button>
          </div>

          {/* Suggestions below input */}
          {suggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-white border rounded-b-xl shadow-md mt-1 max-h-56 overflow-y-auto">
              {suggestions.map((sug, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(sug)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-left"
                >
                  {sug}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
