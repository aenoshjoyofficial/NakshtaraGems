"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Gem, Sparkles, Check, ArrowRight, RotateCcw } from "lucide-react";

export default function CustomBuilderPage() {
  const [step, setStep] = React.useState(1);
  const [selectedShape, setSelectedShape] = React.useState("Round");
  const [selectedSetting, setSelectedSetting] = React.useState("Classic Solitaire");
  const [selectedMetal, setSelectedMetal] = React.useState("Platinum");
  const [caratWeight, setCaratWeight] = React.useState(1.0);

  const shapes = [
    { name: "Round", desc: "Brilliant & Classic", multiplier: 1.0 },
    { name: "Oval", desc: "Modern & Elongated", multiplier: 1.1 },
    { name: "Emerald", desc: "Elegant Step-Cut", multiplier: 0.95 },
    { name: "Pear", desc: "Unique Teardrop", multiplier: 1.05 },
    { name: "Princess", desc: "Contemporary Square", multiplier: 0.9 },
  ];

  const settings = [
    { name: "Classic Solitaire", desc: "Four-prong classic, maximum light return.", basePrice: 40000 },
    { name: "Royal Halo", desc: "A border of micro-pavé diamonds.", basePrice: 65000 },
    { name: "Tension Setting", desc: "Floating diamond illusion, ultra-modern.", basePrice: 55000 },
    { name: "Vintage Milgrain", desc: "Intricate antique-style gold borders.", basePrice: 70000 },
  ];

  const metals = [
    { name: "Platinum", desc: "Precious & Pure White", addedCost: 25000 },
    { name: "18k White Gold", desc: "Bright Rhodium Finish", addedCost: 15000 },
    { name: "18k Yellow Gold", desc: "Warm & Traditional", addedCost: 12000 },
    { name: "18k Rose Gold", desc: "Sleek & Contemporary", addedCost: 12000 },
  ];

  // Calculate dynamic pricing estimate in INR
  const estimatedPrice = React.useMemo(() => {
    const settingObj = settings.find((s) => s.name === selectedSetting) || settings[0];
    const metalObj = metals.find((m) => m.name === selectedMetal) || metals[0];
    const shapeObj = shapes.find((s) => s.name === selectedShape) || shapes[0];

    const baseCost = settingObj.basePrice + metalObj.addedCost;
    const diamondCost = caratWeight * 125000 * shapeObj.multiplier;
    return baseCost + diamondCost;
  }, [selectedShape, selectedSetting, selectedMetal, caratWeight]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedShape("Round");
    setSelectedSetting("Classic Solitaire");
    setSelectedMetal("Platinum");
    setCaratWeight(1.0);
  };

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header Title */}
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-2">
              Bespoke Atelier
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Bespoke Ring Concierge
            </h1>
            <p className="text-xs text-luxury-gray max-w-xl mx-auto leading-relaxed">
              Design a unique signature ring tailored to your specific preferences. Select each component below to preview options and pricing.
            </p>
          </div>

          {/* Stepper indicators */}
          <div className="flex justify-center items-center gap-2 sm:gap-6 mb-12 max-w-lg mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => setStep(i)}
                  className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                    step >= i
                      ? "bg-luxury-black text-luxury-white border-luxury-black"
                      : "border-luxury-gold/30 text-luxury-gray hover:border-luxury-gold"
                  }`}
                >
                  {i}
                </button>
                {i < 4 && <div className={`flex-grow h-[1px] ${step > i ? "bg-luxury-black" : "bg-luxury-gold/25"}`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Preview Screen */}
            <div className="lg:col-span-7 bg-luxury-ivory/30 border border-luxury-gold/10 p-8 flex flex-col justify-between min-h-[400px] relative rounded-none">
              <div className="flex justify-between items-center">
                <span className="text-[9px] tracking-widest uppercase text-luxury-gold font-bold">Preview Creation</span>
                <button onClick={handleReset} className="text-luxury-gray hover:text-luxury-black text-[9px] uppercase tracking-widest font-bold flex items-center gap-1">
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              <div className="text-center py-12">
                <div className="relative inline-block mb-6">
                  <Gem className="h-20 w-20 text-luxury-gold/40 mx-auto animate-pulse" />
                  <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-luxury-gold" />
                </div>
                <h3 className="font-serif text-2xl text-luxury-black font-light mb-2">
                  The {selectedShape} {selectedSetting}
                </h3>
                <p className="text-xs text-luxury-gray">
                  Set in {selectedMetal} • {caratWeight.toFixed(2)} Carats
                </p>
              </div>

              <div className="border-t border-luxury-gold/10 pt-6 flex justify-between items-end">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-1">Estimated Cost</span>
                  <span className="font-sans text-xl font-bold text-luxury-black">{formatPrice(estimatedPrice)}</span>
                </div>
                <span className="text-[9px] tracking-widest uppercase bg-luxury-gold/15 text-luxury-gold px-2.5 py-1 font-semibold">
                  Handcrafted in India
                </span>
              </div>
            </div>

            {/* Right Selection Steps */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-luxury-gold/10 p-8 bg-luxury-white">
              <div>
                {/* STEP 1: Diamond Shape */}
                {step === 1 && (
                  <div>
                    <h2 className="font-serif text-lg text-luxury-black font-medium mb-1">Step 1: Select Diamond Shape</h2>
                    <p className="text-[11px] text-luxury-gray mb-6">Choose the signature geometry that reflects your style.</p>
                    <div className="space-y-3">
                      {shapes.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => setSelectedShape(item.name)}
                          className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all ${
                            selectedShape === item.name
                              ? "border-luxury-black bg-luxury-black/5"
                              : "border-luxury-gold/10 hover:border-luxury-gold"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-semibold text-luxury-black uppercase tracking-wider">{item.name}</h4>
                            <p className="text-[10px] text-luxury-gray">{item.desc}</p>
                          </div>
                          {selectedShape === item.name && <Check className="h-4 w-4 text-luxury-gold" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Setting Type */}
                {step === 2 && (
                  <div>
                    <h2 className="font-serif text-lg text-luxury-black font-medium mb-1">Step 2: Select Band Setting</h2>
                    <p className="text-[11px] text-luxury-gray mb-6">Choose the style setting that holds the center stone.</p>
                    <div className="space-y-3">
                      {settings.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => setSelectedSetting(item.name)}
                          className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all ${
                            selectedSetting === item.name
                              ? "border-luxury-black bg-luxury-black/5"
                              : "border-luxury-gold/10 hover:border-luxury-gold"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-semibold text-luxury-black uppercase tracking-wider">{item.name}</h4>
                            <p className="text-[10px] text-luxury-gray">{item.desc}</p>
                          </div>
                          {selectedSetting === item.name && <Check className="h-4 w-4 text-luxury-gold" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Metals */}
                {step === 3 && (
                  <div>
                    <h2 className="font-serif text-lg text-luxury-black font-medium mb-1">Step 3: Select Precious Metal</h2>
                    <p className="text-[11px] text-luxury-gray mb-6">Select the band composition from our certified selections.</p>
                    <div className="space-y-3">
                      {metals.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => setSelectedMetal(item.name)}
                          className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all ${
                            selectedMetal === item.name
                              ? "border-luxury-black bg-luxury-black/5"
                              : "border-luxury-gold/10 hover:border-luxury-gold"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-semibold text-luxury-black uppercase tracking-wider">{item.name}</h4>
                            <p className="text-[10px] text-luxury-gray">{item.desc}</p>
                          </div>
                          {selectedMetal === item.name && <Check className="h-4 w-4 text-luxury-gold" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Carats */}
                {step === 4 && (
                  <div>
                    <h2 className="font-serif text-lg text-luxury-black font-medium mb-1">Step 4: Select Carat Weight</h2>
                    <p className="text-[11px] text-luxury-gray mb-6">Choose the size/carat weight of the center diamond.</p>

                    <div className="bg-luxury-ivory/20 border border-luxury-gold/10 p-6 text-center mb-6">
                      <span className="text-[10px] uppercase text-luxury-gray block mb-2">Weight</span>
                      <span className="text-3xl font-bold text-luxury-black font-sans">{caratWeight.toFixed(2)} Carats</span>
                    </div>

                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.05"
                      value={caratWeight}
                      onChange={(e) => setCaratWeight(parseFloat(e.target.value))}
                      className="w-full h-1 bg-luxury-gray-light rounded-lg appearance-none cursor-pointer accent-luxury-gold mb-6"
                    />

                    <div className="text-[10px] text-luxury-gray leading-relaxed text-center">
                      Note: Custom settings require 3 to 4 weeks of hand crafting and precision quality inspection at our Mumbai atelier.
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation button */}
              <div className="border-t border-luxury-gold/10 pt-6 mt-8 flex justify-between items-center">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-xs uppercase tracking-widest font-bold text-luxury-gray hover:text-luxury-black transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    Next Step <ArrowRight className="h-3 w-3" />
                  </button>
                ) : (
                  <button className="bg-luxury-gold text-luxury-black hover:bg-luxury-black hover:text-luxury-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all">
                    Send Inquiry
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
