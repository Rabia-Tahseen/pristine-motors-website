import { cars } from "@/data/products";
import { motion } from "framer-motion";

const Cars = () => (
  <main className="pt-24 pb-20 bg-background min-h-screen">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">Our Cars</h1>
        <p className="mt-3 text-muted-foreground text-lg">Vehicles we proudly support with premium parts.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="product-card group">
              <div className="overflow-hidden aspect-square bg-muted">
                <img src={car.image} alt={car.name} className="product-image w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground text-lg">{car.name}</h3>
                  <span className="text-sm text-muted-foreground font-display">{car.year}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{car.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </main>
);

export default Cars;
