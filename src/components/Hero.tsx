import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Cog, Search } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fullText = "Search cars or parts...";

  /* ✨ typing animation */
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
    const q = query.trim().toLowerCase();
    if (!q || loading) return;

    setLoading(true);

    const carKeywords = [
      "toyota","honda","suzuki","nissan","daihatsu","mazda",
      "civic","corolla","alto","mehran","cultus","wagon r",
      "city","prius"
    ];

    const isCarSearch = carKeywords.some(word => q.includes(word));

    setTimeout(() => {
      navigate(
        isCarSearch
          ? `/cars?search=${encodeURIComponent(q)}`
          : `/parts?search=${encodeURIComponent(q)}`
      );

      setLoading(false);
    }, 600);
  };

  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-b from-white to-blue-50">

      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-blue-200 opacity-30 blur-3xl rounded-full" />
      </div>

      <div className="section-container relative z-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* LEFT BUTTONS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <Link
              to="/cars"
              className="group bg-[#1D2A55] text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:bg-[#162046] hover:shadow-xl hover:-translate-y-0.5"
            >
              <Car size={18} className="text-yellow-400" />
              Browse Cars
            </Link>

            <Link
              to="/parts"
              className="group bg-[#1D2A55] text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:bg-[#162046] hover:shadow-xl hover:-translate-y-0.5"
            >
              <Cog size={16} className="text-yellow-400" />
              Browse Parts
            </Link>
          </motion.div>

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`
              flex w-full max-w-2xl items-stretch
              rounded-2xl overflow-hidden
              border transition-all duration-200

              ${
                focused
                  ? "bg-white shadow-[0_18px_50px_rgba(0,0,0,0.15)] border-blue-200"
                  : "bg-gray-50 border-gray-100"
              }
            `}
          >
            <div className="flex items-center pl-4">
              <Search size={18} className="text-yellow-500" />
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 outline-none text-sm bg-transparent"
            />

            {/* SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`
                px-6 py-3 font-medium transition-all duration-200
                flex items-center justify-center

                ${
                  loading
                    ? "bg-yellow-400 text-white"
                    : "bg-[#1D2A55] text-white hover:bg-[#162046]"
                }
              `}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
