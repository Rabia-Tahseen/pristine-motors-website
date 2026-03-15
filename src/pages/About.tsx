import { motion } from "framer-motion";
import logo from "@/assets/newlogo.png";
import { ShieldCheck, Truck, CheckCircle } from "lucide-react";

const About = () => (
  <main className="pt-24 pb-20 bg-background min-h-screen">
    <div className="section-container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center justify-center">
            
            {/* Soft glow */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-md"></div>

            <img
              src={logo}
              alt="Pristine Auto Hub"
              className="relative h-[92px] w-[92px] rounded-full object-cover ring-1 ring-border/60 bg-background"
            />

          </div>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center">
          About Pristine Auto Hub
        </h1>

        <p className="text-center text-muted-foreground text-sm font-body mt-2 uppercase tracking-wider">
          Est. 2025 — Genuine Japanese Auto Parts
        </p>

        <div className="mt-10 space-y-5 text-muted-foreground leading-relaxed font-body">
          <p>
            Established in 2025, Pristine Auto Hub is your trusted source for genuine Japanese auto parts in Pakistan.
            We specialize in sourcing high-quality parts for Toyota Raize, Daihatsu Mira, Daihatsu Taft, and other popular Japanese vehicles.
          </p>
          <p>
            Every part we sell is carefully inspected and graded for condition, so you know exactly what you're getting.
            We believe in transparency, fair pricing, and helping our customers find the exact part they need.
          </p>
          <p>
            We also deal in premium Japanese cars, providing reliable vehicles at competitive prices. Whether you need a part or a whole car, Pristine Auto Hub has you covered.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, label: "Trusted Source", description: "Genuine parts sourced directly from Japan." },
            { icon: Truck, label: "Fast Shipping", description: "Quick delivery across Pakistan." },
            { icon: CheckCircle, label: "Quality Assured", description: "Every part inspected and graded for condition." },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <s.icon size={24} className="text-primary mb-3" />
              <p className="font-display text-lg font-semibold text-foreground text-center">{s.label}</p>
              <p className="text-muted-foreground text-xs mt-1 font-body text-center">{s.description}</p>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  </main>
);

export default About;
