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
    <section className="relative h-[460px] sm:h-[520px] md:h-[580px] flex items-center justify-center overflow-hidden bg-[#06101f]">

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

      {/* OVERLAY */}
   <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/50" />
<div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)' }} />
      
      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center text-white -mt-12 sm:-mt-14 md:-mt-16">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.07 }}
          className="
            text-[24px] sm:text-[32px] md:text-[42px]
            font-semibold leading-[1.1] tracking-[-0.01em]
            drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]
            mb-7
          "
        >
          Premium Cars &amp; Auto Parts
        </motion.h1>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.55 }}
          className="w-full max-w-[660px]"
        >
          <div
            className={`
              flex items-center
              rounded-full overflow-hidden
              h-[46px] sm:h-[50px]
              bg-white
              transition-shadow duration-200
              ${focus
                ? "shadow-[0_0_0_3px_rgba(96,165,250,0.35),0_6px_24px_rgba(0,0,0,0.35)]"
                : "shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
              }
            `}
          >
            <div className="pl-5 pr-2 flex items-center text-gray-400 flex-shrink-0">
              <Search size={16} />
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
              className="flex-1 h-full px-1 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
            />

            <button
              onClick={handleSearch}
              className="
                flex-shrink-0 h-full px-7
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
          </div>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.55 }}
          className="flex gap-3 mt-5"
        >
          {/* Primary — solid white */}
          <Link
            to="/cars"
            className="
              px-8 py-3 rounded-xl
              font-semibold text-sm
              bg-white text-[#0b1b3a]
              border border-blue-950
              shadow-lg shadow-black/30
              hover:bg-blue-50 hover:-translate-y-px
              transition-all duration-200
            "
          >
            Explore Cars
          </Link>

          {/* Secondary — navy */}
          <Link
            to="/parts"
            className="
              px-8 py-3 rounded-xl
              font-semibold text-sm
              bg-[#0b1b3a] text-white
              border border-white/40
              shadow-lg shadow-black/30
              hover:bg-[#1a3a6e] hover:border-white/60 hover:-translate-y-px
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
