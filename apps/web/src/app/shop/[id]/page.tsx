"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MOCK_PRODUCTS, Product } from "@/mocks/products";
import { ArrowLeft, Shield, Truck, Sparkles, PhoneCall, Heart } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    const found = MOCK_PRODUCTS.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    }
  }, [id]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
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
            {/* Image Preview Block */}
            <div className="bg-luxury-ivory/40 border border-luxury-gold/10 p-12 flex flex-col items-center justify-center min-h-[450px] relative">
              <Sparkles className="absolute top-6 left-6 h-6 w-6 text-luxury-gold/40 animate-pulse" />
              <div className="text-center">
                <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold font-bold block mb-4">
                  {product.category === "diamond" ? "Loose Diamond" : product.collection}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-luxury-black font-light leading-relaxed max-w-md mx-auto">
                  {product.name}
                </h2>
              </div>
              {!product.inStock && (
                <span className="absolute bottom-6 right-6 bg-luxury-ruby text-luxury-white text-[9px] uppercase tracking-widest font-semibold px-3 py-1.5">
                  Bespoke Order Only
                </span>
              )}
            </div>

            {/* Specifications Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-semibold block mb-2">
                  Fine Jewelry & Solitaires
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
                  Hand-selected for its pristine characteristics and curated by our master in-house gemologists. Each piece comes certified with a lifetime authenticity warranty and complimentary premium presentation packaging.
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
                          <span className="text-xs font-semibold text-luxury-black font-sans">BIS Hallmark Certified Gold</span>
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
                    <button className="flex-1 bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black py-3.5 text-xs font-bold uppercase tracking-widest transition-all">
                      Add to Jewellery Box
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="border border-luxury-gold/30 hover:border-luxury-gold px-6 py-3.5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-luxury-black hover:text-luxury-gold transition-colors font-bold"
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
        </div>
      </main>
      <Footer />
    </>
  );
}
