"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function FAQPage() {
  const [faqs, setFaqs] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.officialSettings && data.officialSettings.faqContent) {
          try {
            const parsed = JSON.parse(data.officialSettings.faqContent);
            if (Array.isArray(parsed)) {
              setFaqs(parsed);
            }
          } catch (e) {
            console.error("Failed to parse FAQ JSON string:", e);
          }
        }
      })
      .catch((err) => console.error("Error loading FAQs:", err));
  }, []);

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Client Support
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-8">
            {faqs.length === 0 ? (
              <div className="text-center py-8 text-xs text-luxury-gray">
                Loading Frequently Asked Questions from the Maison database...
              </div>
            ) : (
              faqs.map((faq, i) => (
                <div key={i} className="border border-luxury-gold/15 p-6 bg-luxury-ivory/10">
                  <h3 className="font-serif text-base text-luxury-black font-semibold mb-2">{faq.q}</h3>
                  <p className="text-xs text-luxury-gray leading-relaxed">{faq.a}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
