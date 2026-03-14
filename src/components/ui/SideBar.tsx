import { Link, useLocation } from "react-router-dom";
import { Home, Car, ShoppingCart, Info, Phone, Layers } from "lucide-react";
import { categories } from "@/data/products"; // adjust path if needed

const Sidebar = () => {
  const location = useLocation();

  // Main navigation links
  const links = [
    { name: "Home", to: "/", icon: <Home size={18} /> },
    { name: "Cars", to: "/cars", icon: <Car size={18} /> },
    { name: "Parts", to: "/parts", icon: <ShoppingCart size={18} /> },
    { name: "About", to: "/about", icon: <Info size={18} /> },
    { name: "Contact", to: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#1D2A55] border-r border-white/10 p-6 flex flex-col z-50">
      <h2 className="text-white font-display text-xl font-bold mb-6">Menu</h2>

      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {/* Main links */}
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white transition-all ${
              location.pathname === link.to
                ? "bg-[#253B75]"
                : "hover:bg-[#253B75]/80"
            }`}
          >
            {link.icon}
            <span className="font-body font-medium">{link.name}</span>
          </Link>
        ))}

        {/* Categories Section */}
        <div className="mt-6">
          <h3 className="text-white font-semibold font-body mb-2 flex items-center gap-2">
            <Layers size={18} /> Categories
          </h3>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/parts?category=${encodeURIComponent(cat.name)}`}
                className="px-4 py-2 rounded-lg text-white hover:bg-[#253B75]/80 text-sm"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
