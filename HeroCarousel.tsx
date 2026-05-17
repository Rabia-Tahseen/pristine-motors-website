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

      setItems([...mixed, ...mixed]);
    };

    fetchFeatured();
  }, []);

  const getImage = (item: any) => {
    if (Array.isArray(item?.images) && item.images.length > 0) {
      return item.images[0];
    }

    return item?.image || "/placeholder.png";
  };

  // AUTO SMOOTH SCROLL
  useEffect(() => {
    const el = containerRef.current;

    if (!el || !items.length) return;

    let speed = 1.2;

    const animate = () => {
      if (!el || isDragging.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      el.scrollLeft += speed;

      // LOOP EFFECT
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [items]);

  if (!items.length) return null;

 return (
  <section
    className="
      relative overflow-hidden
      pt-3 pb-3
      bg-gradient-to-br
      from-blue-100
      via-white
      to-blue-100
    "
  >
    {/* LIGHT BLUE GLOW EFFECTS */}
    <div className="absolute top-[-120px] left-[-100px] w-[420px] h-[420px] bg-white/50 blur-[130px] rounded-full" />

    <div className="absolute bottom-[-120px] right-[-80px] w-[380px] h-[380px] bg-cyan-200/30 blur-[130px] rounded-full" />

    <div className="relative w-full px-2 md:px-4 lg:px-8">

      {/* CAROUSEL */}
      <div
        ref={containerRef}
        className="
          flex gap-5 md:gap-6
          overflow-x-auto
          no-scrollbar
          py-1 w-full
        "
        onMouseEnter={() => (isDragging.current = true)}
        onMouseLeave={() => (isDragging.current = false)}
        onTouchStart={() => (isDragging.current = true)}
        onTouchEnd={() => (isDragging.current = false)}
      >
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/parts/${item.id}`)}
            className="
              group relative flex-shrink-0 cursor-pointer
              rounded-3xl overflow-hidden
              border border-white/20
              bg-white/10
              backdrop-blur-xl
              transition-all duration-500
              hover:scale-[1.04]
              hover:border-white/40
              hover:shadow-[0_0_45px_rgba(255,255,255,0.25)]
            "
            style={{
              width: "clamp(250px, 72vw, 340px)",
              height: "190px",
            }}
          >
            {/* IMAGE */}
            <img
              src={getImage(item)}
              alt={item.title}
              className="
                w-full h-full
                object-cover object-center
                transition-transform duration-700
                group-hover:scale-110
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

            {/* CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-4">

              <div className="flex items-end justify-between gap-3">

                <div>
                 <h3 className="text-white/90 text-sm md:text-[12px] font-medium line-clamp-1">
                    {item.title}
                  </h3>

                  
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* HIDE SCROLLBAR */}
    <style>{`
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }

      .no-scrollbar {
        scrollbar-width: none;
      }
    `}</style>
  </section>
);
};

export default HeroCarousel;