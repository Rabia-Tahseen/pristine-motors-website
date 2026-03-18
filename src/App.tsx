import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Cog, Disc3, Lightbulb, Layers, RectangleEllipsis, Armchair, Search } from "lucide-react";
import { motion } from "framer-motion";

const categoryData = [
  { name: "All", icon: Layers, filter: "All" },
  { name: "Body Parts", icon: Layers, filter: "Body Parts" },
  { name: "Lighting", icon: Lightbulb, filter: "Lighting" },
  { name: "Bumpers", icon: RectangleEllipsis, filter: "Bumpers" },
  { name: "Mirrors", icon: Disc3, filter: "Mirrors" },
  { name: "Interior", icon: Armchair, filter: "Interior" },
  { name: "Nose Cut", icon: Cog, filter: "Nose Cut" },
];

const Index = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [vehicle, setVehicle] = useState("All");
  const navigate = useNavigate();

  // Filter products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesVehicle = vehicle === "All" || p.vehicle === vehicle;
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesVehicle && matchesSearch;
    });
  }, [category, vehicle, search]);

  return (
    <main className="pt-24 bg-white min-h-screen">

      {/* Browse by Category */}
      <section className="py-12 section-alt">
        <div className="section-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Browse Parts by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {categoryData.map((cat, i) => {
              const isActive = category === cat.filter;
              return (
                <motion.button
                  key={cat.name}
                  onClick={() => setCategory(cat.filter)}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-200
                    ${isActive ? "bg-blue-900 text-white border-blue-900" : "bg-white text-gray-700 border-gray-200 hover:shadow-md hover:-translate-y-1"}`}
                >
                  <cat.icon size={32} className={`transition-colors duration-200 ${isActive ? "text-white" : "text-blue-600"}`} />
                  <span className="text-sm font-medium text-center">{cat.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Vehicle filter */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setVehicle("All")}
              className={`px-3 py-1 rounded ${vehicle === "All" ? "bg-blue-900 text-white" : "bg-gray-200"}`}
            >
              All
            </button>
            {vehicles.map((v) => (
              <button
                key={v}
                onClick={() => setVehicle(v)}
                className={`px-3 py-1 rounded ${vehicle === v ? "bg-blue-900 text-white" : "bg-gray-200"}`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by part name..."
              className="w-full border pl-10 py-2 rounded"
            />
          </div>

          {/* Product count */}
          <p className="text-sm mb-4">
            Showing {filtered.length} {filtered.length === 1 ? "part" : "parts"}
          </p>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
