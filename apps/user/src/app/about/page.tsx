import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShieldAlert, BookOpen, Compass, Award } from "lucide-react";
import db from "@/mocks/db.json";

export default function HeritagePage() {
  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              The Maison
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-luxury-black mb-6">
              {db.about.title}
            </h1>
            <p className="text-sm text-luxury-gray leading-relaxed">
              {db.about.description}
            </p>
          </div>

          {/* Two-Column Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 pb-12 border-b border-luxury-gold/15">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-2">Our Origins</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-luxury-black font-light mb-6">
                Artistry Born In Mumbai
              </h2>
              <div className="space-y-4 text-xs text-luxury-gray leading-relaxed">
                <p>
                  {db.about.origins}
                </p>
              </div>
            </div>
            <div className="bg-luxury-ivory p-12 text-center border border-luxury-gold/10">
              <Compass className="h-12 w-12 text-luxury-gold/50 mx-auto mb-6" />
              <p className="font-serif text-lg italic text-luxury-black mb-4">
                "{db.about.quote}"
              </p>
              <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-semibold">— Founder, Nakshtara Gems</span>
            </div>
          </div>

          {/* Brand Values / Ethical Commitments */}
          <div>
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-2">Ethical Standards</span>
              <h2 className="font-serif text-3xl font-light text-luxury-black">Our Three Promises</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="border border-luxury-gold/10 p-8 text-center hover:border-luxury-gold transition-colors duration-500">
                <BookOpen className="h-8 w-8 text-luxury-gold/60 mx-auto mb-6" />
                <h3 className="font-serif text-lg text-luxury-black font-medium mb-3">100% GIA Certification</h3>
                <p className="text-xs text-luxury-gray leading-relaxed">
                  Every center diamond above 0.3 carats sold by Nakshtara comes certified directly by the Gemological Institute of America (GIA), ensuring complete specification accuracy.
                </p>
              </div>

              <div className="border border-luxury-gold/10 p-8 text-center hover:border-luxury-gold transition-colors duration-500">
                <ShieldAlert className="h-8 w-8 text-luxury-gold/60 mx-auto mb-6" />
                <h3 className="font-serif text-lg text-luxury-black font-medium mb-3">Conflict-Free Sourcing</h3>
                <p className="text-xs text-luxury-gray leading-relaxed">
                  We adhere strictly to the Kimberley Process, sourcing our raw diamonds exclusively from regions that are certified conflict-free and environmentally sustainable.
                </p>
              </div>

              <div className="border border-luxury-gold/10 p-8 text-center hover:border-luxury-gold transition-colors duration-500">
                <Award className="h-8 w-8 text-luxury-gold/60 mx-auto mb-6" />
                <h3 className="font-serif text-lg text-luxury-black font-medium mb-3">Lifetime Care Warranty</h3>
                <p className="text-xs text-luxury-gray leading-relaxed">
                  We offer complimentary lifetime professional cleaning, prong tightening, and structural inspections for every jewelry piece purchased from our showroom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
