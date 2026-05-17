import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type HeroCar = {
  image_url: string;
};

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
        .select("image_url")
        .eq("product_type", "car")
        .eq("is_featured", true);

      if (data?.length) setCars(data);
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (!cars.length) return;

    const t = setInterval(() => {
      setIndex((p) => (p + 1) % cars.length);
    }, 5500);

    return () => clearInterval(t);
  }, [cars]);

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

    const isCar = /car|bmw|toyota|honda|suv|sedan|jdm/i.test(q);

    setTimeout(() => {
      navigate(isCar ? `/cars?search=${q}` : `/parts?search=${q}`);
      setLoading(false);
    }, 200);
  };

  const currentImage =
    cars[index]?.image_url ||
    "https://lwmdnsxxwrqqcvmvzqkq.supabase.co/storage/v1/object/public/product-images/products/ChatGPT%20Image%20May%2017,%202026,%2006_21_53%20PM.png";

  return (
    <section className="relative h-[360px] sm:h-[430px] md:h-[500px] lg:h-[540px] flex items-center justify-center overflow-hidden bg-black">

      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

      <div className="relative z-10 w-full px-4 flex flex-col items-center text-center text-white -mt-14 md:-mt-20 lg:-mt-24">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            text-[24px]
            sm:text-[34px]
            md:text-[46px]
            font-semibold
            leading-[1.02]
            tracking-tight
          "
        >
          <span className="italic drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]">
            Premium Cars
          </span>
          <br />
          <span className="italic drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]">
            & Genuine Parts
          </span>
        </motion.h1>

        {/* SEARCH BAR */}
        <motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15, duration: 0.6 }}
  className={`
    mt-6 sm:mt-8

    flex items-center
    rounded-full
    overflow-hidden

    w-[94%]
    sm:w-[92%]
    md:w-[88%]
    lg:w-[80%]

    max-w-[800px]

    h-[34px] sm:h-[42px] md:h-[48px]

    backdrop-blur-md
    border border-white/30

    transition-all duration-300 ease-out

    ${
      focus
        ? "bg-white shadow-[0_0_25px_rgba(59,130,246,0.38)] scale-[1.01]"
        : "bg-white/100"
    }
  `}
>

          {/* ICON */}
          <div className="px-3 sm:px-4 flex items-center text-blue-950">
            <Search size={20} />
          </div>

          {/* INPUT */}
          <input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onFocus={() => setFocus(true)}
  onBlur={() => setFocus(false)}
  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
  placeholder={placeholder}
  className="
    flex-1
    h-full

    px-2 sm:px-3

    text-xs sm:text-sm md:text-base
    text-black

    outline-none
    bg-transparent

    placeholder:text-gray-500
  "
/>

          {/* BUTTON */}
          <button
  onClick={handleSearch}
  className="
    px-3 sm:px-4 md:px-8
    h-full

    flex items-center justify-center

    font-semibold
    text-xs sm:text-sm md:text-base

    bg-[#0b1b3a]
    text-white

    hover:bg-[#102654]

    transition-all duration-300
    whitespace-nowrap
  "
>
  {loading ? "..." : "Search"}
</button>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-5 mt-5"
        >

          <Link
            to="/cars"
            className="
              px-8 py-3
              rounded-xl
              font-semibold
              text-sm sm:text-base
              text-[#0b1b3a]

              bg-gradient-to-bl
              from-blue-200/100
              via-white/100
              to-blue-200/100

              border border-blue-200/80
              backdrop-blur-md

              hover:-translate-y-1
              hover:from-blue-300
              hover:to-blue-300

              transition-all duration-200
            "
          >
            Explore Cars
          </Link>

          <Link
            to="/parts"
            className="
              px-8 py-3
              rounded-xl
              font-semibold
              text-sm sm:text-base
              text-[#0b1b3a]

              bg-gradient-to-bl
              from-blue-200/100
              via-white/100
              to-blue-200/100

              border border-blue-200/80
              backdrop-blur-md

              hover:-translate-y-1
              hover:from-blue-300
              hover:to-blue-300

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
