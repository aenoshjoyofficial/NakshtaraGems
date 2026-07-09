import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
          </div>

          <div className="space-y-6 text-xs text-luxury-gray leading-relaxed border border-luxury-gold/15 p-8 bg-luxury-ivory/10">
            <h3 className="font-serif text-base text-luxury-black font-semibold">Information We Collect</h3>
            <p>
              We collect information that you directly provide when scheduling virtual consultations, custom ring configurations, or orders. This includes names, emails, billing details, and specific design requests.
            </p>
            <h3 className="font-serif text-base text-luxury-black font-semibold">Data Protection</h3>
            <p>
              All personal and payment information processed through Nakshtara Gems is encrypted using industry-standard secure sockets layer (SSL) protocols. We do not sell or lease personal information to third parties.
            </p>
            <h3 className="font-serif text-base text-luxury-black font-semibold">Cookies & Analytics</h3>
            <p>
              We use cookies to enhance navigation, track selection lists in the custom builder, and compile visitor analytics to improve our showroom experience.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
