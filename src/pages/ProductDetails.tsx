import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="pt-32 pb-20 section-container text-center min-h-screen">
        <h1 className="font-display text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/parts" className="btn-primary mt-6 inline-block">Back to Parts</Link>
      </main>
    );
  }

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
            className="rounded-2xl overflow-hidden bg-muted aspect-square"
            style={{ boxShadow: "var(--shadow-card-hover)" }}
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className={product.inStock ? "badge-in-stock mb-4 self-start" : "badge-out-of-stock mb-4 self-start"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
            <p className="text-2xl font-display font-bold text-foreground mt-3">{product.price}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <h3 className="font-display font-semibold text-foreground mb-4">Specifications</h3>
              <div className="glass-card p-5 space-y-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
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
