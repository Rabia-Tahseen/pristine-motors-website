import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";

const FeaturedParts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(name)")
        .eq("is_featured", true)
        .eq("product_type", "car_part")
        .limit(6);

      if (error) console.error(error);
      else setProducts(data ?? []);
    }
    fetchFeatured();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-8 section-alt"> {/* reduced from py-10 → py-8 */}
      <div className="section-container">

         <h2 className="text-2xl font-bold mb-6">
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
