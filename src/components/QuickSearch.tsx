import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

// Define your fixed categories and colors
const categories = ["lighting", "bumper", "interior", "body parts", "mirrors", "nose cut"];
const colors = ["black", "white", "red", "blue", "silver", "yellow", "green"]; // add more as needed

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return;

    let url = "/parts";

    // Determine if the query matches a category
    const categoryMatch = categories.find(cat => cat.toLowerCase() === trimmedQuery);
    if (categoryMatch) {
      url += `?category=${encodeURIComponent(categoryMatch)}`;
    } else {
      // Check if it matches a color
      const colorMatch = colors.find(c => c.toLowerCase() === trimmedQuery);
      if (colorMatch) {
        url += `?color=${encodeURIComponent(colorMatch)}`;
      } else {
        // Default: search by name or brand
        url += `?search=${encodeURIComponent(trimmedQuery)}`;
      }
    }

    navigate(url);
  };

  return (
    <section className="py-8 bg-background">
      <div className="section-container">
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-3 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              placeholder="Search by part name, vehicle, color..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg pl-11 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-body text-sm bg-white shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0A1F44] text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Search
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuickSearch;
