import { motion } from "framer-motion";

const About = () => (
  <main className="pt-24 pb-20 bg-background min-h-screen">
    <div className="section-container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center">About Pristine Motors</h1>
        <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Founded with a passion for automotive excellence, Pristine Motors is your trusted source for premium auto parts.
            We specialize in sourcing and supplying high-performance components for enthusiasts, mechanics, and professional racing teams.
          </p>
          <p>
            Every part in our catalog undergoes rigorous quality testing to ensure it meets the highest standards of performance,
            durability, and fitment. We believe in delivering nothing but the best.
          </p>
          <p>
            Our team of automotive experts is always ready to help you find the right part for your vehicle. Whether you're building
            a track car, restoring a classic, or upgrading your daily driver — we've got you covered.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Parts Sold", value: "50,000+" },
            { label: "Happy Customers", value: "12,000+" },
            { label: "Years in Business", value: "8+" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <p className="font-display text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </main>
);

export default About;
