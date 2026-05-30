import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import logo from "@/assets/image.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [carBrands, setCarBrands] = useState<string[]>([]);
  const [partCategories, setPartCategories] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, signOut } = useAdminAuth();

  const activePath = location.pathname;

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
        setCarBrands([...new Set(cars.map((c) => c.brand).filter(Boolean))] as string[]);
      }
      if (categories) {
        setPartCategories([...new Set(categories.map((c) => c.name).filter(Boolean))] as string[]);
      }
    };

    fetchDropdownData();
  }, []);

  const isActive = (path: string) => activePath === path;

  const navLink = (path: string) => `
    relative flex items-center gap-1 text-[15px] font-medium transition
    ${isActive(path) ? "text-yellow-300" : "text-white hover:text-yellow-300"}
    after:content-[''] after:absolute after:left-0 after:bottom-[-18px]
    after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300
    hover:after:w-full
  `;

  const emailShort = (email?: string) => {
    if (!email) return "";
    const [a] = email.split("@");
    return a.slice(0, 6);
  };

  const handleLogout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    navigate("/"); 
  }
};

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#081120] via-[#13264a] to-[#081120] backdrop-blur-xl">
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} className="h-10 w-10 rounded-full" />
          <div>
            <h1 className="text-white font-bold text-lg">Pristine</h1>
            <p className="text-[10px] tracking-[0.25em] text-white/60">AUTO HUB</p>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={navLink("/")}>Home</Link>

          {/* CARS */}
          <div className="relative group flex items-center">
            <Link to="/cars" className={navLink("/cars")}>
              Cars <ChevronDown size={14} />
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
              <div className="w-64 rounded-2xl border border-white/20 bg-[#1f315d] shadow-xl">
                <div className="px-5 py-3 border-b border-white/10 text-white text-sm font-semibold">Car Brands</div>
                {carBrands.map((brand) => (
                  <Link key={brand} to={`/cars?brand=${brand}`} className="block px-5 py-2 text-sm text-white/80 hover:bg-white/10">
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* PARTS */}
          <div className="relative group flex items-center">
            <Link to="/parts" className={navLink("/parts")}>
              Parts <ChevronDown size={14} />
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
              <div className="w-64 rounded-2xl border border-white/20 bg-[#1f315d] shadow-xl">
                <div className="px-5 py-3 border-b border-white/10 text-white text-sm font-semibold">Categories</div>
                {partCategories.map((cat) => (
                  <Link key={cat} to={`/parts?category=${cat}`} className="block px-5 py-2 text-sm text-white/80 hover:bg-white/10">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/request-part" className={navLink("/request-part")}>Request</Link>
          <Link to="/about" className={navLink("/about")}>About</Link>
          <Link to="/contact" className={navLink("/contact")}>Contact</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* CART */}
          <Link to="/cart" className="relative text-white hover:text-yellow-300">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* PROFILE */}
          {user && (
            <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white/100">
              <User size={16} />
              <span className="text-xs text-blue-950 font-semibold">{emailShort(user.email)}</span>
            </Link>
          )}

          {/* AUTH BUTTONS */}
          {!user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login" className="px-4 py-1.5 rounded-lg bg-[#13264a] text-white border border-white/50 hover:bg-gray-500 hover:text-white transition text-sm font-semibold">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-1.5 rounded-lg bg-white text-[#13264a] border border-white/30 hover:bg-gray-500 hover:text-white transition text-sm font-semibold">
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden lg:flex px-4 py-1.5 rounded-lg border border-white/70 bg-[#13264a] text-red-400 hover:bg-red-500 hover:text-white transition text-sm font-semibold"
            >
              Logout
            </button>
          )}

          {/* MOBILE TOGGLE */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#081120] border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-white">
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/cars" onClick={() => setMobileOpen(false)}>Cars</Link>
              <Link to="/parts" onClick={() => setMobileOpen(false)}>Parts</Link>
              <Link to="/request-part" onClick={() => setMobileOpen(false)}>Request</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>

              {!user ? (
                <div className="flex flex-col gap-3 pt-3">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2 bg-[#13264a] rounded-lg text-white text-center">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="px-4 py-2 bg-white text-[#13264a] rounded-lg text-center">
                    Sign Up
                  </Link>
                </div>
              ) : (
                // ✅ Fix 4: close menu BEFORE navigating so setMobileOpen
                //    never runs on an unmounted component
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
