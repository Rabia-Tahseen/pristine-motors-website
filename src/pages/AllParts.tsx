import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");

  // ✅ Sync URL → State
  useEffect(() => {
    const s = searchParams.get("search") || "";
    const c = searchParams.get("category") || "All";
    const v = searchParams.get("vehicle") || "All";

    setSearch(s);
    setActiveCategory(c);
    setActiveVehicle(v);
  }, [searchParams.toString()]);

  // ✅ FILTER LOGIC (SMART)
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const searchLower = search.toLowerCase();

      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower);

      const matchCategory =
        activeCategory === "All" || p.category === activeCategory;

      const matchVehicle =
        activeVehicle === "All" || p.vehicle === activeVehicle;

      return matchSearch && matchCategory && matchVehicle;
    });
  }, [search, activeCategory, activeVehicle]);

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">
        <h1 className="text-3xl font-bold mb-6">All Parts</h1>

        {/* 🔍 SEARCH INPUT */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              const lower = value.toLowerCase();

              // 🔥 AUTO DETECT CATEGORY FROM SEARCH
              const match = categories.find((cat) =>
                lower.includes(cat.toLowerCase().replace(/s$/, ""))
              );

              setSearch(value);
              setActiveCategory(match || "All");

              // ✅ UPDATE URL
              const params = {};
              if (value) params.search = value;
              if (match) params.category = match;

              setSearchParams(params);
            }}
            placeholder="Search..."
            className="w-full border pl-10 py-2 rounded"
          />
        </div>

        {/* 🧩 CATEGORY FILTER */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSearch("");
                  setActiveCategory(cat);
                  setActiveVehicle("All");

                  const params = {};
                  if (cat !== "All") params.category = cat;

                  setSearchParams(params);
                }}
                className={`px-3 py-1 rounded ${
                  activeCategory === cat
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🚗 VEHICLE FILTER */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {vehicles.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setActiveVehicle(v);

                  const params = {};
                  if (search) params.search = search;
                  if (activeCategory !== "All") params.category = activeCategory;
                  if (v !== "All") params.vehicle = v;

                  setSearchParams(params);
                }}
                className={`px-3 py-1 rounded ${
                  activeVehicle === v
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm mb-4">
          Showing {filtered.length} part{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* 🛒 PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllParts;
