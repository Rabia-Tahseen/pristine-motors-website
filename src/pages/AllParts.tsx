import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");

  useEffect(() => {
    const s = searchParams.get("search") || "";
    const c = searchParams.get("category") || "All";
    const v = searchParams.get("vehicle") || "All";

    setSearch(s);
    setActiveCategory(c);
    setActiveVehicle(v);
  }, [searchParams]);

  const updateURL = (s, c, v) => {
    const params = {};

    if (s) params.search = s;
    if (c !== "All") params.category = c;
    if (v !== "All") params.vehicle = v;

    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return products.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchVehicle = activeVehicle === "All" || p.vehicle === activeVehicle;
      const matchSearch = !q || p.name.toLowerCase().includes(q);

      return matchCategory && matchVehicle && matchSearch;
    });
  }, [search, activeCategory, activeVehicle]);

  const filterBtn = (active) =>
    `px-4 py-2 rounded-lg text-xs ${
      active ? "bg-blue-900 text-white" : "bg-gray-100"
    }`;

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">

        <h1 className="text-3xl font-bold mb-2">All Parts</h1>
        <p className="text-gray-500 mb-6">Browse all parts</p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
              updateURL(val, activeCategory, activeVehicle);
            }}
            placeholder="Search..."
            className="w-full border pl-10 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">Category</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateURL(search, cat, activeVehicle)}
                className={filterBtn(activeCategory === cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm mb-2">Vehicle</p>
          <div className="flex gap-2 flex-wrap">
            {vehicles.map((v) => (
              <button
                key={v}
                onClick={() => updateURL(search, activeCategory, v)}
                className={filterBtn(activeVehicle === v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing {filtered.length} parts
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

      </div>
    </main>
  );
};

export default AllParts;
