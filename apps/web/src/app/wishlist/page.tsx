"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MOCK_PRODUCTS } from "@/mocks/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Heart, HelpCircle } from "lucide-react";

export default function WishlistPage() {
  // Mock wishlist with 2 items for visual completeness
  const [wishlist, setWishlist] = React.useState([MOCK_PRODUCTS[0], MOCK_PRODUCTS[5]]);

  const handleClear = () => {
    setWishlist([]);
  };

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-luxury-gold/15 pb-6 mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-2">
                Client Vault
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-luxury-black">
                Your Saved Creations
              </h1>
            </div>
            {wishlist.length > 0 && (
              <button
                onClick={handleClear}
                className="text-[10px] uppercase tracking-widest text-luxury-gray hover:text-luxury-black font-bold transition-colors cursor-pointer"
              >
                Remove All Items
              </button>
            )}
          </div>

          {/* List display */}
          {wishlist.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-luxury-gold/15 bg-luxury-ivory/20 rounded flex flex-col items-center">
              <Heart className="h-10 w-10 text-luxury-gold/40 mb-4" />
              <h3 className="font-serif text-lg text-luxury-black mb-2">Your Wishlist is Empty</h3>
              <p className="text-xs text-luxury-gray max-w-sm leading-relaxed mb-6">
                Explore the showroom and tap the heart icon on creations you want to save in your private collection.
              </p>
              <Link
                href="/shop"
                className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all"
              >
                Go to Showroom
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div key={item.id} className="relative">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
