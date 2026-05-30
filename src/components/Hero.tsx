import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SLIDE_IMAGES = [
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/ChatGPT%20Image%20May%2017,%202026,%2006_21_53%20PM.png",
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/1774643339407-qtheo6ayt99.jpeg",
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/1774644342791-8xlklgstn5y.jpeg",
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/1774644886610-z4sclqo0agd.jpeg",
];

const FULL_PLACEHOLDER = "Search cars or parts...";

// Words that strongly indicate the user wants PARTS even if a car name is present
const PARTS_OVERRIDE_REGEX =
  /\b(part|parts|spare|spares|engine|oil|filter|brake|tyre|tire|rim|bumper|mirror|headlight|taillight|sensor|clutch|gearbox|alternator|battery|exhaust|radiator|shock|absorber|suspension|belt|bulb|fuse|wiper|seat|interior|exterior|accessory|accessories)\b/i;

// Words that indicate the user wants a CAR (only checked if no parts keyword found)
const CAR_REGEX =
  /\b(car|cars|bmw|toyota|honda|suv|suzuki|alto|raize|corolla|daihatsu|sedan|taft|jdm|vehicle|vehicles|buy|used|new|imported)\b/i;

/**
 * Routing logic:
 * 1. If query contains a parts keyword → /parts  (handles "parts for my corolla")
 * 2. Else if query contains a car keyword → /cars
 * 3. Otherwise → /parts  (parts is the safer default for ambiguous queries)
 */
const resolveDestination = (q) => {
  if (PARTS_OVERRIDE_REGEX.test(q)) return `/parts?search=${encodeURIComponent(q)}`;
  if (CAR_REGEX.test(q)) return `/cars?search=${encodeURIComponent(q)}`;
  return `/parts?search=${encodeURIComponent(q)}`;
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  const navigate = useNavigate();

  // Preload images
  useEffect(() => {
    SLIDE_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Slideshow interval
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  // Typewriter effect — runs once per session to avoid feeling repetitive on re-visits
  useEffect(() => {
    if (sessionStorage.getItem("hero-typed")) {
      setPlaceholder(FULL_PLACEHOLDER);
      return;
    }
    let i = 0;
    setPlaceholder("");
    const interval = setInterval(() => {
      i++;
      setPlaceholder(FULL_PLACEHOLDER.slice(0, i));
      if (i === FULL_PLACEHOLDER.length) {
        clearInterval(interval);
        sessionStorage.setItem("hero-typed", "1");
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    navigate(resolveDestination(q));
  };

  return (
    <section className="relative h-[360px] sm:h-[430px] md:h-[500px] lg:h-[540px] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1b3a] via-[#1e3a8a] to-[#0ea5e9]" />

      {/* SLIDESHOW — toned-down scale + blur */}
      <div className="absolute inset-0">
        {SLIDE_IMAGES.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt={`Slide ${i + 1}`}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              opacity: i === activeIndex ? 1 : 0,
              scale: i === activeIndex ? 1.03 : 1.05,   
              filter: i === activeIndex ? "blur(0px)" : "blur(4px)", 
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }} // slightly snappier
          />
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center text-center text-white -mt-8 sm:-mt-10 md:-mt-12">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-[22px] sm:text-[30px] md:text-[40px] font-semibold leading-[1.05] tracking-tight"
          style={{
            textShadow:
              "0 0 18px rgba(96,165,250,0.65), 0 2px 16px rgba(0,0,0,0.8)",
          }}
        >
          Premium Cars & Auto Parts
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
              ${
                focus
                  ? "shadow-[0_0_0_3px_rgba(96,165,250,0.35),0_6px_24px_rgba(0,0,0,0.35)]"
                  : "shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
              }
            `}
          >
            <div className="pl-5 pr-2 flex items-center text-gray-400 flex-shrink-0">
              <Search size={18} />
            </div>
            <input
              id="hero-search"
              name="search"
              type="search"
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
              type="button"
              onClick={handleSearch}
              className="flex-shrink-0 h-full px-5 sm:px-7 md:px-9 rounded-r-full bg-[#0b1b3a] text-white text-sm font-semibold hover:bg-[#162d5e] transition-colors duration-200 whitespace-nowrap"
            >
              Search
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
            className="px-8 py-3 rounded-xl font-semibold text-sm sm:text-base bg-white text-[#0b1b3a] border border-blue-950/80 shadow-lg shadow-black/30 hover:bg-blue-50 hover:-translate-y-px transition-all duration-200"
          >
            Explore Cars
          </Link>
          <Link
            to="/parts"
            className="px-8 py-3 rounded-xl font-semibold text-sm sm:text-base bg-[#0b1b3a] text-white border border-white/80 shadow-lg shadow-black/30 hover:bg-[#1a3a6e] hover:border-white/60 hover:-translate-y-px transition-all duration-200"
          >
            Explore Parts
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
