import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const isPlaceholder = product.image.includes("placeholder");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div className="product-card group cursor-pointer">
        <div className="overflow-hidden aspect-[4/3] bg-muted relative">
          <img
            src={product.image}
            alt={product.name}
            className={`product-image w-full h-full ${isPlaceholder ? 'object-contain p-8 opacity-30' : 'object-cover'}`}
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
          {/* Vehicle badge */}
          <span className="absolute top-3 left-3 text-[10px] font-body font-semibold uppercase tracking-wider bg-navy-dark/80 backdrop-blur-sm text-cream/90 px-3 py-1.5 rounded-lg">
            {product.vehicle}
          </span>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-display font-semibold text-foreground text-lg leading-tight group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-body font-bold text-accent text-xl">{product.price}</p>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-body">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-body font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
              {product.category}
            </span>
            <Link
              to={`/parts/${product.id}`}
              className="text-sm font-body font-semibold text-accent hover:text-accent/80 transition-colors uppercase tracking-wider"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
