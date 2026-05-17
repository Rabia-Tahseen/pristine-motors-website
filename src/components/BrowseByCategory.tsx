import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cog,
  Disc3,
  Lightbulb,
  Layers,
  RectangleEllipsis,
  Armchair
} from "lucide-react";

// CLEAN SLUGS (URL SAFE)
const categoryData = [
  { name: "Body Parts", icon: Layers, filter: "Body Parts" },
  { name: "Lighting", icon: Lightbulb, filter: "Lighting" },
  { name: "Bumpers", icon: RectangleEllipsis, filter: "Bumpers" },
  { name: "Mirrors", icon: Disc3, filter: "Mirrors" },
  { name: "Interior", icon: Armchair, filter: "Interior" },
  { name: "Nose Cut", icon: Cog, filter: "Nose Cut" },
];

// 🔥 REAL FIX (removes \n, spaces, weird chars)
const clean = (v: string) =>
  v
    ?.replace(/[\n\r]+/g, "")   // remove ALL newlines
    .trim();

const BrowseByCategory = () => (
  <section className="py-6 section-alt">
    <div className="section-container">
      
<h2 className="text-2xl font-bold mb-6">
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
              to={`/parts?category=${encodeURIComponent(clean(cat.filter))}`}
              className="flex flex-col items-center gap-3 p-5 rounded-xl
                bg-gradient-to-bl from-blue-200/50 via-card to-blue-200/50
                dark:from-blue-900/70 dark:via-card dark:to-transparent
                border border-border
                hover:shadow-md hover:-translate-y-1
                transition-all duration-200 group"
            >
              <cat.icon size={32} className="text-muted-foreground group-hover:text-primary" />

              <span className="text-sm font-medium text-foreground text-center">
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
