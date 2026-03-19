import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cog, Disc3, Lightbulb, Layers, RectangleEllipsis, Armchair } from "lucide-react";

const categoryData = [
  { name: "All", icon: Layers },
  { name: "Body Parts", icon: Layers },
  { name: "Lighting", icon: Lightbulb },
  { name: "Bumpers", icon: RectangleEllipsis },
  { name: "Mirrors", icon: Disc3 },
  { name: "Interior", icon: Armchair },
  { name: "Nose Cut", icon: Cog },
];

const BrowseByCategory = ({ activeCategory, setActiveCategory }: any) => {
  const navigate = useNavigate();

  const handleClick = (cat: string) => {
    // ✅ If inside AllParts → update URL via parent
    if (setActiveCategory) {
      setActiveCategory(cat);
    } 
    // ✅ If on homepage → navigate
    else {
      if (cat === "All") {
        navigate("/parts");
      } else {
        navigate(`/parts?category=${encodeURIComponent(cat)}`);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categoryData.map((cat, i) => {
        const isActive =
          activeCategory === cat.name ||
          (cat.name === "All" && !activeCategory);

        return (
          <motion.button
            key={cat.name}
            onClick={() => handleClick(cat.name)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-200
              ${
                isActive
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-gray-700 border-gray-200 hover:shadow-md hover:-translate-y-1"
              }`}
          >
            <cat.icon
              size={32}
              className={isActive ? "text-white" : "text-blue-600"}
            />
            <span className="text-sm font-medium text-center">
              {cat.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default BrowseByCategory;
