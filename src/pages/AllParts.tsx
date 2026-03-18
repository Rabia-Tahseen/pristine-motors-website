import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep filter state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [vehicle, setVehicle] = useState("All");

  // Whenever URL changes, update state
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
    setVehicle(searchParams.get("vehicle") || "All");
  }, [searchParams.toString()]); // watch full string

  // Update URL + state together
  const updateFilters = (newSearch, newCategory, newVehicle) => {
    const params = {};
    if (newSearch) params.search = newSearch;
    if (newCategory !== "All") params.category = newCategory;
    if (newVehicle !== "All") params.vehicle = newVehicle;
    setSearchParams(params);
    setSearch(newSearch);
    setCategory(newCategory);
    setVehicle(newVehicle);
  };

  // Filter products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesVehicle = vehicle === "All" || p.vehicle === vehicle;
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesVehicle && matchesSearch;
    });
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
            onChange={(e) => updateFilters(e.target.value, category, vehicle)}
            placeholder="Search..."
            className="w-full border pl-10 py-2 rounded"
          />
        </div>

        {/* Category */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilters(search, cat, vehicle)}
              className={`px-3 py-1 rounded ${category === cat ? "bg-blue-900 text-white" : "bg-gray-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vehicle */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {vehicles.map((v) => (
            <button
              key={v}
              onClick={() => updateFilters(search, category, v)}
              className={`px-3 py-1 rounded ${vehicle === v ? "bg-blue-900 text-white" : "bg-gray-200"}`}
            >
              {v}
            </button>
          ))}
        </div>

        <p className="text-sm mb-4">Showing {filtered.length} parts</p>

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
