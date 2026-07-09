import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Maison Logistics
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Shipping & Insurance
            </h1>
          </div>

          <div className="space-y-6 text-xs text-luxury-gray leading-relaxed border border-luxury-gold/15 p-8 bg-luxury-ivory/10">
            <h3 className="font-serif text-base text-luxury-black font-semibold">Complimentary Insured Delivery</h3>
            <p>
              Nakshtara offers complimentary, fully-insured delivery on all orders within India. Every package is sealed in double-secured tamper-proof packaging and shipped via trusted premium carriers (primarily FedEx and Blue Dart).
            </p>
            <h3 className="font-serif text-base text-luxury-black font-semibold">Verification & Signature Required</h3>
            <p>
              Due to the high value of our creations, an adult signature and government-issued ID verification are strictly required at the time of delivery. Packages cannot be left at unattended doorsteps or routed to PO boxes.
            </p>
            <h3 className="font-serif text-base text-luxury-black font-semibold">Dispatch Timelines</h3>
            <p>
              Standard designs in stock are dispatched within 2 to 3 business days. Customized or bespoke ring settings require 3 to 4 weeks of hand crafting and precision quality inspection at our Mumbai atelier.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
