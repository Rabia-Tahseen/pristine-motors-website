import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { products, categories, vehicles } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");

  // ✅ SYNC URL → STATE (FIXED)
  useEffect(() => {
    const s = searchParams.get("search") || "";
    const c = searchParams.get("category") || "All";

    setSearch(s);
    setActiveCategory(c);
  }, [searchParams]);

  // ✅ FILTER LOGIC
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
    `px-4 py-2 rounded-lg text-xs font-medium ${
      active
        ? "bg-blue-900 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  // ✅ CATEGORY CLICK → UPDATE URL (CRITICAL FIX)
  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(searchParams);

    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }

    navigate(`/parts?${params.toString()}`);
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="section-container">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold mb-6">All Parts</h1>
        </motion.div>

        {/* SEARCH */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 p-3 border rounded-lg"
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-6">
          <p className="mb-2 text-sm">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={filterBtn(activeCategory === cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            No products found
          </p>
        )}
      </div>
    </main>
  );
};

export default AllParts;
