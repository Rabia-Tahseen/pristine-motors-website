import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const { addToCart } = useCart();

  const phoneNumber = "923219454136";
  const message = `Hello, I'm interested in this part:

Name: ${product.name}
Vehicle: ${product.vehicle}
Price: ${product.price}`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }} // Slight scale up on hover
    >
      <Link
        to={`/parts/${product.id}`}
        className="group block h-full max-w-sm flex flex-col bg-white border border-border rounded-xl overflow-hidden
                   shadow-md hover:shadow-2xl transition-all duration-300 relative"
      >
        {/* Image with subtle shadow on hover */}
        <div className="overflow-hidden aspect-[4/3] relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 shadow-sm group-hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
          <span className="absolute top-3 left-3 text-[11px] font-body font-medium bg-background/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-md">
            {product.vehicle}
          </span>
        </div>

        {/* Product info */}
        <div className="p-4 flex flex-col flex-1 relative">
          <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-1">
            {product.name}
          </h3>

          <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>

          {/* Price bottom-left */}
          <p className="absolute bottom-3 left-4 font-body font-bold text-primary text-lg">
            {product.price}
          </p>

          {/* Centered icons at bottom-middle */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="p-2 rounded-lg border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
              aria-label="Chat on WhatsApp"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle size={16} />
            </a>
          </div>

          {/* View Details bottom-right */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1 text-blue-900 text-sm font-medium group-hover:text-blue-500 transition-colors">
            <span className="underline cursor-pointer">View Details</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
