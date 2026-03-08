import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg";

const links = [
  { label: "Home", to: "/" },
  { label: "Cars", to: "/cars" },
  { label: "Parts", to: "/parts" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav className="bg-[#1D2A55] border-b border-white/10 sticky top-0 z-50">
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Pristine Auto Hub"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-white">
              Pristine
            </span>
            <span className="text-[10px] font-body text-white/80 uppercase tracking-[0.15em]">
              Auto Hub
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-white font-medium transition-all duration-200 ${
                location.pathname === l.to ? "underline" : "hover:underline"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white hover:text-gray-300 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#1D2A55] border-t border-white/10 overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={handleLinkClick}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                    location.pathname === l.to
                      ? "underline"
                      : "hover:underline hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
