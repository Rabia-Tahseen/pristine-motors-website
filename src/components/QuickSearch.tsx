import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "Lighting",
  "Bumper",
  "Interior",
  "Body Parts",
  "Mirrors",
  "Nose Cut",
];

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

    const params = new URLSearchParams();

    if (query.trim()) {
      params.append("search", query.trim());
    }

    if (selectedCategories.length > 0) {
      params.append("category", selectedCategories.join(","));
    }

    navigate(`/parts?${params.toString()}`);
  };

  return (
    <section className="py-8 bg-background">
      <div className="section-container">

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex gap-3 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              placeholder="Search by part name or vehicle..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg pl-11 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm bg-white shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0A1F44] text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Search
          </button>
        </motion.form>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-4 py-1.5 rounded-full border text-sm transition ${
                selectedCategories.includes(cat)
                  ? "bg-[#0A1F44] text-white border-[#0A1F44]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}

        </div>

        {/* Selected Filters */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-4">

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
