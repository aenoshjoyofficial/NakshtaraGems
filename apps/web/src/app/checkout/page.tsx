"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, Truck, CreditCard, Sparkles, User, Phone, MapPin } from "lucide-react";

export default function CheckoutPage() {
  const { user, cart, placeOrder } = useApp();
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "netbanking">("card");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [placedOrderId, setPlacedOrderId] = React.useState("");

  // Redirect or prefill user details if logged in
  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
      }));
    }
  }, [user]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.03); // 3% GST
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const order = placeOrder({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      pincode: formData.pincode,
    });

    setPlacedOrderId(order.id);
    setSuccessMsg("Maison security clearance granted. Place Order success!");
    
    // Auto redirect to tracking page after 2.5 seconds
    setTimeout(() => {
      router.push(`/track-order?id=${order.id}`);
    }, 2500);
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="bg-luxury-white min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-sans">
          <ShieldCheck className="h-12 w-12 text-luxury-gold/60 mb-4 animate-pulse" />
          <h2 className="font-serif text-xl sm:text-2xl text-luxury-black mb-2 font-light">
            Secure Clearance Required
          </h2>
          <p className="text-xs text-luxury-gray max-w-sm mb-8 leading-relaxed">
            Only registered clients can purchase or checkout. Please sign in or register to access the showroom checkout vault.
          </p>
          <Link
            href="/login"
            className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
          >
            Access Client Portal
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (cart.length === 0 && !successMsg) {
    return (
      <>
        <Header />
        <main className="bg-luxury-white min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-sans">
          <h2 className="font-serif text-xl sm:text-2xl text-luxury-black mb-2 font-light">
            Your Jewellery Box is Empty
          </h2>
          <p className="text-xs text-luxury-gray max-w-sm mb-8 leading-relaxed">
            Please add some brilliant certified creations to your box before proceeding to secure checkout.
          </p>
          <Link
            href="/shop"
            className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
          >
            Browse showroom
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          {successMsg ? (
            <div className="border border-luxury-gold/25 p-12 bg-luxury-white text-center shadow-xl max-w-md mx-auto relative overflow-hidden">
              <Sparkles className="absolute top-6 right-6 h-6 w-6 text-luxury-gold/40 animate-pulse" />
              <ShieldCheck className="h-16 w-16 text-luxury-gold mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-luxury-black font-light mb-4">
                Clearance Granted
              </h2>
              <p className="text-xs text-luxury-gray leading-relaxed mb-6">
                Your order <strong className="text-luxury-black">{placedOrderId}</strong> has been secured. Handing over to Shiprocket FedEx partners for safe transport...
              </p>
              <div className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold animate-pulse">
                Redirecting to order tracking...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Checkout Form */}
              <div className="lg:col-span-7">
                <h2 className="font-serif text-2xl text-luxury-black font-light mb-6 uppercase tracking-wider">
                  Secure Delivery Info
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">
                        Client Full Name
                      </label>
                      <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-2 items-center">
                        <User className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="ENTER FULL NAME"
                          className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">
                        Contact Phone
                      </label>
                      <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-2 items-center">
                        <Phone className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="ENTER MOBILE NUMBER"
                          className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full tracking-wider focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">
                      Shipping Destination Address
                    </label>
                    <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-2 items-center">
                      <MapPin className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80 shrink-0" />
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="ENTER STREET ADDRESS, HOUSE NO, APARTMENT"
                        className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">
                      Postal Code / Pincode
                    </label>
                    <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-2 items-center">
                      <MapPin className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="ENTER 6 DIGIT PINCODE"
                        className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full tracking-wider focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Delivery Partner callout */}
                  <div className="border border-luxury-gold/15 bg-luxury-ivory/30 p-4 flex items-start gap-3">
                    <Truck className="h-5 w-5 text-luxury-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold tracking-widest uppercase text-luxury-black">
                        Shiprocket Secure Express
                      </h4>
                      <p className="text-[11px] text-luxury-gray leading-relaxed mt-1">
                        We partner with Shiprocket to offer fully-insured high-priority shipping. Transit route is monitored under armored custody and FedEx expert handlers.
                      </p>
                    </div>
                  </div>

                  {/* Mock Payment */}
                  <div className="pt-6">
                    <h3 className="font-serif text-lg text-luxury-black font-light mb-4 uppercase tracking-wider">
                      Atelier Billing Portal
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label
                        className={`border p-4 flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === "card"
                            ? "border-luxury-gold bg-luxury-ivory/20"
                            : "border-luxury-gold/10 hover:border-luxury-gold/30"
                        }`}
                      >
                        <span className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-luxury-black">
                          <CreditCard className="h-4 w-4 text-luxury-gold" /> Credit / Debit Card
                        </span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="h-4 w-4 accent-luxury-gold"
                        />
                      </label>
                      
                      <label
                        className={`border p-4 flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === "netbanking"
                            ? "border-luxury-gold bg-luxury-ivory/20"
                            : "border-luxury-gold/10 hover:border-luxury-gold/30"
                        }`}
                      >
                        <span className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-luxury-black">
                          <CreditCard className="h-4 w-4 text-luxury-gold" /> Net Banking
                        </span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "netbanking"}
                          onChange={() => setPaymentMethod("netbanking")}
                          className="h-4 w-4 accent-luxury-gold"
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black py-4 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Place Secure Order ({new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(total)})
                  </button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5 border-l border-luxury-gold/10 lg:pl-12">
                <h2 className="font-serif text-2xl text-luxury-black font-light mb-6 uppercase tracking-wider">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="h-16 w-16 relative bg-luxury-ivory/50 border border-luxury-gold/10 shrink-0">
                        <Image
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
                        <span className="text-[10px] text-luxury-gray block">
                          Qty: {item.quantity} • {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format(item.product.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-luxury-gold/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs uppercase tracking-wider text-luxury-gray">
                    <span>Subtotal</span>
                    <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-luxury-gray">
                    <span>Shipping Insurance</span>
                    <span className="text-luxury-gold uppercase tracking-widest font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-wider text-luxury-gray pb-4 border-b border-luxury-gold/5">
                    <span>3% GST Tax</span>
                    <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(tax)}</span>
                  </div>
                  <div className="flex justify-between font-serif text-base text-luxury-black font-semibold pt-2">
                    <span>TOTAL</span>
                    <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
