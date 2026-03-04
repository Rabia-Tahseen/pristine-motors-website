import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedParts = () => {
  // Show first 3 products that have real images (not placeholder)
  const featured = products.filter((p) => !p.image.includes("placeholder")).slice(0, 3);
  const fallback = featured.length < 3 ? products.slice(0, 3) : featured;

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
            Genuine auto parts for Toyota Raize, Daihatsu Mira, Daihatsu Taft and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallback.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/parts" className="btn-primary">View All Parts</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedParts;
