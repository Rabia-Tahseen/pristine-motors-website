import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );

  useEffect(() => {
    const s = searchParams.get("search");
    const c = searchParams.get("category");
    if (s) setSearch(s);
    if (c) setActiveCategory(c);
  }, [searchParams]);

  // Only match part name (starts-with)
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const catMatch = activeCategory === "All" || p.category === activeCategory;
      const nameMatch =
        !q || p.name.toLowerCase().startsWith(q); // title only
      return catMatch && nameMatch;
    });
  }, [search, activeCategory]);

  const filterBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg text-xs font-body font-medium transition-all duration-200 ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "bg-card text-muted-foreground hover:bg-muted border border-border"
    }`;

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          All Parts
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Browse our complete catalog of genuine auto parts.
        </p>

        <input
          placeholder="Search by part name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-border rounded-lg pl-4 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 mb-5"
        />

        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={filterBtn(activeCategory === cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          Showing {filtered.length} {filtered.length === 1 ? "part" : "parts"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No parts found matching your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-3 text-primary hover:underline text-sm font-medium"
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
