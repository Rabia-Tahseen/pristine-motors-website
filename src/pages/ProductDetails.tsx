import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

{/* Images */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4 }}
  className="flex flex-col"
>
  <div className="relative rounded-xl overflow-hidden border border-border bg-muted w-full" 
       style={{ paddingTop: "75%", position: "relative" }}>
    {allImages[selectedImage] && (
      <img
        src={allImages[selectedImage]}
        alt={product.name}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    )}

    {allImages.length > 1 && (
      <>
        <button
          type="button"
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
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
      {allImages.map((img, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setSelectedImage(i)}
          className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all overflow-hidden ${
            selectedImage === i
              ? "border-primary"
              : "border-border hover:border-primary/60"
          }`}
        >
          <img
            src={img}
            alt={`Thumbnail ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )}
</motion.div>
