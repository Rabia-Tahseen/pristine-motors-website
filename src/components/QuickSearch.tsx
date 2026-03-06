import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.3, delay: index * 0.04 }}
  >
    <div className="product-card group h-full flex flex-col">

      {/* Image */}
      <div className="overflow-hidden aspect-[4/3] rounded-t-lg relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        <span className="absolute top-2 left-2 text-[10px] font-medium bg-background/90 backdrop-blur-sm text-foreground px-2 py-0.5 rounded">
          {product.vehicle}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-foreground mb-1 leading-tight">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-xs line-clamp-2 mb-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <p className="font-bold text-primary text-sm">{product.price}</p>

          <Link
            to={`/parts/${product.id}`}
            className="btn-primary text-[11px] py-1.5 px-3"
          >
            View
          </Link>
        </div>
      </div>

    </div>
  </motion.div>
);

export default ProductCard;
