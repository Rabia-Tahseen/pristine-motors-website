import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cog, Disc3, Lightbulb, Layers, RectangleEllipsis, Circle } from "lucide-react";

// Six categories with relevant icons
const categoryData = [
  { name: "Panels", icon: Layers, filter: "Panels" },        // bonnet, trunk, fender
  { name: "Lighting", icon: Lightbulb, filter: "Lighting" }, // headlight, back light
  { name: "Bumpers", icon: RectangleEllipsis, filter: "Bumpers" },
  { name: "Mirrors", icon: Disc3, filter: "Mirrors" },       // left/right mirrors
  { name: "Interior", icon: Circle, filter: "Interior" },    // steering wheel / seats placeholder
  { name: "Nose Cut", icon: Cog, filter: "Nose Cut" },
];

const BrowseByCategory = () => (
  <section className="py-12 section-alt">
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
            <Link
              to={`/parts?category=${encodeURIComponent(cat.filter)}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* Icon with subtle gradient */}
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition">
                <cat.icon size={28} className="text-blue-700" />
              </div>

              <span className="text-sm font-medium text-foreground font-body text-center">
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
