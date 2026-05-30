import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
const SLIDE_IMAGES = [
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/ChatGPT%20Image%20May%2017,%202026,%2006_21_53%20PM.png",
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/1774643339407-qtheo6ayt99.jpeg",
   "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/1774644342791-8xlklgstn5y.jpeg",
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/1774644886610-z4sclqo0agd.jpeg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fullText = "Search cars or parts...";

  // Slideshow auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % SLIDE_IMAGES.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  // Typewriter placeholder
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  SLIDE_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
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

  return (
    <section className="relative h-[360px] sm:h-[430px] md:h-[500px] lg:h-[540px] flex items-center justify-center overflow-hidden bg-neutral-950">
{/* BASE BACKGROUND */}
<div className="absolute inset-0 bg-gradient-to-br from-[#0b1b3a] via-[#1e3a8a] to-[#0ea5e9]" />

{/* SLIDESHOW */}
<div className="absolute inset-0">
  {SLIDE_IMAGES.map((src, i) => {
    const active = i === index;

    return (
      <motion.img
        key={src}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        initial={false}
        animate={{
  opacity: active ? 1 : 0,
  scale: active ? 1.05 : 1.12,
  filter: active ? "blur(0px)" : "blur(12px)",
}}
transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    );
  })}
</div>
      {/* OVERLAY */}<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center text-center text-white -mt-8 sm:-mt-10 md:-mt-12">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="
            text-[22px] sm:text-[30px] md:text-[40px]
            font-semibold leading-[1.05] tracking-tight
            drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]
          "
        >
          Premium Cars &amp; Auto Parts
        </motion.h1>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 sm:mt-8 w-[94%] sm:w-[88%] md:w-[80%] max-w-[720px]"
        >
          <div
            className={`
              flex items-center rounded-full overflow-hidden
              h-[42px] sm:h-[48px] md:h-[52px]
              transition-shadow duration-200
              bg-white/95 hover:bg-white focus-within:bg-white
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
              className="flex-1 h-full px-1 text-sm md:text-base text-[#0b1b3a] bg-transparent outline-none placeholder:text-gray-400"
            />
            <button
              onClick={handleSearch}
              className="
                flex-shrink-0 h-full px-5 sm:px-7 md:px-9
                rounded-r-full bg-[#0b1b3a] text-white
                text-sm font-semibold hover:bg-[#162d5e]
                transition-colors duration-200 whitespace-nowrap
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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex gap-3 mt-6 sm:mt-7"
        >
          <Link
            to="/cars"
            className="
              px-8 py-3 rounded-xl font-semibold text-sm sm:text-base
              bg-white text-[#0b1b3a] border border-blue-950/80
              shadow-lg shadow-black/30
              hover:bg-blue-50 hover:-translate-y-px
              transition-all duration-200
            "
          >
            Explore Cars
          </Link>
          <Link
            to="/parts"
            className="
              px-8 py-3 rounded-xl font-semibold text-sm sm:text-base
              bg-[#0b1b3a] text-white border border-white/80
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
