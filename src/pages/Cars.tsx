import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";

const Cars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_type", "car");

      if (error) {
        console.error(error);
      } else {
        setCars(data || []);
      }

      setLoading(false);
    }

    fetchCars();
  }, []);

  if (loading) {
    return (
      <main className="pt-24 pb-20 section-container text-center min-h-screen">
        <p>Loading cars...</p>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center">
            Cars
          </h1>

          {/* IF cars exist */}
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {cars.map((car, i) => (
                <ProductCard key={car.id} product={car} index={i} />
              ))}
            </div>
          ) : (
            /* IF no cars exist */
            <div className="mt-12 flex flex-col items-center gap-4 p-12 rounded-xl border border-border bg-card text-center">
              <Car size={48} className="text-muted-foreground/30" />

              <p className="text-muted-foreground font-body">
                Our car listings are being prepared. Check back soon or contact
                us directly for available vehicles.
              </p>

              <a
                href="https://wa.me/923219454136?text=Hi%2C%20I%27m%20interested%20in%20buying%20a%20car."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-2"
              >
                Inquire via WhatsApp
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default Cars;