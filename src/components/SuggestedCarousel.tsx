import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";

const SuggestedCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const suggested = products.slice(0, 8);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Suggested For You
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {suggested.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex-shrink-0 w-[280px]"
            >
              <div className="product-card group">
                <div className="overflow-hidden aspect-[4/3] rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground font-body mb-1">{product.vehicle}</p>
                  <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="font-body font-bold text-primary text-lg mb-3">{product.price}</p>
                  <Link
                    to={`/parts/${product.id}`}
                    className="btn-primary w-full text-center text-xs py-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedCarousel;
