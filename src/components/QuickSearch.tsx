import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["lighting", "bumper", "interior", "body parts", "mirrors", "nose cut"];

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setQuery(value);

    const trimmed = value.toLowerCase().trim();

    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const matches = categories.filter((cat) =>
      cat.toLowerCase().includes(trimmed)
    );

    setSuggestions(matches);
  };

  const handleSearch = (searchValue?: string) => {
    const trimmedQuery = (searchValue || query).trim().toLowerCase();
    if (!trimmedQuery) return;

    let url = "/parts";

    const categoryMatch = categories.find(
      (cat) => cat.toLowerCase() === trimmedQuery
    );

    if (categoryMatch) {
      url += `?category=${encodeURIComponent(categoryMatch)}`;
    } else {
      url += `?search=${encodeURIComponent(trimmedQuery)}`;
    }

    setSuggestions([]);
    navigate(url);
  };

  return (
    <section className="py-8 bg-background">
      <div className="max-w-2xl mx-auto px-4">

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex relative w-full"
        >

          {/* Search Input */}
          <div className="relative flex-1">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              placeholder="Search parts..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full border border-gray-300 rounded-l-lg pl-11 pr-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {/* Suggestions Dropdown */}
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
