import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { categories } from "@/data/products";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;

    const match = categories.find(
      (cat) => cat.toLowerCase() === q.toLowerCase()
    );

    if (match) {
      navigate(`/parts?search=${encodeURIComponent(q)}&category=${encodeURIComponent(match)}`);
    } else {
      navigate(`/parts?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search parts..."
        className="border p-2 rounded w-full"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
