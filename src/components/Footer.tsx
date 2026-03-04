import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="gradient-navy py-20 relative">
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    <div className="section-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="Pristine Auto Hub" className="h-12 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold text-cream">Pristine</span>
              <span className="text-[10px] font-body uppercase tracking-[0.2em] text-gold">Auto Hub</span>
            </div>
          </div>
          <p className="text-cream/50 text-sm leading-relaxed max-w-xs font-body">
            Your trusted source for genuine Japanese auto parts. Quality you can rely on, prices you'll love.
          </p>
        </div>
        <div>
          <h4 className="font-body font-semibold text-cream text-sm uppercase tracking-wider mb-5">Quick Links</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "Home", to: "/" },
              { label: "All Parts", to: "/parts" },
              { label: "Request a Part", to: "/request-part" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-cream/50 hover:text-gold text-sm transition-colors duration-300 font-body">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-body font-semibold text-cream text-sm uppercase tracking-wider mb-5">Connect With Us</h4>
          <div className="flex flex-col gap-3">
            {["Facebook", "Instagram", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="text-cream/50 hover:text-gold text-sm transition-colors duration-300 font-body">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-cream/10 text-center">
        <p className="text-cream/30 text-xs font-body">© 2025 Pristine Auto Hub. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
