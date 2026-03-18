import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [activeVehicle, setActiveVehicle] = useState(searchParams.get("vehicle") || "All");
  const [manualCategory, setManualCategory] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setActiveCategory(searchParams.get("category") || "All");
    setActiveVehicle(searchParams.get("vehicle") || "All");
  }, [searchParams]);

  const updateURL = (s, c, v) => {
    const params = {};
    if (s) params.search = s;
    if (c && c !== "All") params.category = c;
    if (v && v !== "All") params.vehicle = v;
    setSearchParams(params);
  };

  useEffect(() => {
    if (manualCategory) return;

    const q = search.toLowerCase();

    if (!q) return;

    if (q.includes("bumper")) {
      setActiveCategory("Bumpers");
      updateURL(search, "Bumpers", activeVehicle);
    } else if (q.includes("light") || q.includes("lamp")) {
      setActiveCategory("Lighting");
      updateURL(search, "Lighting", activeVehicle);
    } else if (q.includes("mirror")) {
      setActiveCategory("Mirrors");
      updateURL(search, "Mirrors", activeVehicle);
    } else if (q.includes("seat") || q.includes("interior")) {
      setActiveCategory("Interior");
      updateURL(search, "Interior", activeVehicle);
    } else if (q.includes("body") || q.includes("door") || q.includes("fender")) {
      setActiveCategory("Body Parts");
      updateURL(search, "Body Parts", activeVehicle);
    }
  }, [search, manualCategory]);

  useEffect(() => {
    if (!search) {
      setManualCategory(false);
      setActiveCategory("All");
    }
  }, [search]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return products.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchVehicle = activeVehicle === "All" || p.vehicle === activeVehicle;
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      return matchCategory && matchVehicle && matchSearch;
    });
  }, [search, activeCategory, activeVehicle]);

  const filterBtn = (active) =>
    `px-4 py-2 rounded-lg text-xs transition ${
      active ? "bg-blue-900 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`;

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold">All Parts</h1>
          <p className="text-gray-500 mt-2">Browse our complete catalog of auto parts.</p>
        </motion.div>

        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search by part name..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              updateURL(value, activeCategory, activeVehicle);
            }}
            className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mb-8">
          <div className="flex-1">
            <p className="text-xs mb-2">Category</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setManualCategory(true);
                    setActiveCategory(cat);
                    updateURL(search, cat, activeVehicle);
                  }}
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
                  onClick={() => {
                    setActiveVehicle(v);
                    updateURL(search, activeCategory, v);
                  }}
                  className={filterBtn(activeVehicle === v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-5">Showing {filtered.length} parts</p>

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
                  setSearchParams({});
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
