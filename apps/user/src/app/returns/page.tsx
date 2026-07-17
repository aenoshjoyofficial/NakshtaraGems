"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ReturnsPage() {
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.officialSettings) {
          setContent(data.officialSettings.returnsContent || "");
        }
      })
      .catch((err) => console.error("Error loading returns page content:", err));
  }, []);

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

          <div className="whitespace-pre-line text-xs text-luxury-gray leading-relaxed border border-luxury-gold/15 p-8 bg-luxury-ivory/10">
            {content || "Loading returns settings from the Maison database..."}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
