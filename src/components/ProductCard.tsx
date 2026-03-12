import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="product-card group h-full flex flex-col">
        <div className="overflow-hidden aspect-[4/3] rounded-t-xl relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 text-[11px] font-body font-medium bg-background/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-md">
            {product.vehicle}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto gap-2">
            <p className="font-body font-bold text-primary text-lg">{product.price}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addToCart(product)}
                className="p-2 rounded-lg border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart size={16} />
              </button>
              <Link
                to={`/parts/${product.id}`}
                className="btn-primary text-xs py-2 px-4"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
