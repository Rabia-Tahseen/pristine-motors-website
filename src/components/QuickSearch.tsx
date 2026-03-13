import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

// Parts users may search
const parts = [
  "bumper",
  "bonnet",
  "headlight",
  "taillight",
  "mirror",
  "side mirror",
  "steering",
  "radiator",
  "grill",
  "fender",
  "door",
  "dashboard",
  "nose cut",
  "interior",
  "body parts",
  "lighting"
];

// Common vehicles
const vehicles = [
  "toyota",
  "corolla",
  "honda",
  "civic",
  "suzuki",
  "alto",
  "mehran",
  "cultus",
  "city",
  "prius",
  "revo"
];

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const allItems = [...parts, ...vehicles];

  const handleInputChange = (value: string) => {
    setQuery(value);

    const q = value.toLowerCase().trim();

    if (!q) {
      setSuggestions([]);
      return;
    }

    const matches = allItems.filter((item) =>
      item.includes(q)
    );

    setSuggestions(matches.slice(0, 6));
  };

  const handleSearch = (value?: string) => {
    const searchQuery = (value || query).trim().toLowerCase();

    if (!searchQuery) return;

    navigate(`/parts?search=${encodeURIComponent(searchQuery)}`);
    setSuggestions([]);
  };

  return (
    <section className="pt-1 pb-4 bg-background"> {/* higher position */}
      <div className="max-w-2xl mx-auto px-4">

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex w-full relative"
        >

          {/* Input */}
          <div className="relative flex-1">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              placeholder="Search by vehicle name or part name"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full border border-gray-300 rounded-l-lg pl-11 pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {/* Suggestions dropdown */}
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

          {/* Search Button */}
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

export default QuickSearch;
