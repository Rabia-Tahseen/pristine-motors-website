import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/parts?search=${encodeURIComponent(query.trim())}`);
    }
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              placeholder="Search by part name, vehicle, category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-border rounded-lg pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all font-body text-sm bg-background"
            />
          </div>
          <button type="submit" className="btn-primary">
            Search
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuickSearch;
