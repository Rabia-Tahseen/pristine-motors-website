import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const FeaturedParts = () => {
  const featured = products.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Featured Parts
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Handpicked performance parts trusted by professionals and enthusiasts alike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedParts;
