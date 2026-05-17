import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const FeaturedCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedCars() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_type", "car")
        .eq("is_featured", true)
        .limit(6);

      if (error) console.error(error);
      else setCars(data ?? []);

      setLoading(false);
    }

    fetchFeaturedCars();
  }, []);

  if (loading || cars.length === 0) return null;

  return (
    <section className="py-6 bg-background"> {/* reduced padding */}

      <div className="section-container">

        <div className="flex items-center justify-between mb-4"> {/* reduced */}

          <h2
            className="font-display text-2xl md:text-3xl font-bold"
            style={{
              color: "#06142e",
            }}
          >
            Featured Cars
          </h2>

          <Link
            to="/cars"
            className="text-sm font-medium hover:underline font-body"
            style={{
              color: "#06142e",
            }}
          >
            View All →
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, i) => (
            <ProductCard
              key={car.id}
              product={car}
              index={i}
              section="cars"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCars;
