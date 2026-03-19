import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;

    // Navigate to parts page with search query
    navigate(`/parts?search=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="bg-gray-100 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">Find the Right Auto Parts</h1>

      <div className="flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for parts (e.g. mirrors, bumper...)"
          className="w-80 px-4 py-3 border rounded-l-lg outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;
