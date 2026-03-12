import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Lighting", "Bumper", "Interior", "Body Parts", "Mirrors", "Nose Cut"];

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const removeCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== cat));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() && selectedCategories.length === 0) return;

    const params = new URLSearchParams();
    if (query.trim()) params.append("search", query.trim());
    if (selectedCategories.length > 0) params.append("category", selectedCategories.join(","));

    navigate(`/parts?${params.toString()}`);
  };

  return (
    <section className="py-6 md:py-10 bg-background">
      <div className="section-container max-w-4xl mx-auto">

        {/* Search Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-1 gap-2 min-w-[200px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                placeholder="Search by part or vehicle..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0A1F44] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm"
            >
              Search
            </button>
          </form>

          {/* Filter Button */}
          <div className="relative mt-2 sm:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 border px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
            >
              <SlidersHorizontal size={16} /> Filter
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full mt-1 w-48 bg-white border rounded-lg shadow-md z-20"
                >
                  {categories.map((cat, idx) => (
                    <div key={cat}>
                      <button
                        onClick={() => toggleCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                          selectedCategories.includes(cat) ? "bg-blue-50" : ""
                        }`}
                      >
                        {cat}
                      </button>
                      {idx < categories.length - 1 && <hr className="border-gray-200" />}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected Filters */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {cat}
                <button onClick={() => removeCategory(cat)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default QuickSearch;
