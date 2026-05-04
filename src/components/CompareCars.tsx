import { useState, useMemo, useRef, useEffect } from "react";

interface Car {
  id: string;
  title: string;
  price?: number;
}

const CompareCars = ({ cars }: { cars: Car[] }) => {
  const [carA, setCarA] = useState<Car | null>(null);
  const [carB, setCarB] = useState<Car | null>(null);

  const [qA, setQA] = useState("");
  const [qB, setQB] = useState("");

  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  const refA = useRef<HTMLDivElement>(null);
  const refB = useRef<HTMLDivElement>(null);

  // close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!refA.current?.contains(e.target as Node)) setOpenA(false);
      if (!refB.current?.contains(e.target as Node)) setOpenB(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // =========================
  // SEARCH
  // =========================
  const filterCars = (q: string) => {
    const query = q.trim().toLowerCase();
    if (!query) return cars;

    const starts: Car[] = [];
    const includes: Car[] = [];

    for (const car of cars) {
      const t = car.title.toLowerCase();
      if (t.startsWith(query)) starts.push(car);
      else if (t.includes(query)) includes.push(car);
    }

    return [...starts, ...includes];
  };

  const selectCar = (car: Car, setter: any, other: Car | null) => {
    if (other?.id === car.id) return;
    setter(car);
  };

  // =========================
  // STRICT CAR DETECTION (FIXED)
  // =========================
  const getKey = (car: Car) => {
    const t = car.title.toLowerCase();

    if (t.includes("rocky") && t.includes("hybrid")) return "rocky_hybrid";
    if (t.includes("rocky")) return "rocky_petrol";

    // 🔥 FIXED: Raize X must be checked BEFORE Raize
    if (t.includes("raize x")) return "raize_x";
    if (t.includes("raize")) return "raize";

    if (t.includes("alto")) return "alto";
    if (t.includes("hustler")) return "hustler";
    if (t.includes("taft")) return "taft";
    if (t.includes("n one")) return "n_one";

    return "default";
  };

  // =========================
  // FEATURES (NO DUPLICATES NOW)
  // =========================
  const getPoints = (car: Car) => {
    const key = getKey(car);

    const map: Record<string, string[]> = {
      raize: [
        "Strong turbo engine performance",
        "Stable highway driving experience",
        "Balanced ride for city and highway",
      ],

      raize_x: [
        "More premium interior than standard Raize",
        "Better infotainment and feature package",
        "Higher comfort trim level",
      ],

      rocky_hybrid: [
        "Excellent fuel efficiency in traffic",
        "Smooth hybrid acceleration",
        "Low emissions driving system",
      ],

      rocky_petrol: [
        "Stronger engine response",
        "Better for long highway trips",
        "Simpler maintenance system",
      ],

      alto: [
        "Very low fuel consumption",
        "Cheap maintenance cost",
        "Perfect for daily city use",
      ],

      hustler: [
        "High driving visibility",
        "Easy parking in tight areas",
        "Efficient urban driving",
      ],

      taft: [
        "High ground clearance",
        "Rugged road capability",
        "Wide driving visibility",
      ],

      n_one: [
        "Premium cabin comfort",
        "Smooth suspension ride",
        "Quiet driving experience",
      ],

      default: [
        "Balanced performance",
        "Reliable usage",
        "Efficient fuel economy",
      ],
    };

    return map[key];
  };

  // =========================
  // TRUE ORDER-INDEPENDENT SCORING
  // =========================
  const verdict = useMemo(() => {
    if (!carA || !carB) return "";

    const scoreMap: Record<string, number> = {
      raize_x: 95,
      raize: 90,
      rocky_hybrid: 92,
      rocky_petrol: 85,
      taft: 80,
      hustler: 75,
      n_one: 70,
      alto: 65,
      default: 50,
    };

    const score = (car: Car) => {
      const key = getKey(car);
      return scoreMap[key] || 50;
    };

    const aScore = score(carA);
    const bScore = score(carB);

    const winner = aScore >= bScore ? carA : carB;

    const points = getPoints(winner);

    // 🔥 MOST IMPORTANT FEATURE = strongest REAL indicator = first now consistent per model
    const bestFeature = points[0];

    return `Best overall: ${winner.title} → ${bestFeature}`;
  }, [carA, carB]);

  // =========================
  // SEARCH BOX
  // =========================
  const SearchBox = ({
    query,
    setQuery,
    onSelect,
    open,
    setOpen,
    refBox,
    otherSelected,
    clear,
  }: any) => {
    const results = filterCars(query);

    return (
      <div className="relative" ref={refBox} onClick={() => setOpen(true)}>
        <div className="flex items-center border rounded px-2 bg-white shadow-sm">

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            placeholder="Search or select car"
            className="w-full p-2 outline-none"
          />

          {query && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              className="px-2 text-gray-400"
            >
              ✕
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((p: boolean) => !p);
            }}
            className="px-2 text-blue-900 text-lg font-bold"
          >
            ▼
          </button>

        </div>

        {open && (
          <div
            className="absolute z-50 mt-2 w-full bg-white border rounded shadow overflow-y-scroll"
            style={{ height: "240px" }}
          >
            {results.map((car: Car) => {
              const disabled = otherSelected?.id === car.id;

              return (
                <div
                  key={car.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (disabled) return;
                    onSelect(car);
                    setQuery(car.title);
                    setOpen(false);
                  }}
                  className={`p-2 cursor-pointer text-sm hover:bg-gray-100 ${
                    disabled ? "opacity-40" : ""
                  }`}
                >
                  {car.title}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 gap-4">
        <SearchBox
          query={qA}
          setQuery={setQA}
          onSelect={(c: Car) => selectCar(c, setCarA, carB)}
          open={openA}
          setOpen={setOpenA}
          refBox={refA}
          otherSelected={carB}
          clear={() => {
            setQA("");
            setCarA(null);
          }}
        />

        <SearchBox
          query={qB}
          setQuery={setQB}
          onSelect={(c: Car) => selectCar(c, setCarB, carA)}
          open={openB}
          setOpen={setOpenB}
          refBox={refB}
          otherSelected={carA}
          clear={() => {
            setQB("");
            setCarB(null);
          }}
        />
      </div>

      {carA && carB && (
        <>
          <div className="grid grid-cols-2 gap-6">

            {[carA, carB].map((car) => (
              <div key={car.id} className="p-5 border rounded-lg">

                <h2 className="font-semibold text-lg">{car.title}</h2>

                <p className="text-blue-900 font-bold text-xl mb-3">
                  Rs {Number(car.price || 0).toLocaleString()}
                </p>

                <ul className="text-sm space-y-2">
                  {getPoints(car).map((p, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-blue-900">🚗</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

              </div>
            ))}

          </div>

          <div className="text-center text-sm text-gray-600 mt-3">
            {verdict}
          </div>
        </>
      )}
    </div>
  );
};

export default CompareCars;
