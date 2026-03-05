import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "Parts", to: "/parts" },
  { label: "Request a Part", to: "/request-part" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl ${
        scrolled
          ? "bg-navy-dark/98 shadow-[0_4px_30px_hsl(220_65%_18%/0.3)]"
          : "bg-navy-dark/90"
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Pristine Auto Hub"
            className="h-9 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-base md:text-lg font-bold text-cream tracking-tight">
              Pristine
            </span>
            <span className="text-[10px] md:text-xs font-body uppercase tracking-[0.2em] text-gold">
              Auto Hub
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link transition-colors duration-300 ${
                location.pathname === l.to
                  ? "text-gold"
                  : "text-cream/80 hover:text-cream"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-cream/90 hover:text-gold transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu - full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-16 bg-navy-dark/98 backdrop-blur-xl z-40"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={l.to}
                    className={`font-display text-2xl transition-colors duration-300 ${
                      location.pathname === l.to
                        ? "text-gold"
                        : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
