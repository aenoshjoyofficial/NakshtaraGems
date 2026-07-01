"use client";

import * as React from "react";
import { ChevronDown, SlidersHorizontal, RotateCcw } from "lucide-react";

export interface FilterState {
  category: "all" | "diamond" | "jewellery";
  shape: string[];
  caratMin: number;
  caratMax: number;
  priceMax: number;
  metal: string[];
  cut: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const shapes = ["Round", "Oval", "Emerald", "Pear", "Princess"];
  const metals = ["Platinum", "18k White Gold", "18k Yellow Gold", "18k Rose Gold"];
  const cuts = ["Ideal", "Excellent", "Very Good"];

  const toggleShape = (shape: string) => {
    const nextShapes = filters.shape.includes(shape)
      ? filters.shape.filter((s) => s !== shape)
      : [...filters.shape, shape];
    onChange({ ...filters, shape: nextShapes });
  };

  const toggleMetal = (metal: string) => {
    const nextMetals = filters.metal.includes(metal)
      ? filters.metal.filter((m) => m !== metal)
      : [...filters.metal, metal];
    onChange({ ...filters, metal: nextMetals });
  };

  const toggleCut = (cut: string) => {
    const nextCuts = filters.cut.includes(cut)
      ? filters.cut.filter((c) => c !== cut)
      : [...filters.cut, cut];
    onChange({ ...filters, cut: nextCuts });
  };

  return (
    <aside className="w-full lg:w-72 bg-luxury-white border border-luxury-gold/10 p-6 font-sans">
      <div className="flex items-center justify-between border-b border-luxury-gold/15 pb-4 mb-6">
        <div className="flex items-center gap-2 font-serif text-base text-luxury-black font-semibold uppercase tracking-wider">
          <SlidersHorizontal className="h-4.5 w-4.5 text-luxury-gold" /> Filter By
        </div>
        <button
          onClick={onReset}
          className="text-[10px] tracking-widest uppercase font-bold text-luxury-gray hover:text-luxury-black transition-colors flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Category Filter */}
        <div>
          <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-4">Category</h4>
          <div className="flex flex-col gap-2.5">
            {["all", "diamond", "jewellery"].map((cat) => (
              <label key={cat} className="flex items-center gap-3 text-xs uppercase tracking-wider text-luxury-gray hover:text-luxury-black cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => onChange({ ...filters, category: cat as any })}
                  className="h-4 w-4 border-luxury-gold/30 text-luxury-gold focus:ring-luxury-gold"
                />
                {cat === "all" ? "All Showroom" : cat === "diamond" ? "Loose Diamonds" : "Fine Jewellery"}
              </label>
            ))}
          </div>
        </div>

        {/* Diamond Specific Shapes */}
        {(filters.category === "all" || filters.category === "diamond") && (
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-4">Diamond Shape</h4>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((shape) => {
                const isActive = filters.shape.includes(shape);
                return (
                  <button
                    key={shape}
                    onClick={() => toggleShape(shape)}
                    className={`py-2 text-[10px] uppercase tracking-wider text-center border font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-luxury-black text-luxury-white border-luxury-black"
                        : "bg-transparent text-luxury-gray border-luxury-gray-light hover:border-luxury-gold hover:text-luxury-black"
                    }`}
                  >
                    {shape}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Price Range */}
        <div>
          <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-3.5">
            Max Price: ${filters.priceMax.toLocaleString()}
          </h4>
          <input
            type="range"
            min="1000"
            max="30000"
            step="1000"
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: parseInt(e.target.value) })}
            className="w-full h-1 bg-luxury-gray-light rounded-lg appearance-none cursor-pointer accent-luxury-gold"
          />
        </div>

        {/* Carat weight selection */}
        {(filters.category === "all" || filters.category === "diamond") && (
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-3">Carat Range</h4>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0.5"
                max="5"
                step="0.1"
                value={filters.caratMin}
                onChange={(e) => onChange({ ...filters, caratMin: parseFloat(e.target.value) })}
                className="w-full bg-transparent border border-luxury-gray-light p-2 text-xs text-center focus:border-luxury-gold focus:outline-none"
              />
              <span className="text-luxury-gray text-xs">to</span>
              <input
                type="number"
                min="0.5"
                max="5"
                step="0.1"
                value={filters.caratMax}
                onChange={(e) => onChange({ ...filters, caratMax: parseFloat(e.target.value) })}
                className="w-full bg-transparent border border-luxury-gray-light p-2 text-xs text-center focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Cut Quality */}
        {(filters.category === "all" || filters.category === "diamond") && (
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-4">Cut Quality</h4>
            <div className="flex flex-col gap-2.5">
              {cuts.map((cut) => (
                <label key={cut} className="flex items-center gap-3 text-xs text-luxury-gray hover:text-luxury-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.cut.includes(cut)}
                    onChange={() => toggleCut(cut)}
                    className="h-4 w-4 border-luxury-gold/30 text-luxury-gold focus:ring-luxury-gold"
                  />
                  {cut}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Metal Option for jewellery */}
        {(filters.category === "all" || filters.category === "jewellery") && (
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-4">Metal Composition</h4>
            <div className="flex flex-col gap-2.5">
              {metals.map((metal) => (
                <label key={metal} className="flex items-center gap-3 text-xs text-luxury-gray hover:text-luxury-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.metal.includes(metal)}
                    onChange={() => toggleMetal(metal)}
                    className="h-4 w-4 border-luxury-gold/30 text-luxury-gold focus:ring-luxury-gold"
                  />
                  {metal}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
