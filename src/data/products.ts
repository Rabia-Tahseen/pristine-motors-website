

import part1 from "@/assets/products/part-1.jpeg";
import part2 from "@/assets/products/part-2.jpeg";
import part3 from "@/assets/products/part-3.jpeg";
import part4 from "@/assets/products/part-4.jpeg";
import part5 from "@/assets/products/part-5.jpeg";
import part6 from "@/assets/products/part-6.jpeg";
import part7 from "@/assets/products/part-7.jpeg";
import part8 from "@/assets/products/part-8.jpeg";
import part9 from "@/assets/products/part-9.jpeg";
import part10 from "@/assets/products/part-10.jpeg";
import part11 from "@/assets/products/part-11.jpeg";
import part12 from "@/assets/products/part-12.jpeg";
import part13 from "@/assets/products/part-13.jpeg";
import part14 from "@/assets/products/part-14.jpeg";
import part15 from "@/assets/products/part-15.jpeg";
import part16 from "@/assets/products/part-16.jpeg";
import part17 from "@/assets/products/part-17.jpeg";
import part18 from "@/assets/products/part-18.jpeg";
import part19 from "@/assets/products/part-19.jpeg";
import part20 from "@/assets/products/part-20.jpeg";
import part21 from "@/assets/products/part-21.jpeg";
import part22 from "@/assets/products/part-22.jpeg";
import part23 from "@/assets/products/part-23.jpeg";
import part24 from "@/assets/products/part-24.jpeg";
import part25 from "@/assets/products/part-25.jpeg";
import part26 from "@/assets/products/part-26.jpeg";
import part27 from "@/assets/products/part-27.jpeg";
import part28 from "@/assets/products/part-28.jpeg";
import part29 from "@/assets/products/part-29.jpeg";
import part30 from "@/assets/products/part-30.jpeg";
import part31 from "@/assets/products/part-31.jpeg";
import part32 from "@/assets/products/part-32.jpeg";
import part33 from "@/assets/products/part-33.jpeg";
import part34 from "@/assets/products/part-34.jpeg";
import part35 from "@/assets/products/part-35.jpeg";
import part36 from "@/assets/products/part-36.jpeg";
import part37 from "@/assets/products/part-37.jpeg";
import part38 from "@/assets/products/part-38.jpeg";
import part39 from "@/assets/products/part-39.jpeg";
import part40 from "@/assets/products/part-40.jpeg";
import part41 from "@/assets/products/part-41.jpeg";
import part42 from "@/assets/products/part-42.jpeg";
import part43 from "@/assets/products/part-43.jpeg";
import part44 from "@/assets/products/part-44.jpeg";
import part45 from "@/assets/products/part-45.jpeg";
import part46 from "@/assets/products/part-46.jpeg";
import part47 from "@/assets/products/part-47.jpeg";
import part48 from "@/assets/products/part-48.jpeg";
import part49 from "@/assets/products/part-49.jpeg";
import part50 from "@/assets/products/part-50.jpeg";
import part51 from "@/assets/products/part-51.jpeg";
import part52 from "@/assets/products/part-52.jpeg";
import part53 from "@/assets/products/part-53.jpeg";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  condition: string;
  inStock: boolean;
  image: string;
  images?: string[];
  price: string;
  vehicle: string;
}

export const categories = [
  "All",
  "Body Parts",
  "Lighting",
  "Interior",
  "Bumpers",
  "Mirrors",
  "Nose Cut",
];

export const vehicles = ["All", "Toyota Raize", "Daihatsu Mira", "Daihatsu Taft"];

export const products: Product[] = [
  {
    id: "toyota-raize-bonnet",
    name: "Toyota Raize Bonnet",
    description: "Red color bonnet for Toyota Raize. Has 3 minor dents.",
    category: "Body Parts",
    condition: "3 minor dents",
    inStock: true,
    image: part1,
    images: [part1, part3, part4, part5, part6],
    price: "Rs. 65,000",
    vehicle: "Toyota Raize",
  },
  {
    id: "toyota-raize-right-fender",
    name: "Toyota Raize Right Fender",
    description: "Pearl white color right fender for Toyota Raize. Good condition.",
    category: "Body Parts",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg", // Replace with actual image: import and set here
    price: "Rs. 28,000",
    vehicle: "Toyota Raize",
  },
  {
    id: "toyota-raize-steering",
    name: "Toyota Raize Steering",
    description: "Original steering wheel for Toyota Raize. Excellent condition with multi-function controls.",
    category: "Interior",
    condition: "Excellent",
    inStock: true,
    image: part2,
    price: "Rs. 25,000",
    vehicle: "Toyota Raize",
  },
  {
    id: "toyota-raize-trunk",
    name: "Toyota Raize Trunk",
    description: "Pearl white color trunk for Toyota Raize. Clean and in great shape.",
    category: "Body Parts",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 35,000",
    vehicle: "Toyota Raize",
  },
  {
    id: "toyota-raize-bumper",
    name: "Toyota Raize Front Bumper",
    description: "Pearl white front bumper for Toyota Raize. Complete with grille attachment points.",
    category: "Bumpers",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 95,000",
    vehicle: "Toyota Raize",
  },
  {
    id: "toyota-raize-back-light-right",
    name: "Toyota Raize Back Light (Right)",
    description: "Right side back light / tail light for Toyota Raize. Fully functional.",
    category: "Lighting",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 25,000",
    vehicle: "Toyota Raize",
  },
  {
    id: "toyota-raize-right-headlight",
    name: "Toyota Raize Right Headlight",
    description: "Right side headlight assembly for Toyota Raize. Original OEM part.",
    category: "Lighting",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 35,000",
    vehicle: "Toyota Raize",
  },
  {
    id: "daihatsu-mira-front-bumper",
    name: "Daihatsu Mira Front Bumper",
    description: "Front bumper for Daihatsu Mira. Ready to install.",
    category: "Bumpers",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 25,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-mira-left-mirror",
    name: "Daihatsu Mira Left Side Mirror",
    description: "Left side mirror for Daihatsu Mira. Includes housing and glass.",
    category: "Mirrors",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 18,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-mira-left-headlight",
    name: "Daihatsu Mira Left Headlight",
    description: "Left headlight assembly for Daihatsu Mira. Clear lens, fully functional.",
    category: "Lighting",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 20,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-mira-right-headlight",
    name: "Daihatsu Mira Right Headlight",
    description: "Right headlight assembly for Daihatsu Mira. Clear lens, fully functional.",
    category: "Lighting",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 20,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-mira-silver-bonnet",
    name: "Daihatsu Mira Silver Bonnet",
    description: "Silver color bonnet for Daihatsu Mira. Minor wear, great condition overall.",
    category: "Body Parts",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 55,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-mira-back-lights",
    name: "Daihatsu Mira Back Lights",
    description: "Pair of back lights / tail lights for Daihatsu Mira.",
    category: "Lighting",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 25,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-mira-silver-trunk",
    name: "Daihatsu Mira Silver Trunk",
    description: "Silver color trunk lid for Daihatsu Mira. Clean finish.",
    category: "Body Parts",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 45,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-mira-nose-cut",
    name: "Daihatsu Mira Complete Nose Cut",
    description: "Complete front nose cut for Daihatsu Mira. Includes bumper, headlights, fenders, hood, and radiator support.",
    category: "Nose Cut",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 75,000",
    vehicle: "Daihatsu Mira",
  },
  {
    id: "daihatsu-taft-bonnet",
    name: "Daihatsu Taft Bonnet",
    description: "Bonnet / hood for Daihatsu Taft. Solid condition.",
    category: "Body Parts",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 55,000",
    vehicle: "Daihatsu Taft",
  },
  {
    id: "daihatsu-taft-front-bumper",
    name: "Daihatsu Taft Front Bumper",
    description: "Front bumper for Daihatsu Taft. Ready for installation.",
    category: "Bumpers",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 35,000",
    vehicle: "Daihatsu Taft",
  },
  {
    id: "daihatsu-left-fender",
    name: "Daihatsu Left Fender",
    description: "Left fender panel for Daihatsu. Good condition.",
    category: "Body Parts",
    condition: "Good",
    inStock: true,
    image: "/placeholder.svg",
    price: "Rs. 35,000",
    vehicle: "Daihatsu Taft",
  },
];
