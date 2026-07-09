import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Maison Guarantees
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Returns & Exchanges
            </h1>
          </div>

          <div className="space-y-6 text-xs text-luxury-gray leading-relaxed border border-luxury-gold/15 p-8 bg-luxury-ivory/10">
            <h3 className="font-serif text-base text-luxury-black font-semibold">14-Day Return Window</h3>
            <p>
              We want you to be completely delighted with your purchase. Standard showroom inventory pieces can be returned or exchanged within 14 days of delivery.
            </p>
            <h3 className="Condition Guidelines text-base text-luxury-black font-semibold font-serif">Condition Guidelines</h3>
            <p>
              All returned creations must be in pristine, unworn condition, showing no signs of wear, resizing, or alteration. They must be returned in original boxes with all grading lab certificates (GIA report) intact. Missing lab certificates will incur a replacement fee.
            </p>
            <h3 className="font-serif text-base text-luxury-black font-semibold">Bespoke & Custom Creations</h3>
            <p>
              Custom-built pieces, personalized engraved designs, and custom settings created through the Bespoke Builder or virtual consultations are final sale and cannot be returned or exchanged.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
