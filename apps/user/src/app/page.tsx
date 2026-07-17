"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Gem, ShieldCheck, Heart, Award, ArrowUpRight, Scale } from "lucide-react";

const defaultData = {
  hero: { badge: "", title: "", subtitle: "", description: "", bgImage: "" },
  features: [],
  featuredGems: [],
  evaluator: { title: "Interactive GIA Diamond Evaluator", desc: "Calculate real-time valuation estimates based on grading factors.", basePrice: 5000 },
  homepageCollections: [],
  milestones: [],
  editorialQuote: { text: "", author: "", title: "" },
};

function deepMerge(defaults: any, overrides: any): any {
  const result = { ...defaults };
  for (const key of Object.keys(overrides || {})) {
    if (
      overrides[key] !== null && overrides[key] !== undefined &&
      typeof overrides[key] === "object" && !Array.isArray(overrides[key]) &&
      typeof result[key] === "object" && !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key], overrides[key]);
    } else if (overrides[key] !== null && overrides[key] !== undefined &&
               !(Array.isArray(overrides[key]) && overrides[key].length === 0)) {
      result[key] = overrides[key];
    }
  }
  return result;
}

export default function Home() {
  const [dataState, setDataState] = React.useState<any>(defaultData);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data) setDataState((prev: any) => deepMerge(prev, data));
      })
      .catch((err) => console.error("Error loading fresh home settings:", err));
  }, []);

  // Gemologist calculator state
  const [calcShape, setCalcShape] = React.useState("Round");
  const [calcCarat, setCalcCarat] = React.useState(1.0);
  const [calcClarity, setCalcClarity] = React.useState("VVS1");
  const [calcColor, setCalcColor] = React.useState("D");
  const [calcPrice, setCalcPrice] = React.useState(7500);

  // Recalculate price estimation
  React.useEffect(() => {
    let basePrice = dataState.evaluator?.basePrice || 5000; // dynamic base price

    // Shape multiplier
    const shapeMultiplier = calcShape === "Round" ? 1.2 : calcShape === "Emerald" ? 0.95 : 1.05;

    // Clarity multiplier
    const clarityFactors: Record<string, number> = { IF: 1.5, VVS1: 1.3, VVS2: 1.15, VS1: 1.0, VS2: 0.85 };
    const clarityFactor = clarityFactors[calcClarity] || 1.0;

    // Color multiplier
    const colorFactors: Record<string, number> = { D: 1.4, E: 1.25, F: 1.15, G: 1.0, H: 0.9 };
    const colorFactor = colorFactors[calcColor] || 1.0;

    const estimatedUSD = basePrice * calcCarat * shapeMultiplier * clarityFactor * colorFactor;
    const estimatedINR = Math.round(estimatedUSD * 83); // 83 INR per USD
    setCalcPrice(estimatedINR);
  }, [calcShape, calcCarat, calcClarity, calcColor, dataState]);

  return (
    <>
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-luxury-black text-luxury-white">
          {(dataState.hero as any).bgImage ? (
            <img
              src={(dataState.hero as any).bgImage}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 animate-fade-in"
            />
          ) : (
            <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--color-luxury-charcoal)_0%,_#050505_100%] opacity-90 z-0" />
          )}

          {/* Decorative luxury sparkles overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(ellipse_at_center,_var(--color-luxury-gold-light)_0%,_transparent_70%)]" />

          <div className="relative max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-luxury-gold font-semibold mb-4"
            >
              {(dataState.hero as any).badge || "The Pinnacle of Craftsmanship"}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif text-3xl sm:text-5xl md:text-7xl font-extralight tracking-wide leading-tight mb-6"
            >
              {dataState.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-2xl text-xs md:text-sm text-luxury-white/70 leading-relaxed font-sans tracking-wide mb-10"
            >
              {dataState.hero.subtitle} {dataState.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="/shop?category=diamond" className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full cursor-pointer">
                  Shop Diamonds
                </Button>
              </Link>
              <Link href="/custom" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full border-luxury-white text-luxury-white hover:bg-luxury-white hover:text-luxury-black cursor-pointer">
                  Custom Jewelry
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-luxury-ivory py-12 border-b border-luxury-gold/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {(dataState.features || []).map((feat: any, idx: number) => {
              const IconMap: Record<string, React.ComponentType<any>> = {
                Gem: Gem,
                ShieldCheck: ShieldCheck,
                Sparkles: Sparkles
              };
              const IconComponent = IconMap[feat.icon] || Gem;
              return (
                <div className="flex items-center gap-4 justify-center text-center md:text-left" key={idx}>
                  <IconComponent className="h-8 w-8 text-luxury-gold shrink-0" />
                  <div>
                    <h3 className="font-serif text-sm tracking-wider uppercase text-luxury-black font-semibold">{feat.title}</h3>
                    <p className="text-[11px] text-luxury-gray">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Premium Precious Gemstone Showcase */}
        <section className="py-24 bg-luxury-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold block mb-2">
                Unrivaled Rarity
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-luxury-black">
                Precious Gemstone Gallery
              </h2>
              <div className="h-0.5 w-12 bg-luxury-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(dataState.featuredGems || []).map((gem: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative bg-luxury-ivory/30 border border-luxury-gold/10 hover:border-luxury-gold/25 p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-lg"
                >
                  <div className="relative aspect-square w-full bg-luxury-white/60 mb-6 overflow-hidden border border-luxury-gold/5 flex items-center justify-center">
                    {gem.image && (
                      <Image
                        src={gem.image}
                        alt={gem.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-luxury-black font-light mb-2">{gem.name}</h3>
                    <p className="text-xs text-luxury-gray leading-relaxed mb-6">{gem.desc}</p>
                    <Link
                      href={gem.href}
                      className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold hover:text-luxury-black transition-colors inline-flex items-center gap-1.5"
                    >
                      View Details <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Gemologist Valuation Calculator */}
        <section className="py-24 bg-luxury-ivory/50 border-t border-b border-luxury-gold/15">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column info */}
              <div className="lg:col-span-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold block mb-2">
                  Atelier Valuation
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-luxury-black mb-6">
                  {dataState.evaluator?.title || "Interactive GIA Diamond Evaluator"}
                </h2>
                <p className="text-xs text-luxury-gray leading-relaxed mb-6">
                  {dataState.evaluator?.desc || "Calculate real-time valuation estimates based on grading factors. Enter your desired specifications below to get estimated pricing values updated immediately."}
                </p>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-luxury-black font-bold">
                  <Award className="h-5 w-5 text-luxury-gold" /> GIA Grading Criteria Integrated
                </div>
              </div>

              {/* Right Column Interactive Widget */}
              <div className="lg:col-span-7 bg-luxury-white border border-luxury-gold/15 p-6 md:p-8 shadow-xl relative">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* Shape */}
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Shape</label>
                    <select
                      value={calcShape}
                      onChange={(e) => setCalcShape(e.target.value)}
                      className="w-full bg-transparent text-xs text-luxury-black uppercase tracking-wider border-b border-luxury-gold/20 pb-1 focus:border-luxury-gold focus:outline-none cursor-pointer"
                    >
                      <option value="Round">Round Brilliant</option>
                      <option value="Oval">Oval Cut</option>
                      <option value="Emerald">Emerald Cut</option>
                    </select>
                  </div>

                  {/* Carat */}
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Carat Weight ({calcCarat}ct)</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={calcCarat}
                      onChange={(e) => setCalcCarat(parseFloat(e.target.value))}
                      className="w-full h-1 bg-luxury-gray-light rounded-lg appearance-none cursor-pointer accent-luxury-gold mt-2"
                    />
                  </div>

                  {/* Clarity */}
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Clarity Grade</label>
                    <select
                      value={calcClarity}
                      onChange={(e) => setCalcClarity(e.target.value)}
                      className="w-full bg-transparent text-xs text-luxury-black uppercase tracking-wider border-b border-luxury-gold/20 pb-1 focus:border-luxury-gold focus:outline-none cursor-pointer"
                    >
                      <option value="IF">Flawless (IF)</option>
                      <option value="VVS1">Very Very Slightly (VVS1)</option>
                      <option value="VVS2">Very Very Slightly (VVS2)</option>
                      <option value="VS1">Very Slightly (VS1)</option>
                      <option value="VS2">Very Slightly (VS2)</option>
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Color Grade</label>
                    <select
                      value={calcColor}
                      onChange={(e) => setCalcColor(e.target.value)}
                      className="w-full bg-transparent text-xs text-luxury-black uppercase tracking-wider border-b border-luxury-gold/20 pb-1 focus:border-luxury-gold focus:outline-none cursor-pointer"
                    >
                      <option value="D">D (Colorless)</option>
                      <option value="E">E (Colorless)</option>
                      <option value="F">F (Colorless)</option>
                      <option value="G">G (Near Colorless)</option>
                      <option value="H">H (Near Colorless)</option>
                    </select>
                  </div>
                </div>

                {/* Estimate output box */}
                <div className="border-t border-luxury-gold/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-luxury-gray block">Estimated Value</span>
                    <span className="font-serif text-2xl font-bold text-luxury-black">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(calcPrice)}
                    </span>
                  </div>
                  <Link href={`/shop?shape=${calcShape.toLowerCase()}`}>
                    <Button variant="gold" size="sm" className="cursor-pointer text-[9px] uppercase tracking-widest">
                      View Matching Stones <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Category Editorial Grid */}
        <section className="py-24 bg-luxury-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold block mb-2">Curated Categories</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-luxury-black">Shop the Collections</h2>
              <div className="h-0.5 w-12 bg-luxury-gold mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(dataState.homepageCollections || []).map((col: any, idx: number) => {
                const fallbackImages = [
                  "/images/collections/rings.png",
                  "/images/collections/diamonds.png",
                  "/images/collections/jewellery.png"
                ];
                const imageSrc = col.image || fallbackImages[idx % 3];
                return (
                  <div key={idx} className="group relative h-[450px] overflow-hidden bg-luxury-charcoal border border-luxury-gold/10">
                    <Image
                      src={imageSrc}
                      alt={col.title || "Collection"}
                      fill
                      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent opacity-90" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                      <span className="text-[9px] tracking-widest uppercase text-luxury-gold block mb-1 font-bold">
                        {col.badge || "Curated Design"}
                      </span>
                      <h3 className="font-serif text-2xl text-luxury-white font-light mb-4">{col.title}</h3>
                      <Link href={col.link || "/shop"} className="text-xs uppercase tracking-widest text-luxury-gold-light hover:text-luxury-white transition-colors inline-flex items-center gap-2">
                        Explore Collection <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand Heritage Timeline */}
        <section className="py-24 bg-luxury-ivory border-t border-luxury-gold/15">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-semibold block mb-2">Heritage Story</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-luxury-black">Milestones of the Maison</h2>
              <div className="h-0.5 w-12 bg-luxury-gold mx-auto mt-4" />
            </div>

            <div className="space-y-12">
              {(dataState.milestones || []).map((milestone: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex gap-6 items-start border-l-2 border-luxury-gold/30 pl-6 relative"
                >
                  <div className="absolute -left-2 top-1.5 h-3.5 w-3.5 rounded-full bg-luxury-gold border border-luxury-ivory" />
                  <div>
                    <span className="font-serif text-xl font-bold text-luxury-gold block mb-1">{milestone.year}</span>
                    <h4 className="font-serif text-lg text-luxury-black font-light mb-1.5">{milestone.title}</h4>
                    <p className="text-xs text-luxury-gray leading-relaxed max-w-2xl">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Editorial Quote */}
        <section className="bg-luxury-white py-24 border-t border-b border-luxury-gold/15 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <Gem className="h-6 w-6 text-luxury-gold mx-auto mb-6 opacity-60 animate-pulse" />
            <blockquote className="font-serif text-2xl md:text-3xl italic tracking-wide text-luxury-black font-light leading-relaxed mb-8">
              &ldquo;{dataState.editorialQuote?.text || "True elegance is not about standing out, but about being remembered. Every diamond we cut and set is designed to carry a story through generations."}&rdquo;
            </blockquote>
            <cite className="text-[10px] uppercase tracking-[0.25em] text-luxury-gray font-semibold not-italic">
              — {dataState.editorialQuote?.author || "Aravind Swamy"}, {dataState.editorialQuote?.title || "Chief Designer"}
            </cite>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
