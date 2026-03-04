import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const About = () => (
  <main className="pt-28 pb-24 bg-background min-h-screen">
    <div className="section-container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Pristine Auto Hub" className="h-28 w-auto" />
        </div>
        <p className="text-accent text-xs font-body uppercase tracking-[0.2em] mb-4 text-center">About Us</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center section-heading">Pristine Auto Hub</h1>
        <div className="mt-12 space-y-6 text-muted-foreground leading-relaxed font-body">
          <p>
            Established in 2025, Pristine Auto Hub is your trusted source for genuine Japanese auto parts in Pakistan.
            We specialize in sourcing high-quality parts for Toyota Raize, Daihatsu Mira, Daihatsu Taft, and other popular Japanese vehicles.
          </p>
          <p>
            Every part we sell is carefully inspected and graded for condition, so you know exactly what you're getting.
            We believe in transparency, fair pricing, and helping our customers find the exact part they need.
          </p>
          <p>
            Can't find a part in our catalog? Use our "Request a Part" service and our team will source it for you.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Parts Available", value: "50+" },
            { label: "Happy Customers", value: "200+" },
            { label: "Established", value: "2025" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-8 text-center">
              <p className="font-display text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-muted-foreground text-sm mt-2 font-body uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </main>
);

export default About;
