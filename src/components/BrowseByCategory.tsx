import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Cog, Disc3, Lightbulb, Layers, RectangleEllipsis, Armchair } from "lucide-react";

// ❌ Remove "All" for homepage
const homepageCategories = [
  { name: "Body Parts", icon: Layers, filter: "Body Parts" },
  { name: "Lighting", icon: Lightbulb, filter: "Lighting" },
  { name: "Bumpers", icon: RectangleEllipsis, filter: "Bumpers" },
  { name: "Mirrors", icon: Disc3, filter: "Mirrors" },
  { name: "Interior", icon: Armchair, filter: "Interior" },
  { name: "Nose Cut", icon: Cog, filter: "Nose Cut" },
];

const BrowseByCategoryHomepage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (cat: string) => {
    navigate(`/parts?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {homepageCategories.map((cat, i) => (
        <motion.button
          key={cat.name}
          onClick={() => handleClick(cat.filter)}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-white text-gray-700 border-gray-200 hover:shadow-md hover:-translate-y-1"
        >
          <cat.icon size={32} className="text-blue-600" />
          <span className="text-sm font-medium text-center">{cat.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default BrowseByCategoryHomepage;
