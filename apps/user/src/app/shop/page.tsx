"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FilterSidebar, FilterState } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import type { Product } from "@/types/product";
import { Search, RotateCcw } from "lucide-react";

const INITIAL_FILTERS: FilterState = {
  category: "all",
  shape: [],
  caratMin: 0.5,
  caratMax: 5.0,
  priceMax: 75000,
  metal: [],
  cut: [],
};

function ShopContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<FilterState>(INITIAL_FILTERS);
  const [sortValue, setSortValue] = React.useState("featured");
  const [products, setProducts] = React.useState<Product[]>([]);

  // Fetch dynamic products at runtime
  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading fresh shop catalog:", err));
  }, []);

  // Sync filters with URL search parameters
  React.useEffect(() => {
    const categoryParam = searchParams.get("category");
    const shapeParam = searchParams.get("shape");
    const metalParam = searchParams.get("metal");

    setFilters((prev) => ({
      ...prev,
      category: (categoryParam as any) || "all",
      shape: shapeParam ? [shapeParam] : prev.shape,
      metal: metalParam ? [metalParam] : prev.metal,
    }));
  }, [searchParams]);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery("");
  };

  // Filter products based on search query and current filter state
  const filteredProducts = React.useMemo(() => {
    let result = products.filter((p) => !p.draft);

    // Search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    // Category
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Shapes
    if (filters.shape.length > 0) {
      result = result.filter((p) => p.shape && filters.shape.includes(p.shape));
    }

    // Price Max
    result = result.filter((p) => p.price <= filters.priceMax);

    // Carat Range
    if (filters.category === "diamond" || filters.category === "all") {
      result = result.filter((p) => {
        if (p.category !== "diamond") return true; // Keep jewellery if in all view
        return p.carat !== undefined && p.carat >= filters.caratMin && p.carat <= filters.caratMax;
      });
    }

    // Cuts
    if (filters.cut.length > 0) {
      result = result.filter((p) => {
        if (p.category !== "diamond") return true;
        return p.cut && filters.cut.includes(p.cut);
      });
    }

    // Metals
    if (filters.metal.length > 0) {
      result = result.filter((p) => {
        if (p.category !== "jewellery") return true;
        return p.metal && filters.metal.includes(p.metal);
      });
    }

    // Sorting
    if (sortValue === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortValue === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, filters, sortValue]);

  return (
    <>
      <Header />

      <main className="flex-grow bg-luxury-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Description */}
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-2">
              Virtual Showroom
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Explore Our Creations
            </h1>
            <p className="text-xs text-luxury-gray max-w-xl mx-auto leading-relaxed">
              Browse our inventory of conflict-free GIA-certified diamonds and handcrafted jewellery. Use the filter panel below to narrow search criteria.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="max-w-md mx-auto mb-10 relative">
            <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-2.5 items-center">
              <Search className="h-5 w-5 text-luxury-gold mr-3 opacity-80" />
              <input
                type="text"
                placeholder="Search rings, solitaire pendants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-xs text-luxury-gray hover:text-luxury-black">
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Main Layout Area */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Sidebar filters */}
            <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} products={products} />

            {/* Right Product Grid results */}
            <ProductGrid products={filteredProducts} sortValue={sortValue} onSortChange={setSortValue} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-luxury-white flex items-center justify-center font-serif text-luxury-gold uppercase tracking-widest text-xs">Loading Showroom...</div>}>
      <ShopContent />
    </Suspense>
  );
}
