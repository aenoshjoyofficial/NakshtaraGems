"use client";

import * as React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Gem } from "lucide-react";

import { useApp } from "@/context/AppContext";
import { Plus, Minus, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";

export function Header() {
  const { user, cart, wishlist, removeFromCart, updateCartQuantity, logout } = useApp();
  const [announcementIdx, setAnnouncementIdx] = React.useState(0);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const [headerData, setHeaderData] = React.useState<any>({});
  const [announcementTexts, setAnnouncementTexts] = React.useState<string[]>([]);

  // Interactivity States
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);

  const [gstRate, setGstRate] = React.useState(3);
  const [searchProducts, setSearchProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.header && Object.keys(data.header).length > 0) setHeaderData(data.header);
          if (data.announcements && data.announcements.length > 0) setAnnouncementTexts(data.announcements);
          if (data.officialSettings) setGstRate(data.officialSettings.gstRate ?? 3);
          if (data.products) setSearchProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading fresh database:", err));
  }, []);

  React.useEffect(() => {
    if (announcementTexts.length === 0) return;
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcementTexts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcementTexts]);

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
            {announcementTexts[announcementIdx]}
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
              <Link href="/" className="inline-flex items-center">
                <NextImage
                  src={headerData?.logo || "/logo.png"}
                  alt={headerData?.brandName || "Nakshatra Gems & Jewelry"}
                  width={160}
                  height={50}
                  className="h-10 w-auto object-contain mix-blend-multiply"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-luxury-black/80">
              {((headerData as any).navLinks || []).map((item: any) => {
                if (item.dropdown) {
                  return (
                    <div
                      key={item.id}
                      className="relative cursor-pointer py-2 hover:text-luxury-gold transition-colors"
                      onMouseEnter={() => setActiveMenu(item.id)}
                    >
                      <span className="flex items-center gap-1">
                        {item.label} <ChevronDown className="h-3 w-3 opacity-60" />
                      </span>
                    </div>
                  );
                }
                return (
                  <Link key={item.id} href={item.href || "#"} className="hover:text-luxury-gold transition-colors py-2">
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6 text-luxury-black">
              <button onClick={() => setIsSearchOpen(true)} className="hover:text-luxury-gold transition-colors cursor-pointer" aria-label="Search">
                <Search className="h-5 w-5 stroke-[1.25]" />
              </button>
              <Link href="/wishlist" className="hover:text-luxury-gold transition-colors relative" aria-label="Wishlist">
                <Heart className="h-5 w-5 stroke-[1.25]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-luxury-gold text-luxury-black text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsCartOpen(true)} className="hover:text-luxury-gold transition-colors relative cursor-pointer" aria-label="Cart">
                <ShoppingBag className="h-5 w-5 stroke-[1.25]" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-luxury-black text-luxury-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-1.5 focus:outline-none hover:text-luxury-gold transition-colors cursor-pointer"
                    aria-label="User Menu"
                  >
                    <div className="h-7 w-7 rounded-full overflow-hidden relative border border-luxury-gold/20 shrink-0">
                      <img
                        src={user.image || "/avatar.png"}
                        alt="User Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <ChevronDown className={`h-3 w-3 stroke-[2] transition-transform duration-300 ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <React.Fragment>
                        {/* Backdrop to close dropdown on click outside */}
                        <div className="fixed inset-0 z-10" onClick={() => setIsUserDropdownOpen(false)} />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2.5 w-44 bg-luxury-white border border-luxury-gold/15 shadow-xl py-2 z-20 font-sans"
                        >
                          <div className="px-4 py-2 border-b border-luxury-gold/5 mb-1.5">
                            <p className="text-[10px] text-luxury-gray uppercase tracking-widest block font-medium">Welcome,</p>
                            <p className="text-xs text-luxury-black font-semibold truncate uppercase tracking-wider">{user.name.split(" ")[0]}</p>
                          </div>
                          
                          <Link
                            href="/dashboard"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="block px-4 py-2 text-xs text-luxury-gray hover:text-luxury-black hover:bg-luxury-ivory/20 transition-all uppercase tracking-wider font-semibold"
                          >
                            Dashboard
                          </Link>
                          
                          <Link
                            href="/track-order"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="block px-4 py-2 text-xs text-luxury-gray hover:text-luxury-black hover:bg-luxury-ivory/20 transition-all uppercase tracking-wider font-semibold"
                          >
                            Track Order
                          </Link>
                          
                          <button
                            onClick={() => {
                              setIsUserDropdownOpen(false);
                              logout();
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-luxury-ruby hover:bg-luxury-ivory/20 transition-all uppercase tracking-wider font-semibold border-t border-luxury-gold/5 mt-1.5 pt-2 cursor-pointer"
                          >
                            Logout
                          </button>
                        </motion.div>
                      </React.Fragment>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="hidden sm:inline-block hover:text-luxury-gold transition-colors" aria-label="Account">
                  <User className="h-5 w-5 stroke-[1.25]" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeMenu && (() => {
            const activeLink = ((headerData as any).navLinks || []).find((item: any) => item.id === activeMenu);
            if (!activeLink || !activeLink.dropdown) return null;

            const dropdown = activeLink.dropdown;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 w-full bg-luxury-white/95 border-b border-luxury-gold/15 shadow-xl z-40 py-10"
                onMouseEnter={() => setActiveMenu(activeMenu)}
              >
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
                  {(dropdown.columns || []).map((col: any, colIdx: number) => (
                    <div key={colIdx}>
                      <h4 className="font-serif text-sm tracking-[0.1em] text-luxury-black font-semibold mb-4 border-b border-luxury-gold/20 pb-2">
                        {col.title}
                      </h4>
                      <ul className="space-y-2.5 text-xs text-luxury-gray">
                        {(col.links || []).map((lnk: any, lnkIdx: number) => (
                          <li key={lnkIdx}>
                            <Link href={lnk.href || "#"} className="hover:text-luxury-gold transition-colors">
                              {lnk.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {dropdown.featuredCard && (
                    <div className="bg-luxury-ivory p-6 border border-luxury-gold/10 rounded flex flex-col justify-between">
                      <div>
                        {dropdown.featuredCard.tag && (
                          <span className="text-[9px] tracking-widest uppercase text-luxury-gold font-semibold block mb-1">
                            {dropdown.featuredCard.tag}
                          </span>
                        )}
                        <h5 className="font-serif text-base text-luxury-black font-medium mb-2">
                          {dropdown.featuredCard.title}
                        </h5>
                        <p className="text-[11px] text-luxury-gray leading-relaxed mb-4">
                          {dropdown.featuredCard.desc}
                        </p>
                      </div>
                      <Link href={dropdown.featuredCard.link || "#"} className="text-xs uppercase tracking-wider font-semibold text-luxury-black hover:text-luxury-gold transition-colors flex items-center gap-1.5">
                        Explore <Gem className="h-3 w-3 text-luxury-gold" />
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })()}
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
                  {((headerData as any).navLinks || []).map((item: any) => {
                    if (item.dropdown) {
                      return (
                        <li key={item.id}>
                          <button onClick={() => toggleMenu(`${item.id}-mob`)} className="flex items-center justify-between w-full">
                            {item.label} <ChevronDown className="h-4 w-4" />
                          </button>
                          {/* Render mobile sub-menu items if open */}
                          {activeMenu === `${item.id}-mob` && (
                            <ul className="pl-4 mt-3 space-y-3.5 text-[10px] text-luxury-gray lowercase">
                              {(item.dropdown.columns || []).flatMap((col: any) => col.links || []).map((lnk: any, lnkIdx: number) => (
                                <li key={lnkIdx}>
                                  <Link
                                    href={lnk.href || "#"}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setActiveMenu(null);
                                    }}
                                    className="hover:text-luxury-gold transition-colors block"
                                  >
                                    {lnk.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    }
                    return (
                      <li key={item.id}>
                        <Link href={item.href || "#"} onClick={() => setMobileMenuOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
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

      {/* Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-white/95 backdrop-blur-md z-[100] flex flex-col p-6 md:p-20 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-luxury-black hover:text-luxury-gold transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold cursor-pointer"
                >
                  Close <X className="h-5 w-5" />
                </button>
              </div>

              {/* Input */}
              <div className="border-b border-luxury-gold/30 focus-within:border-luxury-gold py-4 flex items-center mb-10">
                <Search className="h-8 w-8 text-luxury-gold mr-4" />
                <input
                  type="text"
                  placeholder="SEARCH THE MAISON'S VAULTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xl sm:text-3xl font-serif text-luxury-black placeholder-luxury-gray/40 w-full uppercase tracking-wider focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Instant Results */}
              {searchQuery.trim() !== "" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      href={`/shop/${p.id}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-4 p-3 border border-luxury-gold/5 bg-luxury-ivory/30 hover:border-luxury-gold/25 transition-all duration-300 group"
                    >
                      <div className="h-16 w-16 relative bg-luxury-white shrink-0">
                        <NextImage
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs text-luxury-black font-light group-hover:text-luxury-gold transition-colors duration-300">
                          {p.name}
                        </h4>
                        <span className="text-[10px] text-luxury-gray">
                          {p.category === "diamond" ? "Loose Diamond" : p.category === "gemstone" ? p.gemType : "Fine Jewellery"}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {searchProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <p className="text-xs uppercase tracking-widest text-luxury-gray col-span-2 text-center py-8">
                      No matching creations found
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Side Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-black/60 z-[100] backdrop-blur-sm"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-luxury-white shadow-2xl flex flex-col justify-between p-6 z-10 border-l border-luxury-gold/10"
            >
              <div>
                <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-4 mb-6">
                  <span className="font-serif text-lg tracking-widest uppercase text-luxury-black font-medium">
                    Your Jewellery Box ({cart.reduce((t, i) => t + i.quantity, 0)})
                  </span>
                  <button onClick={() => setIsCartOpen(false)} aria-label="Close Cart" className="cursor-pointer">
                    <X className="h-6 w-6 text-luxury-black hover:text-luxury-gold transition-colors" />
                  </button>
                </div>

                {/* Cart Items list */}
                {cart.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center">
                    <Gem className="h-10 w-10 text-luxury-gold/30 mb-4 animate-pulse" />
                    <p className="text-xs uppercase tracking-widest text-luxury-gray mb-6">
                      Your Jewellery Box is Empty
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      Browse Showroom
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 p-3 border border-luxury-gold/5 bg-luxury-ivory/20"
                      >
                        <div className="h-16 w-16 relative bg-luxury-white shrink-0 border border-luxury-gold/10">
                          <NextImage
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-serif text-xs text-luxury-black font-light line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-luxury-gray block mb-2">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            }).format(item.product.price)}
                          </span>
                          
                          {/* Quantity selector */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 border border-luxury-gold/10 hover:border-luxury-gold hover:text-luxury-gold transition-all cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-semibold px-2">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 border border-luxury-gold/10 hover:border-luxury-gold hover:text-luxury-gold transition-all cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-luxury-gray hover:text-luxury-ruby p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Totals & Checkout button */}
              {cart.length > 0 && (
                <div className="border-t border-luxury-gold/20 pt-6">
                  <div className="flex justify-between text-xs uppercase tracking-wider text-luxury-gray mb-2">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-luxury-gray mb-4">
                    <span>Est. Taxes ({gstRate}% GST)</span>
                    <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(Math.round(cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * (gstRate / 100)))}
                    </span>
                  </div>
                  <div className="flex justify-between font-serif text-base text-luxury-black font-semibold border-t border-luxury-gold/10 pt-4 mb-6">
                    <span>TOTAL</span>
                    <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(
                        cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) +
                        Math.round(cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * (gstRate / 100))
                      )}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block text-center bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black py-4 text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

