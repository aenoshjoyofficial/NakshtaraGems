"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Product } from "@/types/product";
import { useApp } from "@/context/AppContext";
import { ArrowLeft, Shield, Truck, Sparkles, PhoneCall, Heart, ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const [products, setProducts] = React.useState<Product[]>([]);

  // Gallery state
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(false);
  const [zoomOpen, setZoomOpen] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading fresh catalog:", err));
  }, []);

  React.useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setActiveIndex(0);
      setShowVideo(false);
    }
  }, [id, products]);

  const similarProducts = React.useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id && !p.draft)
      .slice(0, 4);
  }, [product, products]);

  // Build gallery items: only uploaded images + optional video
  const galleryImages = React.useMemo(() => {
    if (!product) return [];
    const imgs: string[] = [];
    if (product.image) imgs.push(product.image);
    if (product.images && Array.isArray(product.images)) {
      for (const img of product.images) {
        if (img && typeof img === "string" && img.trim() !== "" && !imgs.includes(img)) {
          imgs.push(img);
        }
      }
    }
    return imgs;
  }, [product]);

  const hasVideo = React.useMemo(() => {
    return !!(product?.video && typeof product.video === "string" && product.video.trim() !== "");
  }, [product]);

  // Total gallery items: images + 1 video slot (if video exists)
  const totalSlots = galleryImages.length + (hasVideo ? 1 : 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryLabel = () => {
    if (!product) return "";
    if (product.category === "diamond") return "Loose Diamond";
    if (product.category === "gemstone") return product.gemType || "Gemstone";
    return product.collection || "Fine Jewellery";
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-luxury-white">
          <p className="text-sm font-sans tracking-widest text-luxury-gray mb-4 uppercase">
            Searching the Maison's vaults...
          </p>
          <Link href="/shop" className="text-xs uppercase tracking-widest text-luxury-gold hover:text-luxury-black transition-colors font-bold">
            Back to Showroom
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-gray hover:text-luxury-black transition-colors font-bold mb-10"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Showroom
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery Section */}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              {totalSlots > 1 && (
                <div className="flex sm:flex-col gap-2 sm:w-20 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px] shrink-0">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={`img-${idx}`}
                      onClick={() => { setActiveIndex(idx); setShowVideo(false); }}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 border-2 transition-all cursor-pointer overflow-hidden ${
                        !showVideo && activeIndex === idx
                          ? "border-luxury-gold"
                          : "border-luxury-gold/10 hover:border-luxury-gold/40"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </button>
                  ))}
                  {hasVideo && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 border-2 transition-all cursor-pointer overflow-hidden ${
                        showVideo
                          ? "border-luxury-gold"
                          : "border-luxury-gold/10 hover:border-luxury-gold/40"
                      }`}
                    >
                      <div className="absolute inset-0 bg-luxury-black/80 flex items-center justify-center">
                        <Play className="h-5 w-5 text-luxury-gold" />
                      </div>
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[7px] text-luxury-white font-bold uppercase">
                        Video
                      </span>
                    </button>
                  )}
                </div>
              )}

              {/* Main Display */}
              <div className="relative flex-1 bg-luxury-ivory/40 border border-luxury-gold/10 min-h-[400px] sm:min-h-[500px] overflow-hidden group">
                <Sparkles className="absolute top-4 left-4 h-5 w-5 text-luxury-gold/40 animate-pulse z-10" />
                <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase text-luxury-white bg-luxury-black/70 backdrop-blur-sm font-semibold px-3 py-1.5 z-10">
                  {getCategoryLabel()}
                </span>

                {!product.inStock && (
                  <span className="absolute bottom-4 right-4 bg-luxury-ruby text-luxury-white text-[9px] uppercase tracking-widest font-semibold px-3 py-1.5 z-10">
                    Bespoke Order Only
                  </span>
                )}

                {/* Navigation arrows (only if multiple images and not showing video) */}
                {!showVideo && galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-luxury-white/80 hover:bg-luxury-white border border-luxury-gold/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5 text-luxury-black" />
                    </button>
                    <button
                      onClick={() => setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-luxury-white/80 hover:bg-luxury-white border border-luxury-gold/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5 text-luxury-black" />
                    </button>
                  </>
                )}

                {/* Zoom button */}
                {!showVideo && (
                  <button
                    onClick={() => setZoomOpen(true)}
                    className="absolute bottom-4 left-4 z-20 bg-luxury-white/80 hover:bg-luxury-white border border-luxury-gold/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="h-4 w-4 text-luxury-black" />
                  </button>
                )}

                {showVideo && hasVideo ? (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <video
                      src={product.video!}
                      controls
                      autoPlay
                      className="max-w-full max-h-[450px] object-contain"
                    >
                      Your browser does not support video playback.
                    </video>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-6 relative">
                    <Image
                      src={galleryImages[activeIndex] || product.image}
                      alt={`${product.name} - Image ${activeIndex + 1}`}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}

                {/* Image counter */}
                {!showVideo && galleryImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-luxury-black/60 backdrop-blur-sm text-luxury-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5">
                    {activeIndex + 1} / {galleryImages.length}
                  </div>
                )}
              </div>
            </div>

            {/* Specifications Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-semibold block mb-2">
                  {product.category === "gemstone" ? "Precious Gemstones" : "Fine Jewelry & Solitaires"}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl text-luxury-black font-light tracking-wide mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  <span className="font-sans text-xl font-bold text-luxury-black">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase bg-luxury-beige/50 text-luxury-gray px-2.5 py-1">
                    GST Included
                  </span>
                </div>

                <p className="text-xs text-luxury-gray leading-relaxed mb-8 border-b border-luxury-gold/10 pb-6">
                  {product.description || "Hand-selected for its pristine characteristics and curated by our master in-house gemologists. Each piece comes certified with a lifetime authenticity warranty and complimentary premium presentation packaging."}
                </p>

                {/* Dynamic specs based on product type */}
                <div className="mb-8">
                  <h3 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-4">
                    Product Details & Certification
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.category === "diamond" ? (
                      <>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Carat Weight</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.carat} Carats</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Cut Grade</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.cut}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Color Grade</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.color}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Clarity Grade</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.clarity}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3 col-span-2">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Grading Lab Certificate</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.certificate} Certified</span>
                        </div>
                      </>
                    ) : product.category === "gemstone" ? (
                      <>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Gemstone Type</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.gemType}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Carat Weight</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.carat} Carats</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Shape</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.shape}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Origin</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.origin}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Treatment</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.treatment}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Lab Certificate</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.certificate} Certified</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Metal Setting</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.metal}</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Collection</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.collection} Collection</span>
                        </div>
                        <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-3 col-span-2">
                          <span className="text-[9px] uppercase text-luxury-gray block mb-1">Purity Certification</span>
                          <span className="text-xs font-semibold text-luxury-black font-sans">{product.certificate || "BIS Hallmark"} Certified Gold</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Box */}
              <div className="border-t border-luxury-gold/10 pt-6">
                {product.inStock ? (
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button
                      onClick={() => {
                        const result = addToCart(product, quantity);
                        if (!result.success) {
                          alert(result.message);
                        } else {
                          alert(result.message);
                        }
                      }}
                      className="flex-1 bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black py-3.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Add to Jewellery Box
                    </button>
                    <button
                      onClick={() => {
                        const result = toggleWishlist(product.id);
                        if (!result.success) {
                          alert(result.message);
                        }
                      }}
                      className="border border-luxury-gold/30 hover:border-luxury-gold px-6 py-3.5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-luxury-black hover:text-luxury-gold transition-colors font-bold cursor-pointer"
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-luxury-ruby text-luxury-ruby" : ""}`} /> Wishlist
                    </button>
                  </div>
                ) : (
                  <div className="mb-6">
                    <button className="w-full border border-luxury-gold bg-transparent text-luxury-black hover:bg-luxury-black hover:text-luxury-white py-3.5 text-xs font-bold uppercase tracking-widest transition-all">
                      Request Custom Recreation
                    </button>
                  </div>
                )}

                {/* Additional Trust Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-luxury-gold/5 pt-6 text-[10px] uppercase tracking-wider text-luxury-gray font-medium">
                  <div className="flex items-center gap-2.5">
                    <Truck className="h-4 w-4 text-luxury-gold shrink-0" />
                    <span>Free Insured Shipping & Return</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Shield className="h-4 w-4 text-luxury-gold shrink-0" />
                    <span>100% Authenticity Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:col-span-2 cursor-pointer hover:text-luxury-gold transition-colors pt-2">
                    <PhoneCall className="h-4 w-4 text-luxury-gold shrink-0" />
                    <span>Discuss details with a consultant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-luxury-gold/10">
              <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-2">
                  Curated Suggestions
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-luxury-black">
                  Similar Creations
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Full-Screen Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[200] bg-luxury-black/90 backdrop-blur-sm flex items-center justify-center cursor-pointer"
          onClick={() => setZoomOpen(false)}
        >
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute top-6 right-6 text-luxury-white hover:text-luxury-gold transition-colors z-10 cursor-pointer"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-[90vw] h-[90vh] max-w-5xl">
            <Image
              src={galleryImages[activeIndex] || product.image}
              alt={`${product.name} - Zoomed`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
