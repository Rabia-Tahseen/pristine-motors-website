import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, ArrowRight } from "lucide-react";
import { useCart, toCartProduct } from "@/contexts/CartContext";

interface Props {
  product: any;
  index?: number;
  section?: "parts" | "cars";
}

const ProductCard = ({ product, index = 0, section = "parts" }: Props) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const phoneNumber = "923219454136";

  const title = product.title ?? product.name ?? "";
  const image = product.image ?? product.images?.[0] ?? "";
  const description = product.description ?? product.short_description ?? "";

  const price =
    typeof product.price === "number"
      ? `Rs. ${product.price.toLocaleString()}`
      : product.price;

  const message = `Hello, I'm interested in this part:\n\nName: ${title}\nPrice: ${price}`;
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
    >
      <div
        onClick={() => navigate(`/parts/${product.id}`, { state: { section } })}
        className="
          group relative flex flex-col rounded-xl overflow-hidden cursor-pointer
          bg-white dark:bg-[#0f1623]
          border border-gray-100 dark:border-white/[0.06]
          shadow-sm
          hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40
          transition-shadow duration-300
        "
      >

        {/* IMAGE */}
        <div className="overflow-hidden aspect-[4/3] relative bg-gray-50 dark:bg-white/5">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
          {/* subtle dark gradient at bottom of image for depth */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col flex-1">

          <h3 className="font-semibold text-sm leading-snug mb-1 text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h3>

          <p className="text-gray-400 dark:text-gray-500 text-xs line-clamp-2 mb-4 flex-1 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between gap-2 mt-auto">

            {/* PRICE */}
            <p className="font-bold text-[#0b1b3a] dark:text-white text-base tracking-tight">
              {price}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-1.5">

              {/* ADD TO CART */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(toCartProduct(product));
                }}
                title="Add to cart"
                className="
                  w-8 h-8 flex items-center justify-center rounded-lg
                  text-gray-400 dark:text-gray-500
                  border border-gray-200 dark:border-white/10
                  hover:border-[#0b1b3a] hover:text-[#0b1b3a] hover:bg-[#0b1b3a]/5
                  dark:hover:border-white/30 dark:hover:text-white
                  transition-all duration-200
                "
              >
                <ShoppingCart size={14} />
              </button>

              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Enquire on WhatsApp"
                className="
                  w-8 h-8 flex items-center justify-center rounded-lg
                  text-gray-400 dark:text-gray-500
                  border border-gray-200 dark:border-white/10
                  hover:border-green-500 hover:text-green-600 hover:bg-green-50
                  dark:hover:border-green-500/50 dark:hover:text-green-400 dark:hover:bg-green-500/10
                  transition-all duration-200
                "
              >
                <MessageCircle size={14} />
              </a>

              {/* VIEW DETAILS */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/parts/${product.id}`, { state: { section } });
                }}
                className="
                  h-8 px-3 flex items-center gap-1 rounded-lg
                  text-xs font-semibold
                  bg-[#0b1b3a] text-white
                  hover:bg-[#162d5e]
                  transition-colors duration-200
                "
              >
                View <ArrowRight size={12} />
              </button>

            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;
