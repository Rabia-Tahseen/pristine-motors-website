import { Link } from "react-router-dom";
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

const BrowseByCategory = () => (
  <section className="py-12 section-alt">
    <div className="section-container">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
        Browse Parts by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categoryData.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/parts?category=${encodeURIComponent(cat.filter)}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white border border-gray-200
                         hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-blue-400 group-hover:text-blue-500 transition-colors duration-300"
              >
                <cat.icon size={36} />
              </motion.div>
              <span className="text-sm font-medium text-gray-900 font-body text-center">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BrowseByCategory;
