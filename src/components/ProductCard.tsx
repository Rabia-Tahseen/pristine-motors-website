import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="product-card group">
        <div className="overflow-hidden aspect-square bg-muted rounded-t-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
              {product.name}
            </h3>
          </div>
          <p className="font-display font-bold text-primary text-lg">{product.price}</p>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {product.vehicle}
            </span>
            <Link
              to={`/parts/${product.id}`}
              className="btn-primary text-sm !px-5 !py-2"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
