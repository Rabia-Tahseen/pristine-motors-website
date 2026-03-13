import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Parts & Vehicles ---
const parts = [
  "bumper","bonnet","headlight","taillight","mirror","side mirror",
  "steering","radiator","grill","fender","door","dashboard",
  "nose cut","interior","body parts","lighting"
];

const vehicles = [
  "toyota","corolla","honda","civic","suzuki","alto",
  "mehran","cultus","city","prius","revo"
];

const allItems = [...parts, ...vehicles];

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
    <motion.form
      onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay:0.2 }}
      className="flex w-full max-w-2xl mx-auto mt-6 shadow-xl rounded-lg overflow-hidden bg-white"
    >
      <div className="relative flex-1">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
        <input
          placeholder="Search by vehicle name or part name"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full border-none pl-11 pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-0"
        />
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-20"
            >
              {suggestions.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSearch(item)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        className="bg-[#0A1F44] text-white px-6 py-3 hover:bg-blue-800 transition-all"
      >
        Search
      </button>
    </motion.form>
  );
};

export default QuickSearch;
