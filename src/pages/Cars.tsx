import { motion } from "framer-motion";
import { Car } from "lucide-react";

const Cars = () => (
  <main className="pt-24 pb-20 bg-background min-h-screen">
    <div className="section-container text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Cars</h1>
        <p className="mt-3 text-muted-foreground font-body">
          Premium Japanese vehicles coming soon.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 p-12 rounded-xl border border-border bg-card">
          <Car size={48} className="text-muted-foreground/30" />
          <p className="text-muted-foreground font-body">
            Our car listings are being prepared. Check back soon or contact us directly for available vehicles.
          </p>
          <a
            href="https://wa.me/923219454136?text=Hi%2C%20I%27m%20interested%20in%20buying%20a%20car."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2"
          >
            Inquire via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  </main>
);

export default Cars;
