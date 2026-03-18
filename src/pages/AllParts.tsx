import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";
import BrowseByCategory from "@/components/BrowseByCategory";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [vehicle, setVehicle] = useState("All");

  // ✅ Sync category from URL (FIXED)
  useEffect(() => {
    const catFromURL = searchParams.get("category");
    if (catFromURL) {
      setCategory(catFromURL);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  // ✅ Handle category change (FIXED - no mutation)
  const handleCategoryChange = (cat) => {
    console.log("CLICKED CATEGORY:", cat); // 🧪 DEBUG

    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // ✅ FILTER LOGIC (with debug)
  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const matchesCategory =
        category === "All" ||
        p.category.toLowerCase() === category.toLowerCase();

      const matchesVehicle =
        vehicle === "All" || p.vehicle === vehicle;

      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesVehicle && matchesSearch;
    });

    // 🧪 DEBUG LOGS
    console.log("CURRENT CATEGORY:", category);
    console.log("FILTERED COUNT:", result.length);

    return result;
  }, [search, category, vehicle]);

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">
        <h1 className="text-3xl font-bold mb-2">All Parts</h1>
        <p className="text-gray-600 mb-6">
          Browse our complete catalog of auto parts.
        </p>

        {/* 🔍 Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by part name..."
            className="w-full border pl-10 py-2 rounded"
          />
        </div>

        {/* 🧩 Category */}
        <div className="mb-6">
          <BrowseByCategory
            activeCategory={category}
            setActiveCategory={handleCategoryChange}
          />
        </div>

        {/* 🚗 Vehicle */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {vehicles.map((v) => (
            <button
              key={v}
              onClick={() => setVehicle(v)}
              className={`px-3 py-1 rounded ${
                vehicle === v
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* 📊 Count */}
        <p className="text-sm mb-4">
          Showing {filtered.length}{" "}
          {filtered.length === 1 ? "part" : "parts"}
        </p>

        {/* 🛒 Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((p, index) => (
            <ProductCard key={p.id} product={p} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllParts;
