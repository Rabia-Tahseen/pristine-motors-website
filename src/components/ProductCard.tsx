import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, ArrowRight } from "lucide-react";
import { useCart, toCartProduct } from "@/contexts/CartContext";

interface Props {
  product: any;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
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
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Card */}
      <div
        onClick={() => navigate(`/parts/${product.id}`)}
        className="group block rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-[4px] cursor-pointer"
      >
        <div className="flex flex-col h-full">
          {/* Image */}
          <div className="overflow-hidden aspect-[4/3] relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Slight dark overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
          </div>

          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-base mb-1">{title}</h3>

            <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-1">
              {description}
            </p>

            <div className="flex items-center justify-between mt-auto gap-2">
              <p className="font-bold text-blue-900 text-lg">{price}</p>

              <div className="flex items-center gap-2">
                {/* Add to cart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(toCartProduct(product));
                  }}
                  className="p-2 rounded-lg border hover:bg-blue-900 hover:text-white transition shadow-sm hover:shadow-md"
                >
                  <ShoppingCart size={16} />
                </button>

                {/* WhatsApp */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition shadow-sm hover:shadow-md"
                >
                  <MessageCircle size={16} />
                </a>

                {/* View Details */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/parts/${product.id}`);
                  }}
                  className="text-sm font-medium text-blue-900 hover:text-blue-500 flex items-center gap-1"
                >
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
