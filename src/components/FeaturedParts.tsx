import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedParts = () => {
  const featured = products.slice(0, 6);

  return (
    <section className="py-12 section-alt">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Featured Parts
          </h2>
          <Link to="/parts" className="text-sm font-medium text-primary hover:underline font-body">
            View All →
          </Link>
        </div>

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
