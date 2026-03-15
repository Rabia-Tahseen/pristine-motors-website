import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const FeaturedParts = () => {
  const featured = products.slice(0, 6);

  return (
    <section className="py-10 section-alt">
      <div className="section-container">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Featured Parts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedParts;
