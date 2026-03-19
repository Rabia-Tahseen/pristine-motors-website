import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    if (query.trim()) {
      searchParams.set("search", query.trim());
    } else {
      searchParams.delete("search");
    }
    navigate(`/parts?${searchParams.toString()}`);
  };

  return (
    <div className="hero-section p-6 bg-gray-100">
      <input
        type="text"
        placeholder="Search parts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-3 rounded-l-lg border border-gray-300 w-72"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-900 text-white p-3 rounded-r-lg hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default Hero;
