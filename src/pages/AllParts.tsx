import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const normalize = (v: string) =>
  (v || "")
    .replace(/[\n\r]+/g, "")
    .trim()
    .toLowerCase();

const AllParts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [vehicles, setVehicles] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || "All";
  const activeVehicle = searchParams.get("vehicle") || "All";

  // 👉 PRICE IN THOUSANDS
  const minPriceK = searchParams.get("minPrice") || "";
  const maxPriceK = searchParams.get("maxPrice") || "";

  // 👉 CONVERT THOUSANDS → RUPEES
  const minPrice = minPriceK ? Number(minPriceK) * 1000 : 0;
  const maxPrice = maxPriceK ? Number(maxPriceK) * 1000 : Infinity;

  const updateParam = (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (!value || value === "All") next.delete(key);
      else next.set(key, value);
      return next;
    });
  };

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(name)")
        .eq("product_type", "car_part")
        .in("stock_status", ["in_stock", "out_of_stock"])
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);

        const allModels = data.flatMap((p: any) =>
          p.model_compatibility
            ? p.model_compatibility.split(",").map((v: string) => v.trim())
            : []
        );

        setVehicles(["All", ...Array.from(new Set(allModels))]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  // FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .order("name");

      if (!error && data) {
        setCategories(["All", ...data.map((c: any) => c.name)]);
      }
    };

    fetchCategories();
  }, []);

  // FILTER LOGIC
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return products.filter((p) => {
      const catName = normalize(p.category?.name || "");

      const matchCategory =
        activeCategory === "All" ||
        catName === normalize(activeCategory);

      const compatibleModels = p.model_compatibility
        ? p.model_compatibility
            .split(",")
            .map((v: string) => normalize(v))
        : [];

      const matchVehicle =
        activeVehicle === "All" ||
        compatibleModels.includes(normalize(activeVehicle));

      const matchSearch =
        !q || (p.title || "").toLowerCase().includes(q);

      const price = Number(p.price || 0);

      const matchPrice =
        price >= minPrice && price <= maxPrice;

      return matchCategory && matchVehicle && matchSearch && matchPrice;
    });
  }, [products, search, activeCategory, activeVehicle, minPrice, maxPrice]);

  const filterBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg text-xs transition ${
      active ? "bg-blue-900 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`;

  if (loading) {
    return (
      <main className="pt-24 pb-20 section-container text-center min-h-screen">
        <p>Loading parts...</p>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="section-container">

        {/* HEADER */}
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

        {/* SEARCH */}
        <div className="relative w-full mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Search by part name..."
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
            className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none"
          />
        </div>

        {/* PRICE FILTER (THOUSANDS SYSTEM) */}
        <div className="flex gap-3 mb-6">

          <div className="w-full">
            <label className="text-xs text-gray-500">
              Min Price (Thousands)
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <input
                type="number"
                placeholder="e.g. 5"
                value={minPriceK}
                onChange={(e) => updateParam("minPrice", e.target.value)}
                className="w-full outline-none"
              />
              <span className="text-sm text-gray-500">K</span>
            </div>
          </div>

          <div className="w-full">
            <label className="text-xs text-gray-500">
              Max Price (Thousands)
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <input
                type="number"
                placeholder="e.g. 50"
                value={maxPriceK}
                onChange={(e) => updateParam("maxPrice", e.target.value)}
                className="w-full outline-none"
              />
              <span className="text-sm text-gray-500">K</span>
            </div>
          </div>

        </div>

        {/* FILTERS */}
        <div className="flex flex-col sm:flex-row gap-5 mb-8">

          <div className="flex-1">
            <p className="text-xs mb-2">Category</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateParam("category", cat)}
                  className={filterBtn(activeCategory === cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs mb-2">Model</p>
            <div className="flex gap-2 flex-wrap">
              {vehicles.map((v) => (
                <button
                  key={v}
                  onClick={() => updateParam("vehicle", v)}
                  className={filterBtn(activeVehicle === v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RESULTS */}
        <p className="text-sm text-gray-500 mb-5">
          Showing {filtered.length} parts
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                section="parts"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No parts found.</p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-3 text-blue-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </main>
  );
};

export default AllParts;