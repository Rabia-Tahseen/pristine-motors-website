import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fullText = "Search cars or parts...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const q = query.trim();
    if (!q || loading) return;
    setLoading(true);
    const isCar =
      /car|bmw|toyota|honda|suv|suzuki|alto|raize|corolla|daihatsu|sedan|taft|jdm/i.test(q);
    setTimeout(() => {
      navigate(isCar ? `/cars?search=${q}` : `/parts?search=${q}`);
      setLoading(false);
    }, 200);
  };

  const currentImage =
    "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/ChatGPT%20Image%20May%2017,%202026,%2006_21_53%20PM.png";

  return (
    <section className="relative h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center overflow-hidden bg-[#06101f]">

      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={currentImage}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* OVERLAY — consistent dark across the whole hero */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center text-white gap-5">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-[28px] sm:text-[38px] md:text-[48px] font-bold leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
        >
          Premium Cars &amp; Auto Parts
        </motion.h1>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className={`
            flex items-center
            rounded-full overflow-hidden
            w-full max-w-[580px]
            h-[50px] sm:h-[54px]
            border transition-all duration-300
            ${focus
              ? "border-blue-400/70 shadow-[0_0_0_3px_rgba(96,165,250,0.2)] bg-white"
              : "border-transparent bg-white shadow-xl shadow-black/40"
            }
          `}
        >
          <div className="pl-4 pr-2 flex items-center text-gray-400 flex-shrink-0">
            <Search size={17} />
          </div>

          <input
            id="hero-search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={placeholder}
            autoComplete="off"
            className="flex-1 h-full px-2 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
          />

          <button
            onClick={handleSearch}
            className="
              flex-shrink-0 h-full px-6
              rounded-r-full
              bg-[#0b1b3a] text-white
              text-sm font-semibold
              hover:bg-[#162d5e]
              transition-colors duration-200
              whitespace-nowrap
            "
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Search"
            )}
          </button>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex gap-3"
        >
          {/* Primary — solid dark navy, always visible */}
          <Link
            to="/cars"
            className="
              px-7 py-2.5 rounded-xl
              font-semibold text-sm
              bg-[#0b1b3a] text-white
              border border-[#0b1b3a]
              shadow-lg shadow-black/30
              hover:bg-[#162d5e] hover:border-[#162d5e] hover:-translate-y-px
              transition-all duration-200
            "
          >
            Explore Cars
          </Link>

          {/* Secondary — white, always visible */}
          <Link
            to="/parts"
            className="
              px-7 py-2.5 rounded-xl
              font-semibold text-sm
              bg-white text-[#0b1b3a]
              border border-white
              shadow-lg shadow-black/30
              hover:bg-gray-100 hover:-translate-y-px
              transition-all duration-200
            "
          >
            Explore Parts
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
