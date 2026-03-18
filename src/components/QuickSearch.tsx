import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const detectCategory = (q) => {
    if (q.includes("bumper")) return "Bumpers";
    if (q.includes("light") || q.includes("lamp")) return "Lighting";
    if (q.includes("mirror")) return "Mirrors";
    if (q.includes("seat") || q.includes("interior")) return "Interior";
    if (q.includes("body") || q.includes("door") || q.includes("fender")) return "Body Parts";
    return null;
  };

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const category = detectCategory(q);

    let url = `/parts?search=${encodeURIComponent(q)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;

    navigate(url);
  };

  return (
    <section className="py-8">
      <div className="section-container flex gap-3 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
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
          className="bg-[#081a3a] text-white px-5 py-3 rounded-lg hover:bg-[#06132b]"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default QuickSearch;
