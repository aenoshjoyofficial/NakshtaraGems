import db from "./db.json";

export interface Product {
  id: string;
  name: string;
  category: "diamond" | "jewellery" | "gemstone";
  shape?: string;
  carat?: number;
  cut?: "Ideal" | "Excellent" | "Very Good" | "Good";
  color?: "D" | "E" | "F" | "G" | "H" | "I" | "J";
  clarity?: "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2";
  certificate?: "GIA" | "IGI" | "HRD";
  price: number;
  image: string;
  images?: string[];  // Up to 4 product images (1000×1000px, < 1MB each)
  video?: string;     // Short product showcase video (< 50MB, MP4)
  metal?: "Platinum" | "18k White Gold" | "18k Yellow Gold" | "18k Rose Gold";
  collection?: "Solitaire" | "Constellation" | "Heritage" | "Eternity";
  rating: number;
  inStock: boolean;
  draft?: boolean;      // Whether the product is a draft (hidden from storefront)
  stockCount?: number;  // The manual quantity of items available
  // Gemstone-specific fields
  gemType?: string;
  origin?: string;
  treatment?: string;
}

export const MOCK_PRODUCTS = db.products as Product[];
export const MOCK_DB = db;
