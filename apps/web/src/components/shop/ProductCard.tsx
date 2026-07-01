"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Gem, ArrowRight } from "lucide-react";
import { Product } from "@/mocks/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  // Formats currency elegantly
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-luxury-white border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-500 flex flex-col justify-between"
    >
      {/* Wishlist Trigger */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-luxury-white/80 hover:bg-luxury-white text-luxury-black/80 hover:text-luxury-ruby transition-all duration-300 shadow-sm border border-luxury-gold/5"
        aria-label="Add to Wishlist"
      >
        <Heart className={`h-4.5 w-4.5 stroke-[1.5] ${isWishlisted ? "fill-luxury-ruby text-luxury-ruby" : ""}`} />
      </button>

      {/* Image Preview Area */}
      <div className="relative aspect-square w-full bg-luxury-ivory/50 flex items-center justify-center overflow-hidden border-b border-luxury-gold/5">
        {/* Mock luxury graphics placeholder since no real images */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <Gem className="h-10 w-10 text-luxury-gold/40 group-hover:scale-110 transition-transform duration-700" />
          <span className="text-[10px] tracking-widest uppercase text-luxury-gold font-semibold mt-4">
            {product.category === "diamond" ? "Loose Diamond" : product.collection}
          </span>
        </div>

        {/* Status Badge */}
        {!product.inStock && (
          <span className="absolute bottom-4 left-4 bg-luxury-ruby text-luxury-white text-[9px] uppercase tracking-widest font-semibold px-2 py-1">
            Sold / Bespoke Only
          </span>
        )}
      </div>

      {/* Details Area */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-base text-luxury-black font-light group-hover:text-luxury-gold transition-colors duration-300 line-clamp-2 min-h-[48px] mb-2.5">
            {product.name}
          </h3>

          {/* Conditional diamond specs */}
          {product.category === "diamond" ? (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[9px] font-medium tracking-wider uppercase bg-luxury-beige/40 text-luxury-gray px-2 py-0.5">
                Shape: {product.shape}
              </span>
              <span className="text-[9px] font-medium tracking-wider uppercase bg-luxury-beige/40 text-luxury-gray px-2 py-0.5">
                Carat: {product.carat}
              </span>
              <span className="text-[9px] font-medium tracking-wider uppercase bg-luxury-beige/40 text-luxury-gray px-2 py-0.5">
                Color: {product.color}
              </span>
              <span className="text-[9px] font-medium tracking-wider uppercase bg-luxury-beige/40 text-luxury-gray px-2 py-0.5">
                Clarity: {product.clarity}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[9px] font-medium tracking-wider uppercase bg-luxury-beige/40 text-luxury-gray px-2 py-0.5">
                Metal: {product.metal}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-luxury-gold/5 mt-auto">
          <span className="font-sans text-sm font-semibold tracking-wider text-luxury-black">
            {formatPrice(product.price)}
          </span>
          <Link
            href={`/shop/${product.id}`}
            className="text-[10px] font-sans font-bold uppercase tracking-widest text-luxury-black group-hover:text-luxury-gold transition-colors duration-300 inline-flex items-center gap-1.5"
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
