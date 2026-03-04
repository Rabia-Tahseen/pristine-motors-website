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

  const filterBtn = (active: boolean) =>
    `px-4 py-2 rounded-xl text-xs font-body font-medium uppercase tracking-wider transition-all duration-300 ${
      active
        ? "bg-primary text-primary-foreground shadow-md"
        : "bg-card text-muted-foreground hover:bg-muted border border-border/50"
    }`;

  return (
    <main className="pt-28 pb-24 bg-background min-h-screen">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-xs font-body uppercase tracking-[0.2em] mb-4">Catalog</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground section-heading">All Parts</h1>
          <p className="mt-6 text-muted-foreground text-base font-body">Browse our complete catalog of genuine auto parts.</p>
        </motion.div>

        {/* Search */}
        <div className="relative w-full mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
          <input
            placeholder="Search by part name, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border/50 rounded-2xl pl-12 pr-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all font-body text-sm shadow-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-body font-medium">Vehicle</p>
            <div className="flex gap-2 flex-wrap">
              {vehicles.map((v) => (
                <button key={v} onClick={() => setActiveVehicle(v)} className={filterBtn(activeVehicle === v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-body font-medium">Category</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={filterBtn(activeCategory === cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground font-body mb-6">
          Showing {filtered.length} {filtered.length === 1 ? "part" : "parts"}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg font-body">No parts found matching your filters.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); setActiveVehicle("All"); }}
              className="mt-4 text-accent hover:text-accent/80 font-body text-sm font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllParts;
