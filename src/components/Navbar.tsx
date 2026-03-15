import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/newlogo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "Cars", to: "/cars" },
  { label: "Parts", to: "/parts" },
  { label: "Request a Part", to: "/request-part" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="bg-[#1D2A55] border-b border-white/10 sticky top-0 z-50">
      <div className="section-container flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
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
            <span className="text-[10px] font-body text-white/80 uppercase tracking-[0.15em]">
              Auto Hub
            </span>
          </div>

        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-white font-medium transition-all duration-200 ${
                location.pathname === l.to
                  ? "underline"
                  : "hover:underline"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-white hover:text-white/80 transition-colors"
          >
            <ShoppingCart size={22} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          
          <Link
            to="/cart"
            className="relative text-white hover:text-white/80 transition-colors"
          >
            <ShoppingCart size={22} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
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
                  onClick={() => setMobileOpen(false)}
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
