import { useState, useMemo } from "react";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllParts = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchVehicle = activeVehicle === "All" || p.vehicle === activeVehicle;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.vehicle.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchVehicle && matchSearch;
    });
  }, [search, activeCategory, activeVehicle]);

  const filterBtnClass = (active: boolean) =>
    `px-4 py-2 rounded-xl text-sm font-display font-medium transition-all ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground hover:bg-accent"
    }`;

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">All Parts</h1>
          <p className="mt-3 text-muted-foreground text-lg">Browse our complete catalog of genuine auto parts.</p>
        </motion.div>

        {/* Search */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            placeholder="Search by part name, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-body text-sm"
          />
        </div>

        {/* Vehicle Filter */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2 font-display">Filter by Vehicle:</p>
          <div className="flex gap-2 flex-wrap">
            {vehicles.map((v) => (
              <button key={v} onClick={() => setActiveVehicle(v)} className={filterBtnClass(activeVehicle === v)}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-2 font-display">Filter by Category:</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={filterBtnClass(activeCategory === cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-16 text-lg">No parts found.</p>
        )}
      </div>
    </main>
  );
};

export default AllParts;
