import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    navigate(`/parts?search=${encodeURIComponent(q)}`);
  };

  return (
    <section className="py-8 bg-background">
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 max-w-2xl mx-auto"
        >

          <div className="relative flex-1">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Search parts..."
              className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none"
            />

          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-900 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Search
          </button>

        </motion.div>

      </div>
    </section>
  );
};

export default QuickSearch;
