"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/shop/ProductCard";
import { useApp } from "@/context/AppContext";
import { Heart, HelpCircle } from "lucide-react";

export default function WishlistPage() {
  const { wishlist: wishlistIds } = useApp();
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) setProducts(data.products);
      })
      .catch(() => {});
  }, []);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-luxury-gold/15 pb-6 mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-2">
                Client Vault
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-luxury-black">
                Your Saved Creations
              </h1>
            </div>
          </div>

          {wishlistProducts.length === 0 ? (
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
              {wishlistProducts.map((item) => (
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
