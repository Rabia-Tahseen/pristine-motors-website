import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");

  useEffect(() => {
    const s = searchParams.get("search");
    if (s) setSearch(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return products.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchVehicle = activeVehicle === "All" || p.vehicle === activeVehicle;
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      return matchCategory && matchVehicle && matchSearch;
    });
  }, [search, activeCategory, activeVehicle]);

  const filterBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg text-xs transition ${
      active ? "bg-blue-900 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`;

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">All Parts</h1>
          <p className="text-gray-500 mt-2">
            Browse our complete catalog of auto parts.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative w-full mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Search by part name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-5 mb-8">
          <div className="flex-1">
            <p className="text-xs mb-2">Category</p>
            <div className="flex gap-2 flex-wrap">
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
          </div>

          <div className="flex-1">
            <p className="text-xs mb-2">Vehicle</p>
            <div className="flex gap-2 flex-wrap">
              {vehicles.map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVehicle(v)}
                  className={filterBtn(activeVehicle === v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-5">Showing {filtered.length} parts</p>

        {/* Cards section with gray background */}
        <div className="bg-gray-50 -mx-6 px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No parts found.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setActiveVehicle("All");
                }}
                className="mt-3 text-blue-700 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AllParts;
