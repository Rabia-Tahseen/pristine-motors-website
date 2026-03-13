import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Search } from "lucide-react";
import { useState } from "react";

// Only car parts
const parts = [
  "left side mirror",
  "right side mirror",
  "front bumper",
  "rear bumper",
  "headlight",
  "taillight",
  "bonnet",
  "fender",
  "steering wheel",
];

const Hero = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Navigate to parts page with search query
  const handleSearch = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    navigate(`/parts?search=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    // Auto-suggest: only parts starting with typed letters
    const filtered = parts.filter(part =>
      part.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // max 5 suggestions
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
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

        {/* SEARCH BAR */}
        <div className="mt-12 flex flex-col items-center">
          <div className="relative w-full max-w-3xl">
            <div className="flex bg-white rounded-xl shadow-md border overflow-hidden">
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
                    setSuggestions([]);
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

            {/* Auto-suggest dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-white border rounded-b-xl shadow-md mt-1">
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
      </div>
    </section>
  );
};

export default Hero;
