import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/image.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [carBrands, setCarBrands] = useState<string[]>([]);
  const [partCategories, setPartCategories] = useState<string[]>([]);

  const location = useLocation();
  const { totalItems } = useCart();

  const activePath = location.pathname;

  // ---------------- FETCH DROPDOWN DATA ----------------
  useEffect(() => {
    const fetchDropdownData = async () => {
      const { data: cars } = await supabase
        .from("products")
        .select("brand")
        .eq("product_type", "car");

      const { data: categories } = await supabase
        .from("categories")
        .select("name")
        .eq("product_type", "car_part");

      if (cars) {
        const uniqueBrands = [
          ...new Set(cars.map((c) => c.brand).filter(Boolean)),
        ];
        setCarBrands(uniqueBrands as string[]);
      }

      if (categories) {
        const uniqueCategories = [
          ...new Set(categories.map((c) => c.name).filter(Boolean)),
        ];
        setPartCategories(uniqueCategories as string[]);
      }
    };

    fetchDropdownData();
  }, []);

  // ---------------- ACTIVE LINK STYLE ----------------
  const isActive = (path: string) => activePath === path;

  const linkClass = (path: string) =>
    `relative flex items-center h-full text-white font-medium transition-all duration-200
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300
    ${isActive(path)
      ? "after:w-full opacity-100"
      : "after:w-0 hover:after:w-full opacity-80 hover:opacity-100"
    }`;

  return (
    <nav className="bg-[#1D2A55] border-b border-white/10 sticky top-0 z-50">
      <div className="section-container flex items-center justify-between h-16">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Pristine Auto Hub"
            className="h-9 w-9 rounded-full object-cover shrink-0"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-white">
              Pristine
            </span>
            <span className="text-[10px] text-white/80 uppercase tracking-[0.15em]">
              Auto Hub
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8 h-full">

          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          {/* CARS */}
          <div className="relative group flex items-center h-full">
            <Link to="/cars" className={linkClass("/cars")}>
              Cars
            </Link>

            <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 bg-white text-black rounded-lg shadow-lg p-3 min-w-[180px] z-50">
              {carBrands.length > 0 ? (
                carBrands.map((brand) => (
                  <Link
                    key={brand}
                    to={`/cars?brand=${brand}`}
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    {brand}
                  </Link>
                ))
              ) : (
                <span className="text-sm text-gray-500">Loading...</span>
              )}
            </div>
          </div>

          {/* PARTS */}
          <div className="relative group flex items-center h-full">
            <Link to="/parts" className={linkClass("/parts")}>
              Parts
            </Link>

            <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 bg-white text-black rounded-lg shadow-lg p-3 min-w-[180px] z-50">
              {partCategories.length > 0 ? (
                partCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/parts?category=${cat}`}
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    {cat}
                  </Link>
                ))
              ) : (
                <span className="text-sm text-gray-500">Loading...</span>
              )}
            </div>
          </div>

          <Link to="/request-part" className={linkClass("/request-part")}>
            Request a Part
          </Link>

          <Link to="/about" className={linkClass("/about")}>
            About
          </Link>

          <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link>

          <Link to="/cart" className={linkClass("/cart")}>
            <div className="relative flex items-center gap-1">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-3 lg:hidden">

          <Link to="/cart" className="relative text-white">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1D2A55] border-t border-white/10"
          >
            <div className="section-container py-4 flex flex-col gap-2 text-white">

              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/cars" onClick={() => setMobileOpen(false)}>Cars</Link>
              <Link to="/parts" onClick={() => setMobileOpen(false)}>Parts</Link>
              <Link to="/request-part" onClick={() => setMobileOpen(false)}>Request a Part</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;