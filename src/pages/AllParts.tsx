import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AllParts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [vehicles, setVehicles] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = searchParams.get("search");
    if (s) setSearch(s);
  }, [searchParams]);

  // Fetch products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);

        // Derive unique vehicles from model_compatibility
        const uniqueVehicles = ["All", ...new Set(data.map((p) => p.model_compatibility).filter(Boolean))];
        setVehicles(uniqueVehicles);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // Fetch categories from Supabase
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("categories").select("name").order("name");
      if (!error && data) {
        setCategories(["All", ...data.map((c) => c.name)]);
      }
    }
    fetchCategories();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchVehicle = activeVehicle === "All" || p.model_compatibility === activeVehicle;
      const matchSearch = !q || p.title?.toLowerCase().includes(q);
      return matchCategory && matchVehicle && matchSearch;
    });
  }, [search, activeCategory, activeVehicle, products]);

  const filterBtn = (active: boolean) =>
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

        {/* Search */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
                <button key={cat} onClick={() => setActiveCategory(cat)} className={filterBtn(activeCategory === cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs mb-2">Vehicle</p>
            <div className="flex gap-2 flex-wrap">
              {vehicles.map((v) => (
                <button key={v} onClick={() => setActiveVehicle(v)} className={filterBtn(activeVehicle === v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading parts...</p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-5">Showing {filtered.length} parts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={{
                    ...p,
                    name: p.title,
                    image: p.images?.[0],
                    inStock: p.stock_status === "in_stock",
                    vehicle: p.model_compatibility
                  }}
                  index={i}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No parts found.</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); setActiveVehicle("All"); }}
                  className="mt-3 text-blue-700 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default AllParts;