import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cog, Disc3, Lightbulb, Layers, RectangleEllipsis, Armchair } from "lucide-react";

const categoryData = [
  { name: "Body Parts", icon: Layers, filter: "Body Parts" },
  { name: "Lighting", icon: Lightbulb, filter: "Lighting" },
  { name: "Bumpers", icon: RectangleEllipsis, filter: "Bumpers" },
  { name: "Mirrors", icon: Disc3, filter: "Mirrors" },
  { name: "Interior", icon: Armchair, filter: "Interior" },
  { name: "Nose Cut", icon: Cog, filter: "Nose Cut" },
];

const BrowseByCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (filter) => {
    // Navigate to /parts with the selected category
    navigate(`/parts?category=${encodeURIComponent(filter)}`);
  };

  return (
    <section className="pt-8 pb-8 section-alt">
      <div className="section-container">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Browse Parts by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                onClick={() => handleCategoryClick(cat.filter)}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
              >
                <cat.icon
                  size={32}
                  className="text-[#1D2A55] group-hover:text-primary transition-colors duration-200"
                />
                <span className="text-sm font-medium text-foreground text-center">
                  {cat.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
