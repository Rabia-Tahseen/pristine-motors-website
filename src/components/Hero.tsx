import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type HeroCar = {
  images: string[];
};

const FALLBACK_IMAGE =
  "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/ChatGPT%20Image%20May%2017,%202026,%2006_21_53%20PM.png";

const Hero = () => {
  const [cars, setCars] = useState<HeroCar[]>([]);
  const [index, setIndex] = useState(0);

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fullText = "Search cars or parts...";

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await supabase
        .from("products")
        .select("images")
        .eq("product_type", "car")
        .eq("is_featured", true);

      if (data?.length) setCars(data);
    };

    fetchCars();
  }, []);

  // Slideshow — only runs when we actually have images
  useEffect(() => {
    if (cars.length < 2) return;

    const t = setInterval(() => {
      setIndex((p) => (p + 1) % cars.length);
    }, 5500);

    return () => clearInterval(t);
  }, [cars]);

  // Typewriter placeholder
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

  // Resolve current background: use slideshow if loaded, else fallback
  const currentImage =
    cars.length > 0 ? (cars[index].images?.[0] ?? FALLBACK_IMAGE) : FALLBACK_IMAGE;

  return (
    <section className="relative h-[380px] sm:h-[440px] md:h-[520px] lg:h-[560px] flex items-center justify-center overflow-hidden bg-[#06101f]">

      {/* BACKGROUND SLIDESHOW */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={currentImage}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* LAYERED OVERLAY — stronger at top & bottom, lighter in center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/80" />
      {/* extra vignette on sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center text-white">

        {/* EYEBROW LABEL */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-blue-300/80"
        >
          Pakistan's Auto Marketplace
        </motion.p>

        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-[28px] sm:text-[40px] md:text-[52px] font-bold leading-[1.05] tracking-tight"
        >
          Premium Cars &{" "}
          <span className="text-blue-300">Auto Parts</span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-3 text-sm sm:text-base text-white/55 max-w-sm"
        >
          Find the right car or part — fast, trusted, delivered.
        </motion.p>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.6 }}
          className={`
            mt-7 sm:mt-8
            flex items-center
            w-full max-w-[680px]
            h-[44px] sm:h-[50px]
            rounded-full overflow-hidden
            border
            transition-all duration-300
            ${
              focus
                ? "border-blue-400/70 shadow-[0_0_0_3px_rgba(96,165,250,0.18)] bg-white"
                : "border-white/20 bg-white/95 shadow-lg shadow-black/30"
            }
          `}
        >
          <div className="pl-4 pr-2 flex items-center text-gray-400 flex-shrink-0">
            <Search size={18} />
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
            className="
              flex-1 h-full px-2
              text-sm text-gray-800
              bg-transparent outline-none
              placeholder:text-gray-400
            "
          />

          <button
            onClick={handleSearch}
            className="
              flex-shrink-0
              h-full px-5 sm:px-7
              bg-[#0b1b3a] text-white
              text-sm font-semibold
              hover:bg-[#162d5e]
              transition-colors duration-200
              rounded-r-full
            "
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              "Search"
            )}
          </button>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          className="flex gap-3 mt-6"
        >
          {/* Primary */}
          <Link
            to="/cars"
            className="
              px-6 py-2.5
              rounded-xl
              text-sm font-semibold
              bg-white text-[#0b1b3a]
              hover:bg-blue-50
              shadow-md shadow-black/20
              transition-all duration-200
              hover:-translate-y-px
            "
          >
            Explore Cars
          </Link>

          {/* Secondary / ghost */}
          <Link
            to="/parts"
            className="
              px-6 py-2.5
              rounded-xl
              text-sm font-semibold
              text-white
              border border-white/30
              hover:bg-white/10 hover:border-white/50
              backdrop-blur-sm
              transition-all duration-200
              hover:-translate-y-px
            "
          >
            Explore Parts
          </Link>
        </motion.div>

      </div>

      {/* SLIDESHOW DOTS — only show when we have multiple images */}
      {cars.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                rounded-full transition-all duration-300
                ${i === index ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}
              `}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default Hero;
