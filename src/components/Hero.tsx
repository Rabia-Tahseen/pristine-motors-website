import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Cog, Settings, Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Parts & Vehicles ---
const parts = [
  "bumper", "bonnet", "headlight", "taillight", "mirror", "side mirror",
  "steering", "radiator", "grill", "fender", "door", "dashboard",
  "nose cut", "interior", "body parts", "lighting"
];

const vehicles = [
  "toyota", "corolla", "honda", "civic", "suzuki", "alto",
  "mehran", "cultus", "city", "prius", "revo"
];

const allItems = [...parts, ...vehicles];

// --- QuickSearch Component ---
const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setQuery(value);
    const q = value.toLowerCase().trim();
    if (!q) return setSuggestions([]);
    const matches = allItems.filter(item => item.includes(q));
    setSuggestions(matches.slice(0, 6));
  };

  const handleSearch = (value?: string) => {
    const searchQuery = (value || query).trim().toLowerCase();
    if (!searchQuery) return;
    navigate(`/parts?search=${encodeURIComponent(searchQuery)}`);
    setSuggestions([]);
  };

  return (
    <section className="pt-0 pb-4 bg-background mt-2"> {/* aligned under buttons */}
      <div className="max-w-2xl mx-auto px-4">
        <motion.form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex w-full relative"
        >
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              placeholder="Search by vehicle name or part name"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full border border-gray-300 rounded-l-lg pl-11 pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-20">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSearch(item)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#0A1F44] text-white px-6 py-3 rounded-r-lg hover:bg-blue-800 transition"
          >
            Search
          </button>
        </motion.form>
      </div>
    </section>
  );
};

// --- Hero Component ---
const Hero = () => (
  <section className="relative pt-16 pb-12 overflow-hidden bg-background"> {/* reduced pt */}
    {/* floating icons */}
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <Wrench className="absolute top-16 left-24 w-8 h-8 rotate-12"/>
      <Cog className="absolute top-40 right-32 w-10 h-10 -rotate-6"/>
      <Settings className="absolute bottom-32 left-40 w-9 h-9 rotate-12"/>
      <Wrench className="absolute bottom-20 right-24 w-8 h-8 -rotate-12"/>
      <Cog className="absolute top-72 left-1/2 w-10 h-10 rotate-6"/>
    </div>

    <div className="section-container relative z-10 text-center">
      <motion.h1
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5 }}
        className="font-display font-bold text-5xl md:text-6xl text-foreground"
      >
        Pristine
      </motion.h1>

      <motion.p
        initial={{ opacity:0, y:15 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.1 }}
        className="mt-4 text-lg md:text-xl text-muted-foreground"
      >
        Premium Japanese Cars & Auto Parts
      </motion.p>

      <motion.div
        initial={{ opacity:0, y:15 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.2 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/cars" className="btn-primary px-8 py-3.5 flex items-center gap-2">
          <Car size={18}/> Browse Cars
        </Link>

        <Link to="/parts" className="btn-primary px-8 py-3.5 flex items-center gap-2">
          <Wrench size={18}/> Browse Car Parts
        </Link>
      </motion.div>
    </div>

    {/* Search bar appears immediately after Hero buttons */}
    <QuickSearch />
  </section>
);

export default Hero;
