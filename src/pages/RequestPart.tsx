import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "923219454136";

const RequestPart = () => (
  <main className="pt-24 pb-20 min-h-screen bg-background">
    <div className="section-container max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Request a Part
        </h1>
        <p className="mt-3 text-muted-foreground font-body">
          Can't find what you need? Contact the owner directly and we'll source it for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to request a part. Here are the details:\n\nVehicle: \nPart needed: \nCondition preference: ")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
        >
          <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
            <MessageCircle size={28} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-foreground font-body">Request via WhatsApp</p>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Send your part request directly to the owner on WhatsApp
            </p>
            <p className="text-xs text-muted-foreground/70 font-body mt-1">+92 321 9454136</p>
          </div>
        </a>

        <a
          href="tel:+923013917380"
          className="flex items-center gap-4 p-6 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
        >
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Phone size={28} className="text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground font-body">Call the Owner</p>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Speak directly with the owner about your part needs
            </p>
            <p className="text-xs text-muted-foreground/70 font-body mt-1">+92 301 3917380</p>
          </div>
        </a>
      </motion.div>
    </div>
  </main>
);

export default RequestPart;
