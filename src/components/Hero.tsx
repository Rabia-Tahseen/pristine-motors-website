import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/parts?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/parts");
    }
  };

  return (
    <div className="p-6 flex gap-2 justify-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-3 rounded"
        placeholder="Search parts..."
      />
      <button onClick={handleSearch} className="bg-blue-900 text-white px-4 rounded">
        Search
      </button>
    </div>
  );
};

export default Hero;
