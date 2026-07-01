"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Gem, ShieldCheck, Heart } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-luxury-black text-luxury-white">
          <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--color-luxury-charcoal)_0%,_#050505_100%] opacity-90 z-0" />

          {/* Decorative luxury sparkles overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(ellipse_at_center,_var(--color-luxury-gold-light)_0%,_transparent_70%)]" />

          <div className="relative max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-luxury-gold font-semibold mb-4"
            >
              The Pinnacle of Craftsmanship
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif text-3xl sm:text-5xl md:text-7xl font-extralight tracking-wide leading-tight mb-6"
            >
              Timeless Elegance,<br className="hidden sm:inline" /> Handcrafted Brilliance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-2xl text-xs md:text-sm text-luxury-white/70 leading-relaxed font-sans tracking-wide mb-10"
            >
              Explore our curated selection of conflict-free certified diamonds and fine jewellery. Expertly crafted in gold and platinum to celebrate life’s rarest milestones.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Shop Diamonds
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-luxury-white text-luxury-white hover:bg-luxury-white hover:text-luxury-black">
                Custom Jewelry
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-luxury-ivory py-12 border-b border-luxury-gold/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center text-center md:text-left">
              <Gem className="h-8 w-8 text-luxury-gold shrink-0" />
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-luxury-black font-semibold">GIA Certified</h3>
                <p className="text-[11px] text-luxury-gray">Every diamond is rigorously graded by the Gemological Institute of America.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center text-center md:text-left">
              <ShieldCheck className="h-8 w-8 text-luxury-gold shrink-0" />
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-luxury-black font-semibold">Insured Delivery</h3>
                <p className="text-[11px] text-luxury-gray">Complimentary, fully insured overnight shipping with discreet packaging.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center text-center md:text-left">
              <Sparkles className="h-8 w-8 text-luxury-gold shrink-0" />
              <div>
                <h3 className="font-serif text-sm tracking-wider uppercase text-luxury-black font-semibold">Bespoke Design</h3>
                <p className="text-[11px] text-luxury-gray">Work directly with master designers to create unique jewellery pieces.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Collection Highlight (Editorial Grid) */}
        <section className="py-24 bg-luxury-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold block mb-2">Curated Categories</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-luxury-black">Shop the Collections</h2>
              <div className="h-0.5 w-12 bg-luxury-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Category Card 1 */}
              <div className="group relative h-[450px] overflow-hidden bg-luxury-charcoal border border-luxury-gold/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-luxury-gray)_0%,_#111111_100%)] opacity-85 group-hover:scale-105 transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                  <span className="text-[9px] tracking-widest uppercase text-luxury-gold block mb-1">Brilliant & Certified</span>
                  <h3 className="font-serif text-2xl text-luxury-white font-light mb-4">Engagement Rings</h3>
                  <Link href="/shop?category=engagement" className="text-xs uppercase tracking-widest text-luxury-gold-light hover:text-luxury-white transition-colors inline-flex items-center gap-2">
                    Explore rings <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Category Card 2 */}
              <div className="group relative h-[450px] overflow-hidden bg-luxury-charcoal border border-luxury-gold/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-luxury-gray-light)_0%,_#161616_100%)] opacity-85 group-hover:scale-105 transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                  <span className="text-[9px] tracking-widest uppercase text-luxury-gold block mb-1">Pure Purity</span>
                  <h3 className="font-serif text-2xl text-luxury-white font-light mb-4">Loose Diamonds</h3>
                  <Link href="/shop?category=diamonds" className="text-xs uppercase tracking-widest text-luxury-gold-light hover:text-luxury-white transition-colors inline-flex items-center gap-2">
                    View shapes <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Category Card 3 */}
              <div className="group relative h-[450px] overflow-hidden bg-luxury-charcoal border border-luxury-gold/10 md:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-luxury-beige)_0%,_#1e1e1e_100%)] opacity-85 group-hover:scale-105 transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                  <span className="text-[9px] tracking-widest uppercase text-luxury-gold block mb-1">Modern Luxury</span>
                  <h3 className="font-serif text-2xl text-luxury-white font-light mb-4">Fine Jewellery</h3>
                  <Link href="/shop?category=jewellery" className="text-xs uppercase tracking-widest text-luxury-gold-light hover:text-luxury-white transition-colors inline-flex items-center gap-2">
                    Shop designs <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Editorial Quote */}
        <section className="bg-luxury-ivory py-24 border-t border-b border-luxury-gold/15 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Gem className="h-6 w-6 text-luxury-gold mx-auto mb-6 opacity-60 animate-pulse" />
            <blockquote className="font-serif text-2xl md:text-3xl italic tracking-wide text-luxury-black font-light leading-relaxed mb-8">
              &ldquo;True elegance is not about standing out, but about being remembered. Every diamond we cut and set is designed to carry a story through generations.&rdquo;
            </blockquote>
            <cite className="text-[10px] uppercase tracking-[0.25em] text-luxury-gray font-semibold not-italic">
              — Aravind Swamy, Chief Designer
            </cite>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
