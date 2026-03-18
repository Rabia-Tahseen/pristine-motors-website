import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/products";

const normalize = (str) => str.toLowerCase().trim();

const findMatchingCategory = (query) => {
  const q = normalize(query);

  return categories.find((cat) => {
    const c = normalize(cat);

    return (
      c === q ||
      c.includes(q) ||
      q.includes(c) ||
      c.replace(/s$/, "") === q ||
      q.replace(/s$/, "") === c
    );
  });
};

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;

    const match = findMatchingCategory(q);

    if (match) {
      navigate(
        `/parts?search=${encodeURIComponent(q)}&category=${encodeURIComponent(match)}`
      );
    } else {
      navigate(`/parts?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="flex gap-2 max-w-xl mx-auto">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search parts..."
        className="flex-1 border p-3 rounded"
      />
      <button onClick={handleSearch} className="bg-black text-white px-5 rounded">
        Search
      </button>
    </div>
  );
};

export default QuickSearch;
