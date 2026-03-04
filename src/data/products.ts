// =============================================================
// HOW TO ADD YOUR REMAINING PRODUCT IMAGES:
// =============================================================
// 1. Place your image files in: src/assets/products/
//    Name them: part-7.jpeg, part-8.jpeg, ... part-53.jpeg
//
// 2. Add an import line at the top of this file for each image:
//    import part7 from "@/assets/products/part-7.jpeg";
//
// 3. In the products array below, update the `image` field:
//    image: part7,
//
// 4. For products that don't have an image yet, they use
//    a placeholder. Just replace the `image` field once you
//    add the file.
// =============================================================

import part1 from "@/assets/products/part-1.jpeg";
import part2 from "@/assets/products/part-2.jpeg";
import part3 from "@/assets/products/part-3.jpeg";
import part4 from "@/assets/products/part-4.jpeg";
import part5 from "@/assets/products/part-5.jpeg";
import part6 from "@/assets/products/part-6.jpeg";
// import part7 from "@/assets/products/part-7.jpeg";
// import part8 from "@/assets/products/part-8.jpeg";
// ... add more imports as you add images

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
