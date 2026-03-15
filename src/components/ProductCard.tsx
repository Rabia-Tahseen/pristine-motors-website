import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle } from "lucide-react";
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
    >
      {/* Entire card clickable */}
      <Link
        to={`/parts/${product.id}`}
        className="group block h-full flex flex-col bg-white border border-border rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        {/* Image with hover effect */}
        <div className="overflow-hidden aspect-[4/3] relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 text-[11px] font-body font-medium bg-background/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-md">
            {product.vehicle}
          </span>
        </div>

        {/* Product info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto gap-2">
            <p className="font-body font-bold text-primary text-lg">{product.price}</p>

            <div className="flex items-center gap-2">
              {/* Add to cart */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // prevent navigating when clicking cart
                  addToCart(product);
                }}
                className="p-2 rounded-lg border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart size={16} />
              </button>

              {/* WhatsApp Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                aria-label="Chat on WhatsApp"
                onClick={(e) => e.stopPropagation()} // prevent navigating when clicking WhatsApp
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
