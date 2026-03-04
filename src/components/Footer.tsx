import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="gradient-navy py-16">
    <div className="section-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Pristine Auto Hub" className="h-10 w-auto" />
            <h3 className="font-display text-xl font-bold text-cream">Pristine Auto Hub</h3>
          </div>
          <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
            Your trusted source for genuine Japanese auto parts. Toyota, Daihatsu & more — quality you can rely on.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home", to: "/" },
              { label: "All Parts", to: "/parts" },
              { label: "Request a Part", to: "/request-part" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-cream/60 hover:text-cream text-sm transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Connect</h4>
          <div className="flex gap-4">
            {["Facebook", "Instagram", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="text-cream/60 hover:text-cream text-sm transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-cream/10 text-center">
        <p className="text-cream/40 text-xs">© 2025 Pristine Auto Hub. Est. 2025. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
