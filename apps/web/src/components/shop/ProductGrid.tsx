"use client";

import * as React from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/mocks/products";
import { Grid, List, HelpCircle } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  sortValue: string;
  onSortChange: (val: string) => void;
}

export function ProductGrid({ products, sortValue, onSortChange }: ProductGridProps) {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  return (
    <div className="flex-grow font-sans">
      {/* Top Bar Sort and Toggle View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-luxury-gold/15 pb-4 mb-8 gap-4">
        <span className="text-xs uppercase tracking-widest text-luxury-gray">
          Showing <span className="text-luxury-black font-semibold">{products.length}</span> Rare Pieces
        </span>

        <div className="flex items-center gap-4">
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest uppercase text-luxury-gray font-bold">Sort By</span>
            <select
              value={sortValue}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs text-luxury-black uppercase tracking-wider border-b border-luxury-gold/30 pb-1 focus:border-luxury-gold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Collections</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Client Favorites</option>
            </select>
          </div>

          {/* Grid/List Toggle */}
          <div className="hidden sm:flex items-center gap-2 border-l border-luxury-gold/20 pl-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 transition-colors cursor-pointer ${viewMode === "grid" ? "text-luxury-gold" : "text-luxury-gray hover:text-luxury-black"}`}
              aria-label="Grid View"
            >
              <Grid className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 transition-colors cursor-pointer ${viewMode === "list" ? "text-luxury-gold" : "text-luxury-gray hover:text-luxury-black"}`}
              aria-label="List View"
            >
              <List className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Empty Results */}
      {products.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-luxury-gold/15 bg-luxury-ivory/20 rounded flex flex-col items-center">
          <HelpCircle className="h-10 w-10 text-luxury-gold/40 mb-4" />
          <h3 className="font-serif text-lg text-luxury-black mb-2">No Matching Pieces Found</h3>
          <p className="text-xs text-luxury-gray max-w-sm leading-relaxed">
            We couldn’t find any creations matching your search parameters. Try resetting your filter preferences.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Custom List View Layout */}
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center border border-luxury-gold/10 hover:border-luxury-gold/30 bg-luxury-white p-5 gap-6 transition-all duration-300"
            >
              <div className="h-28 w-28 bg-luxury-ivory/50 flex items-center justify-center shrink-0">
                <span className="text-[10px] tracking-widest uppercase text-luxury-gold font-bold">
                  {product.category}
                </span>
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-serif text-lg text-luxury-black font-light mb-1.5">{product.name}</h3>
                <p className="text-xs text-luxury-gray mb-3">
                  {product.category === "diamond"
                    ? `Cert: ${product.certificate} • Shape: ${product.shape} • Carat: ${product.carat}ct • Clarity: ${product.clarity}`
                    : `Metal: ${product.metal} • Collection: ${product.collection}`}
                </p>
                <span className="font-sans text-sm font-semibold text-luxury-black">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </span>
              </div>
              <a
                href={`/shop/${product.id}`}
                className="text-[10px] uppercase tracking-widest font-bold text-luxury-white bg-luxury-black hover:bg-luxury-gold hover:text-luxury-black px-6 py-2.5 transition-colors"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
