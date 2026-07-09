import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Maison Legal
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Terms of Service
            </h1>
          </div>

          <div className="space-y-6 text-xs text-luxury-gray leading-relaxed border border-luxury-gold/15 p-8 bg-luxury-ivory/10">
            <h3 className="font-serif text-base text-luxury-black font-semibold">1. Use of Website</h3>
            <p>
              By accessing Nakshtara Gems, you agree to comply with our conditions, and all applicable certification and sale guidelines. Product details are subject to updates.
            </p>
            <h3 className="font-serif text-base text-luxury-black font-semibold">2. Sourcing Commitments</h3>
            <p>
              Nakshtara guarantees all diamonds are conflict-free, ethically-sourced under the Kimberley Process, and properly GIA-certified at the moment of sale.
            </p>
            <h3 className="font-serif text-base text-luxury-black font-semibold">3. Limitation of Liability</h3>
            <p>
              We strive to display accurate diamond specifications. In rare cases where typographical errors occur regarding grade or price, Nakshtara reserves the right to cancel or amend orders.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
