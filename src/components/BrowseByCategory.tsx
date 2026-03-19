import { Link } from "react-router-dom";

const categories = [
  "Body Parts",
  "Lighting",
  "Bumpers",
  "Mirrors",
  "Interior",
  "Nose Cut",
];

const BrowseByCategory = () => (
  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-6">
    {categories.map((cat) => (
      <Link
        key={cat}
        to={`/parts?category=${encodeURIComponent(cat)}`}
        className="p-4 border rounded-lg text-center hover:shadow"
      >
        {cat}
      </Link>
    ))}
  </div>
);

export default BrowseByCategory;
