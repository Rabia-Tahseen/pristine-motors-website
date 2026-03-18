import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/parts?search=${encodeURIComponent(query.trim())}`);
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
      <button
        onClick={handleSearch}
        className="bg-black text-white px-5 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default QuickSearch;
