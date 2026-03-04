import partBrake from "@/assets/part-brake.jpg";
import partAirfilter from "@/assets/part-airfilter.jpg";
import partHeadlight from "@/assets/part-headlight.jpg";
import partTurbo from "@/assets/part-turbo.jpg";
import partExhaust from "@/assets/part-exhaust.jpg";
import partSuspension from "@/assets/part-suspension.jpg";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  inStock: boolean;
  image: string;
  price: string;
  specs: Record<string, string>;
}

export interface Car {
  id: string;
  name: string;
  year: string;
  image: string;
  description: string;
}

export const categories = ["All", "Braking", "Engine", "Lighting", "Exhaust", "Suspension"];

export const products: Product[] = [
  {
    id: "brake-disc-01",
    name: "Performance Brake Disc Kit",
    description: "High-performance drilled and slotted brake disc set for maximum stopping power and heat dissipation.",
    category: "Braking",
    inStock: true,
    image: partBrake,
    price: "$289",
    specs: { Material: "Carbon Ceramic", Diameter: "380mm", Weight: "4.2 kg", Compatibility: "Universal Fit" },
  },
  {
    id: "air-filter-01",
    name: "High-Flow Air Filter",
    description: "Washable, reusable performance air filter that increases airflow and engine efficiency.",
    category: "Engine",
    inStock: true,
    image: partAirfilter,
    price: "$64",
    specs: { Type: "Panel Filter", Material: "Cotton Gauze", Filtration: "99.2%", Lifespan: "50,000 miles" },
  },
  {
    id: "headlight-01",
    name: "LED Headlight Assembly",
    description: "Full LED headlight assembly with DRL strip, delivering crystal-clear illumination.",
    category: "Lighting",
    inStock: true,
    image: partHeadlight,
    price: "$445",
    specs: { Type: "Full LED", Lumens: "6,400 lm", Color: "6000K Pure White", Lifespan: "50,000 hours" },
  },
  {
    id: "turbo-01",
    name: "Twin-Scroll Turbocharger",
    description: "Precision-engineered twin-scroll turbo for reduced lag and maximum boost response.",
    category: "Engine",
    inStock: false,
    image: partTurbo,
    price: "$1,890",
    specs: { Type: "Twin-Scroll", "Max Boost": "22 PSI", "A/R Ratio": "0.63", Material: "Inconel / Aluminum" },
  },
  {
    id: "exhaust-01",
    name: "Stainless Steel Muffler",
    description: "Mandrel-bent stainless steel performance muffler with deep, aggressive tone.",
    category: "Exhaust",
    inStock: true,
    image: partExhaust,
    price: "$349",
    specs: { Material: "304 Stainless Steel", Diameter: "3 inch", Weight: "5.8 kg", Sound: "Deep Tone" },
  },
  {
    id: "suspension-01",
    name: "Adjustable Coilover Kit",
    description: "32-way adjustable coilover suspension kit for track and street performance.",
    category: "Suspension",
    inStock: true,
    image: partSuspension,
    price: "$1,120",
    specs: { Damping: "32-way Adjustable", "Spring Rate": "8k/6k", "Drop Range": "1-3 inches", Material: "6061 Aluminum" },
  },
];

export const cars: Car[] = [
  {
    id: "car-sport-1",
    name: "Sport Coupe GT",
    year: "2024",
    image: car1,
    description: "A sleek sports coupe built for precision handling and aggressive performance.",
  },
  {
    id: "car-suv-1",
    name: "Luxury SUV Pro",
    year: "2024",
    image: car2,
    description: "Premium SUV combining rugged capability with refined luxury and comfort.",
  },
  {
    id: "car-sedan-1",
    name: "Executive Sedan RS",
    year: "2025",
    image: car3,
    description: "High-performance sedan with an executive presence and race-inspired engineering.",
  },
];
