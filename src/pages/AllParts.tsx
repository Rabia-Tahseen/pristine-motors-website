import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";
import BrowseByCategory from "@/components/BrowseByCategory";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [vehicle, setVehicle] = useState("All");

  // ✅ Read URL params ONCE on initial load
  useEffect(() => {
    const s = searchParams.get("search") || "";
    const c = searchParams.get("category") || "All";
    const v = searchParams.get("vehicle") || "All";

    setSearch(s);
    setCategory(c);
    setVehicle(v);
  }, []); // run only once

  // ✅ Filter products based on current search/category/vehicle
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesVehicle = vehicle === "All" || p.vehicle === vehicle;
      const matchesSearch =
        !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesVehicle && matchesSearch;
    });
  }, [search, category, vehicle]);

  // ✅ Update URL when filters change
  const updateURL = (s: string, c: string, v: string) => {
    const params: Record<string, string> = {};
    if (s) params.search = s;
    if (c !== "All") params.category = c;
    if (v !== "All") params.vehicle = v;
    setSearchParams(params);
  };

  useEffect(() => {
    updateURL(search, category, vehicle);
  }, [search, category, vehicle]);

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">
        <h1 className="text-3xl font-bold mb-6">All Parts</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border pl-10 py-2 rounded"
          />
        </div>

        {/* Browse By Category */}
        <div className="mb-6">
          <BrowseByCategory
            activeCategory={category}
            setActiveCategory={setCategory}
          />
        </div>

        {/* Vehicle Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {vehicles.map((v) => (
            <button
              key={v}
              onClick={() => setVehicle(v)}
              className={`px-3 py-1 rounded ${
                vehicle === v ? "bg-blue-900 text-white" : "bg-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <p className="text-sm mb-4">
          Showing {filtered.length} {filtered.length === 1 ? "part" : "parts"}
        </p>

        {/* Products Grid */}
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
