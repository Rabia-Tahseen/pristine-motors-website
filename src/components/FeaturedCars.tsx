import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const placeholderCars = [
  { id: "car-1", name: "Toyota Raize", year: "2023", spec: "1.0L Turbo • CVT", image: "" },
  { id: "car-2", name: "Daihatsu Taft", year: "2022", spec: "660cc • 4WD", image: "" },
  { id: "car-3", name: "Daihatsu Mira", year: "2024", spec: "660cc • Auto", image: "" },
];

const FeaturedCars = () => (
  <section className="py-12 bg-background">
    <div className="section-container">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Featured Cars
        </h2>
        <Link to="/cars" className="text-sm font-medium text-primary hover:underline font-body">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderCars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="product-card group">
              <div className="overflow-hidden aspect-[16/10] rounded-t-xl bg-muted">
                {car.image ? (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                    <p className="text-sm font-body">Coming Soon</p>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-foreground text-lg">{car.name}</h3>
                  <span className="text-xs font-body text-muted-foreground bg-muted px-2.5 py-1 rounded-md">{car.year}</span>
                </div>
                <p className="text-sm text-muted-foreground font-body mb-4">{car.spec}</p>
                <Link
                  to={`/cars/${car.id}`}
                  className="btn-primary w-full text-center text-sm py-2.5"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedCars;
