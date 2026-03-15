import { Link } from "react-router-dom";
import logo from "@/assets/newlogo.png";

const Footer = () => (
  <footer className="bg-[#1D2A55] py-14">
    <div className="section-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/20 shadow-md">
              <img
                src={logo}
                alt="Pristine Auto Hub"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold text-white">
                Pristine
              </span>
              <span className="text-[10px] font-body uppercase tracking-[0.15em] text-white/50">
                Auto Hub
              </span>
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs font-body">
            Your trusted source for genuine Japanese auto parts & vehicles.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body font-semibold text-white text-sm mb-4">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home", to: "/" },
              { label: "Cars", to: "/cars" },
              { label: "Parts", to: "/parts" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-white/50 hover:text-white text-sm transition-colors font-body"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body font-semibold text-white text-sm mb-4">
            Contact
          </h4>
          <div className="flex flex-col gap-2 text-sm font-body text-white/50">
            <a
              href="https://wa.me/923219454136"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp: +92 321 9454136
            </a>
            <a
              href="tel:+923013917380"
              className="hover:text-white transition-colors"
            >
              Call: +92 301 3917380
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-6 border-t border-white/10 text-center">
        <p className="text-white/30 text-xs font-body">
          © 2025 Pristine Auto Hub. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
