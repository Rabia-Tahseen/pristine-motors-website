import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const activeVehicle = searchParams.get("brand") || "All";

  // 👇 PRICE IN LACS
  const minPrice = Number(searchParams.get("minPrice") || 0) * 100000;
  const maxPrice = Number(searchParams.get("maxPrice") || Infinity) * 100000;

  const updateParam = (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (!value || value === "All") next.delete(key);
      else next.set(key, value);
      return next;
    });
  };

  const resetFilters = () => setSearchParams({});

  useEffect(() => {
    async function fetchCars() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_type", "car")
        .in("stock_status", ["in_stock", "out_of_stock"]);

      if (!error && data) {
        setCars(data);

        const uniqueVehicles = [
          "All",
          ...new Set(data.map((c: any) => c.brand).filter(Boolean)),
        ];

        setVehicles(uniqueVehicles);
      }

      setLoading(false);
    }

    fetchCars();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return cars.filter(car => {
      const matchBrand =
        activeVehicle === "All" || car.brand === activeVehicle;

      const matchSearch =
        !q || car.title?.toLowerCase().includes(q);

      const price = Number(car.price || 0);

      const matchPrice =
        price >= minPrice && price <= maxPrice;

      return matchBrand && matchSearch && matchPrice;
    });
  }, [cars, search, activeVehicle, minPrice, maxPrice]);

  const filterBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg text-xs transition ${
      active ? "bg-blue-900 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`;

  if (loading) {
    return (
      <main className="pt-24 pb-20 section-container text-center min-h-screen">
        <p>Loading cars...</p>
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
          <h1 className="text-3xl font-bold">All Cars</h1>
          <p className="text-gray-500 mt-2">
            Browse our complete collection of available vehicles.
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search by car name..."
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
            className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none"
          />
        </div>

        {/* PRICE FILTER (LACS) */}
        <div className="flex gap-3 mb-6 items-center">
          <input
            type="number"
            placeholder="Min (Lacs)"
            value={searchParams.get("minPrice") || ""}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />

          <span className="text-sm text-gray-500">to</span>

          <input
            type="number"
            placeholder="Max (Lacs)"
            value={searchParams.get("maxPrice") || ""}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        {/* VEHICLE FILTER */}
        <div className="mb-6">
          <p className="text-xs mb-2">Vehicle</p>
          <div className="flex gap-2 flex-wrap">
            {vehicles.map(vehicle => (
              <button
                key={vehicle}
                onClick={() => updateParam("brand", vehicle)}
                className={filterBtn(activeVehicle === vehicle)}
              >
                {vehicle}
              </button>
            ))}
          </div>
        </div>

        {/* RESET */}
        <button
          onClick={resetFilters}
          className="mb-6 text-sm text-red-600 hover:underline"
        >
          Reset all filters
        </button>

        <p className="text-sm text-gray-500 mb-5">
          Showing {filtered.length} cars
        </p>

        {/* GRID */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <ProductCard
                key={car.id}
                product={car}
                index={i}
                section="cars"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No cars found.</p>
            <button
              onClick={resetFilters}
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

export default Cars;