import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";

const FeaturedParts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .eq("product_type", "part")
        .limit(6);

      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <section className="py-10 section-alt">
      <div className="section-container">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Featured Parts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedParts;