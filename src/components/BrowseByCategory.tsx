import { useNavigate } from "react-router-dom";

const categories = [
  "Body Parts",
  "Lighting",
  "Bumpers",
  "Mirrors",   // ✅ must match product data
  "Interior",
  "Nose Cut",
];

const BrowseByCategory = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  const handleClick = (cat: string) => {
    if (setActiveCategory) {
      setActiveCategory(cat);
    } else {
      navigate(`/parts?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`p-4 rounded border ${
            activeCategory === cat ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default BrowseByCategory;
