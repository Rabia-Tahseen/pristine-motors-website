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

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        <Link to="/parts" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-display text-sm">
          <ArrowLeft size={16} /> Back to Parts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden bg-muted aspect-square" style={{ boxShadow: "var(--shadow-card-hover)" }}>
              <img src={allImages[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
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
            <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full self-start mb-4">
              {product.vehicle}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
            <p className="text-2xl font-display font-bold text-primary mt-3">{product.price}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-6 glass-card p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium text-foreground">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Condition</span>
                <span className="font-medium text-foreground">{product.condition}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="font-medium text-foreground">{product.vehicle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Availability</span>
                <span className="font-medium text-foreground">{product.inStock ? "In Stock" : "Sold"}</span>
              </div>
            </div>

            <button
              onClick={() => toast.success("Request submitted! We'll contact you shortly.")}
              className="btn-primary mt-8 self-start"
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
