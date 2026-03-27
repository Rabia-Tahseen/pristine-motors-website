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
  const activeVehicle = searchParams.get("vehicle") || "All";

  const updateParam = (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      if (value === "" || value === "All") next.delete(key);
      else next.set(key, value);

      return next;
    });
  };

  useEffect(() => {
    async function fetchCars() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_type", "car");

      if (!error && data) {
        setCars(data);

        const uniqueVehicles = [
          "All",
          ...new Set(
            data.map((c: any) => c.model_compatibility).filter(Boolean)
          ),
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
      const matchVehicle =
        activeVehicle === "All" ||
        car.model_compatibility === activeVehicle;

      const matchSearch =
        !q || car.title?.toLowerCase().includes(q);

      return matchVehicle && matchSearch;
    });
  }, [cars, search, activeVehicle]);

  const filterBtn = (active: boolean) =>
    `px-4 py-2 rounded-lg text-xs transition ${
      active
        ? "bg-blue-900 text-white"
        : "bg-gray-100 hover:bg-gray-200"
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

        {/* Search */}
        <div className="relative w-full mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search by car name..."
            value={search}
            onChange={(e) =>
              updateParam("search", e.target.value)
            }
            className="w-full border rounded-lg pl-11 pr-4 py-3 outline-none"
          />
        </div>

        {/* Vehicle filter */}
        <div className="mb-8">
          <p className="text-xs mb-2">Vehicle</p>

          <div className="flex gap-2 flex-wrap">
            {vehicles.map(vehicle => (
              <button
                key={vehicle}
                onClick={() =>
                  updateParam("vehicle", vehicle)
                }
                className={filterBtn(
                  activeVehicle === vehicle
                )}
              >
                {vehicle}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-gray-500 mb-5">
          Showing {filtered.length} cars
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <ProductCard
                key={car.id}
                product={car}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No cars found.
            </p>

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

export default Cars;