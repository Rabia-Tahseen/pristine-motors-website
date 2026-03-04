import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedParts = () => {
  const featured = products.filter((p) => !p.image.includes("placeholder")).slice(0, 3);
  const fallback = featured.length < 3 ? products.slice(0, 3) : featured;

  return (
    <section className="py-24 md:py-32 bg-background relative">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs font-body uppercase tracking-[0.2em] mb-4">Our Catalog</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground section-heading">
            Featured Parts
          </h2>
          <p className="mt-6 text-muted-foreground text-base max-w-lg mx-auto font-body">
            Genuine parts for Toyota Raize, Daihatsu Mira, Daihatsu Taft and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallback.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/parts" className="btn-primary">
            View All Parts
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedParts;
