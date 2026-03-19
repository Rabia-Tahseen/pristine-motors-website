import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim();

    if (q) {
      navigate(`/parts?search=${encodeURIComponent(q)}`);
    } else {
      navigate(`/parts`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex gap-2 justify-center">
      <input
        type="text"
        placeholder="Search parts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-3 border rounded-lg w-80"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-900 text-white px-5 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default Hero;
