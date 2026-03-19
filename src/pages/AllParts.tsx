import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [activeVehicle, setActiveVehicle] = useState("All");

  useEffect(() => {
    const s = searchParams.get("search");
    const c = searchParams.get("category");
    if (s) setSearch(s);
    if (c) setActiveCategory(c);
  }, [searchParams]);

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
    `px-4 py-2 rounded-lg text-xs font-body font-medium transition-all duration-200 ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "bg-card text-muted-foreground hover:bg-muted border border-border"
    }`;

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">All Parts</h1>
          <p className="mt-2 text-muted-foreground text-sm font-body">Browse our complete catalog of genuine auto parts.</p>
        </motion.div>

        {/* Search */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
          <input
            placeholder="Search by part name, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-lg pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all font-body text-sm bg-background"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-5 mb-8">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-body font-medium">Vehicle</p>
            <div className="flex gap-2 flex-wrap">
              {vehicles.map((v) => (
                <button key={v} onClick={() => setActiveVehicle(v)} className={filterBtn(activeVehicle === v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-body font-medium">Category</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={filterBtn(activeCategory === cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-body mb-5">
          Showing {filtered.length} {filtered.length === 1 ? "part" : "parts"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg font-body">No parts found matching your filters.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); setActiveVehicle("All"); }}
              className="mt-3 text-primary hover:underline font-body text-sm font-medium"
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
