import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <main className="pt-32 pb-20 section-container text-center min-h-screen">
        <h1 className="font-display text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/parts" className="btn-primary mt-6 inline-block">Back to Parts</Link>
      </main>
    );
  }

  const allImages = product.images?.length ? product.images : [product.image];
  const isPlaceholder = product.image.includes("placeholder");

  return (
    <main className="pt-28 pb-24 bg-background min-h-screen">
      <div className="section-container">
        <Link to="/parts" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-10 font-body text-sm uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Parts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="rounded-2xl overflow-hidden bg-muted aspect-square"
              style={{ boxShadow: "var(--shadow-card-hover)" }}
            >
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className={`w-full h-full ${isPlaceholder ? 'object-contain p-12 opacity-30' : 'object-cover'}`}
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-accent shadow-md"
                        : "border-border/50 hover:border-accent/50"
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-accent mb-3">
              {product.vehicle}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">{product.name}</h1>
            <p className="text-3xl font-display font-bold text-accent mt-4">{product.price}</p>
            <p className="mt-6 text-muted-foreground leading-relaxed font-body">{product.description}</p>

            <div className="mt-8 glass-card p-6 space-y-4">
              <h3 className="font-body font-semibold text-foreground text-sm uppercase tracking-wider mb-2">Details</h3>
              {[
                { label: "Category", value: product.category },
                { label: "Condition", value: product.condition },
                { label: "Vehicle", value: product.vehicle },
                { label: "Availability", value: product.inStock ? "In Stock" : "Sold" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => toast.success("Request submitted! We'll contact you shortly.")}
              className="btn-primary mt-10 self-start"
            >
              Request This Part
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
