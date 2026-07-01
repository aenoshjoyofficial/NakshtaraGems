"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Gem } from "lucide-react";

import db from "@/mocks/db.json";

const ANNOUNCEMENT_TEXTS = db.announcements;

export function Header() {
  const [announcementIdx, setAnnouncementIdx] = React.useState(0);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENT_TEXTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-luxury-black text-luxury-white text-[10px] md:text-xs uppercase tracking-[0.25em] py-2.5 overflow-hidden text-center border-b border-luxury-gold/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={announcementIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="px-4"
          >
            {ANNOUNCEMENT_TEXTS[announcementIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Navigation */}
      <nav
        className={`w-full transition-all duration-500 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 luxury-glass shadow-sm py-4"
            : "relative py-6 bg-luxury-white/90"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Icon */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-luxury-black hover:text-luxury-gold transition-colors focus:outline-none"
                aria-label="Open Menu"
              >
                <Menu className="h-6 w-6 stroke-[1.25]" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 md:flex-initial text-center md:text-left">
              <Link href="/" className="inline-flex flex-col items-center">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase text-luxury-black font-light">
                  Nakshtara
                </span>
                <span className="text-[8px] md:text-[10px] tracking-[0.45em] uppercase text-luxury-gold font-medium mt-0.5">
                  Gems & Fine Jewellery
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-luxury-black/80">
              <div
                className="relative cursor-pointer py-2 hover:text-luxury-gold transition-colors"
                onMouseEnter={() => setActiveMenu("diamonds")}
              >
                <span className="flex items-center gap-1">
                  Diamonds <ChevronDown className="h-3 w-3 opacity-60" />
                </span>
              </div>

              <div
                className="relative cursor-pointer py-2 hover:text-luxury-gold transition-colors"
                onMouseEnter={() => setActiveMenu("jewellery")}
              >
                <span className="flex items-center gap-1">
                  Jewellery <ChevronDown className="h-3 w-3 opacity-60" />
                </span>
              </div>

              <Link href="/collections" className="hover:text-luxury-gold transition-colors py-2">
                Collections
              </Link>

              <Link href="/about" className="hover:text-luxury-gold transition-colors py-2">
                Heritage
              </Link>

              <Link href="/contact" className="hover:text-luxury-gold transition-colors py-2">
                Consultation
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6 text-luxury-black">
              <button className="hover:text-luxury-gold transition-colors" aria-label="Search">
                <Search className="h-5 w-5 stroke-[1.25]" />
              </button>
              <Link href="/wishlist" className="hover:text-luxury-gold transition-colors relative" aria-label="Wishlist">
                <Heart className="h-5 w-5 stroke-[1.25]" />
                <span className="absolute -top-1.5 -right-1.5 bg-luxury-gold text-luxury-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <button className="hover:text-luxury-gold transition-colors relative" aria-label="Cart">
                <ShoppingBag className="h-5 w-5 stroke-[1.25]" />
                <span className="absolute -top-1.5 -right-1.5 bg-luxury-black text-luxury-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <Link href="/login" className="hidden sm:inline-block hover:text-luxury-gold transition-colors" aria-label="Account">
                <User className="h-5 w-5 stroke-[1.25]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 w-full bg-luxury-white/95 border-b border-luxury-gold/15 shadow-xl z-40 py-10"
              onMouseEnter={() => setActiveMenu(activeMenu)}
            >
              <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
                {activeMenu === "diamonds" && (
                  <>
                    <div>
                      <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-black font-semibold mb-4 border-b border-luxury-gold/20 pb-2">
                        Shop By Shape
                      </h4>
                      <ul className="space-y-2.5 text-xs text-luxury-gray hover:text-luxury-black">
                        <li><Link href="/shop?shape=round" className="hover:text-luxury-gold transition-colors">Round Cut</Link></li>
                        <li><Link href="/shop?shape=oval" className="hover:text-luxury-gold transition-colors">Oval Cut</Link></li>
                        <li><Link href="/shop?shape=emerald" className="hover:text-luxury-gold transition-colors">Emerald Cut</Link></li>
                        <li><Link href="/shop?shape=pear" className="hover:text-luxury-gold transition-colors">Pear Cut</Link></li>
                        <li><Link href="/shop?shape=princess" className="hover:text-luxury-gold transition-colors">Princess Cut</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-black font-semibold mb-4 border-b border-luxury-gold/20 pb-2">
                        Diamond Education
                      </h4>
                      <ul className="space-y-2.5 text-xs text-luxury-gray">
                        <li><Link href="/blog/the-4-cs" className="hover:text-luxury-gold transition-colors">The 4 Cs of Diamonds</Link></li>
                        <li><Link href="/blog/gia-certification" className="hover:text-luxury-gold transition-colors">GIA Grading Guide</Link></li>
                        <li><Link href="/blog/conflict-free" className="hover:text-luxury-gold transition-colors">Ethical & Conflict-Free</Link></li>
                        <li><Link href="/blog/fancy-color" className="hover:text-luxury-gold transition-colors">Fancy Colored Diamonds</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-black font-semibold mb-4 border-b border-luxury-gold/20 pb-2">
                        Bespoke Services
                      </h4>
                      <ul className="space-y-2.5 text-xs text-luxury-gray">
                        <li><Link href="/custom" className="hover:text-luxury-gold transition-colors">Build Custom Ring</Link></li>
                        <li><Link href="/custom" className="hover:text-luxury-gold transition-colors">Build Custom Pendant</Link></li>
                        <li><Link href="/consultation" className="hover:text-luxury-gold transition-colors">Private Virtual Consultation</Link></li>
                      </ul>
                    </div>
                    <div className="bg-luxury-ivory p-6 border border-luxury-gold/10 rounded flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] tracking-widest uppercase text-luxury-gold font-semibold block mb-1">Exclusive</span>
                        <h5 className="font-serif text-base text-luxury-black font-medium mb-2">The Royal Solitaire</h5>
                        <p className="text-[11px] text-luxury-gray leading-relaxed mb-4">
                          Handpicked certified diamonds set in our signature premium platinum settings.
                        </p>
                      </div>
                      <Link href="/shop" className="text-xs uppercase tracking-wider font-semibold text-luxury-black hover:text-luxury-gold transition-colors flex items-center gap-1.5">
                        Explore <Gem className="h-3 w-3 text-luxury-gold" />
                      </Link>
                    </div>
                  </>
                )}

                {activeMenu === "jewellery" && (
                  <>
                    <div>
                      <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-black font-semibold mb-4 border-b border-luxury-gold/20 pb-2">
                        Fine Rings
                      </h4>
                      <ul className="space-y-2.5 text-xs text-luxury-gray">
                        <li><Link href="/shop?category=engagement" className="hover:text-luxury-gold transition-colors">Engagement Rings</Link></li>
                        <li><Link href="/shop?category=eternity" className="hover:text-luxury-gold transition-colors">Eternity Bands</Link></li>
                        <li><Link href="/shop?category=cocktail" className="hover:text-luxury-gold transition-colors">Cocktail Rings</Link></li>
                        <li><Link href="/shop?category=stackable" className="hover:text-luxury-gold transition-colors">Stackable Rings</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-black font-semibold mb-4 border-b border-luxury-gold/20 pb-2">
                        Necklaces & Pendants
                      </h4>
                      <ul className="space-y-2.5 text-xs text-luxury-gray">
                        <li><Link href="/shop?category=pendant" className="hover:text-luxury-gold transition-colors">Solitaire Pendants</Link></li>
                        <li><Link href="/shop?category=tennis-neck" className="hover:text-luxury-gold transition-colors">Tennis Necklaces</Link></li>
                        <li><Link href="/shop?category=choker" className="hover:text-luxury-gold transition-colors">Luxury Chokers</Link></li>
                        <li><Link href="/shop?category=gemstone" className="hover:text-luxury-gold transition-colors">Gemstone Necklaces</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-black font-semibold mb-4 border-b border-luxury-gold/20 pb-2">
                        Earrings & Bracelets
                      </h4>
                      <ul className="space-y-2.5 text-xs text-luxury-gray">
                        <li><Link href="/shop?category=studs" className="hover:text-luxury-gold transition-colors">Diamond Studs</Link></li>
                        <li><Link href="/shop?category=hoops" className="hover:text-luxury-gold transition-colors">Chandelier & Hoops</Link></li>
                        <li><Link href="/shop?category=tennis-brac" className="hover:text-luxury-gold transition-colors">Tennis Bracelets</Link></li>
                        <li><Link href="/shop?category=cuffs" className="hover:text-luxury-gold transition-colors">Bespoke Cuffs</Link></li>
                      </ul>
                    </div>
                    <div className="bg-luxury-ivory p-6 border border-luxury-gold/10 rounded flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] tracking-widest uppercase text-luxury-gold font-semibold block mb-1">New In</span>
                        <h5 className="font-serif text-base text-luxury-black font-medium mb-2">Constellation Earrings</h5>
                        <p className="text-[11px] text-luxury-gray leading-relaxed mb-4">
                          Inspired by high-fashion aesthetics and crafted to catch light from every angle.
                        </p>
                      </div>
                      <Link href="/shop" className="text-xs uppercase tracking-wider font-semibold text-luxury-black hover:text-luxury-gold transition-colors">
                        View Collection
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-black/60 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="w-4/5 max-w-sm h-full bg-luxury-white p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-4 mb-6">
                  <span className="font-serif text-lg tracking-widest uppercase text-luxury-black font-medium">
                    Menu
                  </span>
                  <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu">
                    <X className="h-6 w-6 text-luxury-black" />
                  </button>
                </div>
                <ul className="space-y-6 text-xs uppercase tracking-widest font-semibold text-luxury-black/90">
                  <li>
                    <button onClick={() => toggleMenu("diamonds-mob")} className="flex items-center justify-between w-full">
                      Diamonds <ChevronDown className="h-4 w-4" />
                    </button>
                  </li>
                  <li>
                    <button onClick={() => toggleMenu("jewellery-mob")} className="flex items-center justify-between w-full">
                      Jewellery <ChevronDown className="h-4 w-4" />
                    </button>
                  </li>
                  <li><Link href="/collections" onClick={() => setMobileMenuOpen(false)}>Collections</Link></li>
                  <li><Link href="/about" onClick={() => setMobileMenuOpen(false)}>Heritage</Link></li>
                  <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Consultation</Link></li>
                </ul>
              </div>
              <div className="border-t border-luxury-gold/20 pt-6">
                <Link href="/login" className="flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-luxury-black/90 mb-4" onClick={() => setMobileMenuOpen(false)}>
                  <User className="h-5 w-5 text-luxury-gold" /> My Account
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
