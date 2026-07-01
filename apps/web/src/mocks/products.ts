import db from "./db.json";

export interface Product {
  id: string;
  name: string;
  category: "diamond" | "jewellery";
  shape?: "Round" | "Oval" | "Emerald" | "Pear" | "Princess" | "Marquise";
  carat?: number;
  cut?: "Ideal" | "Excellent" | "Very Good" | "Good";
  color?: "D" | "E" | "F" | "G" | "H" | "I" | "J";
  clarity?: "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2";
  certificate?: "GIA" | "IGI" | "HRD";
  price: number;
  image: string;
  metal?: "Platinum" | "18k White Gold" | "18k Yellow Gold" | "18k Rose Gold";
  collection?: "Solitaire" | "Constellation" | "Heritage" | "Eternity";
  rating: number;
  inStock: boolean;
}

export const MOCK_PRODUCTS = db.products as Product[];
export const MOCK_DB = db;
