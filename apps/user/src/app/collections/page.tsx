import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Sparkles } from "lucide-react";

import db from "@/mocks/db.json";

export default function CollectionsPage() {
  const collections = db.collections;

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Design Families
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-luxury-black mb-6">
              Maison Collections
            </h1>
            <p className="text-sm text-luxury-gray leading-relaxed">
              Explore the distinct creative visions behind our signature jewellery families, from minimalist modern layouts to complex hand-detailed traditional halos.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {collections.map((col) => (
              <div
                key={col.name}
                className={`border border-luxury-gold/10 p-10 flex flex-col justify-between min-h-[340px] relative transition-all duration-500 hover:border-luxury-gold ${col.bgClass}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold bg-luxury-white/95 px-3 py-1 border border-luxury-gold/10">
                    {col.badge}
                  </span>
                  <Sparkles className="h-5 w-5 text-luxury-gold/40" />
                </div>

                <div className="my-8">
                  <h3 className="font-serif text-2xl sm:text-3xl text-luxury-black font-light mb-3">
                    {col.name}
                  </h3>
                  <p className="text-xs text-luxury-gray leading-relaxed max-w-sm">
                    {col.desc}
                  </p>
                </div>

                <Link
                  href={col.link}
                  className="text-xs uppercase tracking-widest font-bold text-luxury-black hover:text-luxury-gold transition-colors inline-flex items-center gap-2 self-start"
                >
                  Discover Collection <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
