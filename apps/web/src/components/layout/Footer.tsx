"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static mockup behavior
  };

  return (
    <footer className="bg-luxury-black text-luxury-white/90 border-t border-luxury-gold/20 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <span className="font-serif text-lg tracking-[0.2em] uppercase text-luxury-white block mb-2">
              Nakshtara
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-luxury-gold block mb-6">
              Gems & Fine Jewellery
            </span>
            <p className="text-[11px] text-luxury-gray leading-relaxed mb-6">
              Crafting timeless luxury and hand-curated certified diamonds since 1998. Every gem is selected for its purity, fire, and brilliance.
            </p>
            <div className="text-[10px] tracking-widest text-luxury-gold uppercase border border-luxury-gold/30 px-3.5 py-1.5 inline-block rounded-none font-medium">
              GIA Certified • Ethical Sourcing
            </div>
          </div>

          {/* Customer Service Navigation */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-white font-medium mb-6 uppercase">
              Client Services
            </h4>
            <ul className="space-y-3.5 text-xs text-luxury-gray">
              <li><Link href="/contact" className="hover:text-luxury-gold transition-colors">Book a Consultation</Link></li>
              <li><Link href="/track-order" className="hover:text-luxury-gold transition-colors">Track Your Order</Link></li>
              <li><Link href="/shipping" className="hover:text-luxury-gold transition-colors">Shipping & Insurance</Link></li>
              <li><Link href="/returns" className="hover:text-luxury-gold transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-luxury-gold transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* About & Corporate Navigation */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-white font-medium mb-6 uppercase">
              The Maison
            </h4>
            <ul className="space-y-3.5 text-xs text-luxury-gray">
              <li><Link href="/about" className="hover:text-luxury-gold transition-colors">Our Story & Heritage</Link></li>
              <li><Link href="/blog" className="hover:text-luxury-gold transition-colors">The Diamond Journal</Link></li>
              <li><Link href="/brands" className="hover:text-luxury-gold transition-colors">Exclusive Partners</Link></li>
              <li><Link href="/privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-luxury-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-white font-medium mb-4 uppercase">
              Join the Newsletter
            </h4>
            <p className="text-[11px] text-luxury-gray leading-relaxed mb-6">
              Subscribe to receive private invitations to new collection launches, luxury previews, and bespoke diamond insights.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex border-b border-luxury-gold/40 focus-within:border-luxury-gold py-1 items-center">
                <Mail className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-transparent text-xs text-luxury-white placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
                  required
                />
                <button type="submit" className="hover:text-luxury-gold transition-colors" aria-label="Submit Email">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-charcoal pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-widest text-luxury-gray uppercase">
          <p>© {new Date().getFullYear()} NAKSHTARA GEMS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-luxury-white transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-luxury-white transition-colors">Pinterest</span>
            <span className="cursor-pointer hover:text-luxury-white transition-colors">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
