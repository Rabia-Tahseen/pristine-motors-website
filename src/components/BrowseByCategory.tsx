import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get("category") || "All";
  const activeVehicle = searchParams.get("vehicle") || "All";
  const search = searchParams.get("search") || "";

  // When clicking a category, preserve search & vehicle filters
  const handleClick = (filter) => {
    const params = {};
    if (search) params.search = search;
    if (filter !== "All") params.category = filter;
    if (activeVehicle !== "All") params.vehicle = activeVehicle;

    const query = new URLSearchParams(params).toString();
    navigate(`/parts?${query}`);
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
                onClick={() => handleClick(cat.filter)}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer
                  ${activeCategory === cat.filter ? "bg-blue-900 text-white" : "bg-card text-foreground"}`}
              >
                <cat.icon
                  size={32}
                  className={`transition-colors duration-200 ${
                    activeCategory === cat.filter
                      ? "text-white"
                      : "text-[#1D2A55] group-hover:text-primary"
                  }`}
                />
                <span className="text-sm font-medium text-center">{cat.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
