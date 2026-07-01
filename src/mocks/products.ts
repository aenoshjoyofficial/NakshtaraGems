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

export const MOCK_PRODUCTS: Product[] = [
  // Loose Diamonds
  {
    id: "dia-001",
    name: "1.52 Carat Round Cut Brilliant Diamond",
    category: "diamond",
    shape: "Round",
    carat: 1.52,
    cut: "Ideal",
    color: "D",
    clarity: "IF",
    certificate: "GIA",
    price: 15400,
    image: "round-diamond",
    rating: 5,
    inStock: true,
  },
  {
    id: "dia-002",
    name: "2.01 Carat Oval Brilliant Diamond",
    category: "diamond",
    shape: "Oval",
    carat: 2.01,
    cut: "Excellent",
    color: "E",
    clarity: "VVS1",
    certificate: "GIA",
    price: 24500,
    image: "oval-diamond",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "dia-003",
    name: "1.20 Carat Emerald Cut Solitaire Diamond",
    category: "diamond",
    shape: "Emerald",
    carat: 1.2,
    cut: "Very Good",
    color: "F",
    clarity: "VS1",
    certificate: "IGI",
    price: 8900,
    image: "emerald-diamond",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "dia-004",
    name: "1.80 Carat Pear Brilliant Diamond",
    category: "diamond",
    shape: "Pear",
    carat: 1.8,
    cut: "Excellent",
    color: "G",
    clarity: "VVS2",
    certificate: "GIA",
    price: 14200,
    image: "pear-diamond",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "dia-005",
    name: "0.95 Carat Princess Cut Solitaire Diamond",
    category: "diamond",
    shape: "Princess",
    carat: 0.95,
    cut: "Ideal",
    color: "E",
    clarity: "VS2",
    certificate: "GIA",
    price: 5200,
    image: "princess-diamond",
    rating: 4.6,
    inStock: true,
  },

  // Fine Jewellery
  {
    id: "jewel-001",
    name: "The Royal Solitaire Engagement Ring",
    category: "jewellery",
    metal: "Platinum",
    collection: "Solitaire",
    price: 3200,
    image: "royal-solitaire-ring",
    rating: 5,
    inStock: true,
  },
  {
    id: "jewel-002",
    name: "Constellation Diamond Eternity Band",
    category: "jewellery",
    metal: "18k White Gold",
    collection: "Eternity",
    price: 4500,
    image: "constellation-eternity-band",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "jewel-003",
    name: "Bespoke Heritage Emerald Halo Ring",
    category: "jewellery",
    metal: "18k Yellow Gold",
    collection: "Heritage",
    price: 6800,
    image: "heritage-halo-ring",
    rating: 5,
    inStock: false,
  },
  {
    id: "jewel-004",
    name: "Aura Rose Gold Diamond Studs",
    category: "jewellery",
    metal: "18k Rose Gold",
    collection: "Constellation",
    price: 1800,
    image: "aura-studs",
    rating: 4.7,
    inStock: true,
  },
];
