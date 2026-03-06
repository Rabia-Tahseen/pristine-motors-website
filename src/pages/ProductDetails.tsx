import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "923219454136";
const CALL_NUMBER = "+923013917380";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <main className="pt-32 pb-20 section-container text-center min-h-screen">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Product not found
        </h1>
        <Link to="/parts" className="btn-primary mt-6 inline-block">
          Back to Parts
        </Link>
      </main>
    );
  }

  const allImages = product.images?.length ? product.images : [product.image];

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        {/* Back Link */}
        <Link
          to="/parts"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm"
        >
          <ArrowLeft size={16} /> Back to Parts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden bg-muted aspect-square border border-border">
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-body font-medium text-muted-foreground mb-2">
              {product.vehicle}
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-2xl font-body font-bold text-primary mt-3">
              {product.price}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed font-body">
              {product.description}
            </p>

            {/* Details */}
            <div className="mt-6 rounded-xl border border-border p-5 space-y-3">
              <h3 className="font-body font-semibold text-foreground text-sm">
                Details
              </h3>
              {[
                { label: "Category", value: product.category },
                { label: "Condition", value: product.condition },
                { label: "Vehicle", value: product.vehicle },
                {
                  label: "Availability",
                  value: product.inStock ? "In Stock" : "Sold",
                },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp & Call Buttons */}
            <div className="flex gap-4 flex-wrap mt-6">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi, I'm interested in: ${product.name} (${product.vehicle}) - ${product.price}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 hover:scale-105 transition-all duration-200"
              >
                <MessageCircle size={20} />
                {`+92 321 9454136`}
              </a>

              {/* Call */}
              <a
                href={`tel:${CALL_NUMBER}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 hover:scale-105 transition-all duration-200"
              >
                <Phone size={20} />
                {CALL_NUMBER}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
