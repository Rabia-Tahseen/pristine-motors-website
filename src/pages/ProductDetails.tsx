import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import { useCart, toCartProduct } from "@/contexts/CartContext";

const WHATSAPP_NUMBER = "923219454136";
const CALL_NUMBER = "+923013917380";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  // Determine section from state or fallback
  const sectionFromState = (location.state as any)?.section;
  const backSection =
    sectionFromState ||
    (product?.category?.name?.toLowerCase().includes("car") ? "cars" : "parts");

  const backLinkText = backSection === "cars" ? "Back to Cars" : "Back to Parts";
  const backLinkUrl = backSection === "cars" ? "/cars" : "/parts";

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(name)")
        .eq("id", id as string)
        .maybeSingle();

      if (error) console.error(error);
      else setProduct(data);

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="pt-32 pb-20 section-container text-center min-h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-32 pb-20 section-container text-center min-h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/parts" className="btn-primary mt-6 inline-block">
          Back to Parts
        </Link>
      </main>
    );
  }

  const allImages = product.images?.length ? product.images : [];

  const prevImage = () =>
    setSelectedImage((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );

  const nextImage = () =>
    setSelectedImage((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );

  const vehicleName = product.model_compatibility?.includes("Toyota")
    ? product.model_compatibility
    : `Toyota ${product.model_compatibility || ""}`;

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        {/* Back */}
        <Link
          to={backLinkUrl}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition mb-8 text-sm"
        >
          <ArrowLeft size={16} /> {backLinkText}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="relative rounded-xl overflow-hidden bg-muted border border-border h-[300px] sm:h-[400px]">
              <img
                src={allImages[selectedImage] || "/placeholder.png"}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {allImages.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg border-2 ${
                      selectedImage === i ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

            <p className="text-2xl font-bold text-primary mt-3">
              Rs. {product.price?.toLocaleString()}
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {product.full_description || product.short_description}
            </p>

            <div className="mt-6 rounded-xl border border-border p-5 space-y-3">
              <h3 className="font-semibold text-sm">Details</h3>

              {[
                { label: "Category", value: product.category?.name ?? "—" },
                { label: "Condition", value: product.condition },
                { label: "Vehicle", value: vehicleName },
                {
                  label: "Availability",
                  value:
                    product.stock_status === "in_stock"
                      ? "In Stock"
                      : product.stock_status === "out_of_stock"
                      ? "Out of Stock"
                      : product.stock_status === "sold"
                      ? "Sold"
                      : "Unknown",
                },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span
                    className={`font-medium
                    ${
                      item.value === "In Stock"
                        ? "text-green-600"
                        : item.value === "Out of Stock"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                product.stock_status === "in_stock" &&
                addToCart(toCartProduct(product))
              }
              disabled={product.stock_status !== "in_stock"}
              className={`mt-6 px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition text-base font-semibold
              ${
                product.stock_status === "in_stock"
                  ? "bg-blue-900 text-white hover:shadow-xl hover:-translate-y-[2px]"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={18} />

              {product.stock_status === "in_stock"
                ? "Add to Cart"
                : "Out of Stock"}
            </button>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi, I'm interested in: ${product.title} (${vehicleName}) - Rs. ${product.price?.toLocaleString()}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center px-4 py-2 bg-green-500 text-white rounded-lg transition text-sm shadow-sm hover:shadow-lg hover:-translate-y-[2px] hover:bg-green-600"
              >
                <MessageCircle size={18} />
                +92 321 9454136
              </a>

              <a
                href={`tel:${CALL_NUMBER.replace(/\s/g, "")}`}
                className="flex items-center gap-2 justify-center px-4 py-2 bg-blue-800 text-white rounded-lg transition text-sm shadow-sm hover:shadow-lg hover:-translate-y-[2px] "
              >
                <Phone size={18} />
                +92 301 3917380
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
