import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

const normalize = (str) => str.toLowerCase().trim();

// 🔥 Fuzzy match helper
const findMatchingCategory = (query) => {
  const q = normalize(query);

  return categories.find((cat) => {
    const c = normalize(cat);

    return (
      c === q || // exact
      c.includes(q) || // category contains query
      q.includes(c) || // query contains category
      c.replace(/s$/, "") === q || // singular/plural
      q.replace(/s$/, "") === c
    );
  });
};

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");

  // 🔥 Sync URL → State with fuzzy logic
  useEffect(() => {
    const s = searchParams.get("search") || "";
    const c = searchParams.get("category") || "All";
    const v = searchParams.get("vehicle") || "All";

    let detectedCategory = c;

    if (s) {
      const match = findMatchingCategory(s);
      if (match) detectedCategory = match;
    }

    setSearch(s);
    setActiveCategory(detectedCategory);
    setActiveVehicle(v);
  }, [searchParams.toString()]);

  // 🔥 Unified filter handler
  const handleFilterChange = (s, c, v) => {
    const params = {};
    if (s) params.search = s;
    if (c !== "All") params.category = c;
    if (v !== "All") params.vehicle = v;

    setSearchParams(params);

    setSearch(s);
    setActiveCategory(c);
    setActiveVehicle(v);
  };

  // 🔥 Filtering logic
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === "All" || p.category === activeCategory;

      const matchVehicle =
        activeVehicle === "All" || p.vehicle === activeVehicle;

      const matchSearch =
        !search ||
        normalize(p.name).includes(normalize(search)) ||
        normalize(p.category).includes(normalize(search));

      return matchCategory && matchVehicle && matchSearch;
    });
  }, [search, activeCategory, activeVehicle]);

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">
        <h1 className="text-3xl font-bold mb-6">All Parts</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) =>
              handleFilterChange(e.target.value, activeCategory, activeVehicle)
            }
            placeholder="Search..."
            className="w-full border pl-10 py-2 rounded"
          />
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange("", cat, activeVehicle)} // ✅ clears search
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

        {/* Vehicles */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {vehicles.map((v) => (
              <button
                key={v}
                onClick={() =>
                  handleFilterChange(search, activeCategory, v)
                }
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
