import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const HeroCarousel = () => {
  const [items, setItems] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const isDragging = useRef(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .limit(20);

      if (!data) return;

      const cars = data.filter((i) => i.product_type === "car");
      const parts = data.filter((i) => i.product_type === "car_part");

      const mixed: any[] = [];
      const max = Math.max(cars.length, parts.length);

      for (let i = 0; i < max; i++) {
        if (cars[i]) mixed.push(cars[i]);
        if (parts[i]) mixed.push(parts[i]);
      }

      setItems([...mixed, ...mixed]); // loop effect
    };

    fetchFeatured();
  }, []);

  const getImage = (item: any) => {
    if (Array.isArray(item?.images) && item.images.length > 0) {
      return item.images[0];
    }
    return item?.image || "/placeholder.png";
  };

  // 👉 CONTINUOUS SMOOTH SCROLL
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !items.length) return;

    let speed = 1.5; // 🔥 LOWER = slower, higher = faster

    const animate = () => {
      if (!el || isDragging.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      el.scrollLeft += speed;

      // loop reset (infinite feel)
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <section className="relative pt-1 pb-4 bg-[#f6f7fb]">
      <div className="w-full px-3 md:px-6 lg:px-10">

        {/* CAROUSEL */}
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar py-1 w-full"
          onMouseEnter={() => (isDragging.current = true)}
          onMouseLeave={() => (isDragging.current = false)}
          onTouchStart={() => (isDragging.current = true)}
          onTouchEnd={() => (isDragging.current = false)}
        >
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(
                  item.product_type === "car"
                    ? `/cars/${item.id}`
                    : `/parts/${item.id}`
                );
              }}
              className="
                relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden
                transition-all duration-300
                hover:scale-[1.05]
              "
              style={{
                width: "clamp(240px, 70vw, 320px)",
                height: "165px",
              }}
            >
              <img
                src={getImage(item)}
                className="w-full h-full object-cover object-[center_30%]"
              />

              <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <h3 className="text-white text-sm font-medium line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
