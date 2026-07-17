"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, Truck, CreditCard, Sparkles, User, Phone, MapPin, Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { signIn } from "next-auth/react";

export default function CheckoutPage() {
  const { user, cart, placeOrder, clearCart } = useApp();
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

  // Auth modal states for guest user
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authTab, setAuthTab] = React.useState<"signup" | "signin">("signup");
  const [showPassword, setShowPassword] = React.useState(false);
  const [authFormData, setAuthFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [authError, setAuthError] = React.useState("");

  // Redirect or prefill user details if logged in
  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
      }));
    }
  }, [user]);

  const [gstRate, setGstRate] = React.useState(3);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.officialSettings) {
          setGstRate(data.officialSettings.gstRate ?? 3);
        }
      })
      .catch((err) => console.error("Error loading official settings:", err));

    // Dynamically append Razorpay checkout script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * (gstRate / 100)); // Dynamic GST
  const total = subtotal + tax;

  const initiateRazorpayPayment = async (customerName: string) => {
    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const orderData = await res.json();
      if (!res.ok || orderData.error) {
        alert("Failed to initiate checkout session. Please try again.");
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Nakshatra Gems",
        description: "Secure Maison Checkout",
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.order_id,
                razorpay_payment_id: response.payment_id,
                razorpay_signature: response.signature,
                orderDetails: {
                  id: `NS-${Math.floor(100000 + Math.random() * 900000)}`,
                  date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                  shippingDetails: {
                    name: customerName,
                    phone: formData.phone,
                    address: formData.address,
                    pincode: formData.pincode,
                  },
                  items: cart,
                }
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setPlacedOrderId(verifyData.order.id);
              setSuccessMsg("Payment verified. Order successfully registered to the Maison vault!");
              clearCart();
              setTimeout(() => {
                router.push(`/track-order?id=${verifyData.order.id}`);
              }, 2500);
            } else {
              alert("Payment signature verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification callback error:", err);
          }
        },
        prefill: {
          name: customerName,
          email: user?.email || authFormData.email || "",
          contact: formData.phone,
        },
        theme: {
          color: "#C5A059",
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay initiation error:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    initiateRazorpayPayment(formData.name || user.name);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    let loggedInName = authFormData.name;

    if (authTab === "signin") {
      const res = await signIn("credentials", {
        redirect: false,
        email: authFormData.email,
        password: authFormData.password,
      });

      if (res?.error) {
        setAuthError("Invalid credentials. Please verify your email and password.");
        return;
      }
      loggedInName = authFormData.email.split("@")[0].toUpperCase();
    } else {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: authFormData.name,
            email: authFormData.email,
            password: authFormData.password,
          })
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          setAuthError(data.error || "Failed to register account.");
          return;
        }

        await signIn("credentials", {
          redirect: false,
          email: authFormData.email,
          password: authFormData.password,
        });
      } catch (err) {
        setAuthError("Failed to register and sign in.");
        return;
      }
    }

    setShowAuthModal(false);
    initiateRazorpayPayment(formData.name || loggedInName);
  };

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
                    <span>{gstRate}% GST Tax</span>
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
      
      {showAuthModal && (
        <div className="fixed inset-0 bg-luxury-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-luxury-white border border-luxury-gold/30 p-8 max-w-md w-full relative shadow-2xl animate-fade-in text-left">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-luxury-gray hover:text-luxury-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Brand Title */}
            <div className="text-center mb-6">
              <span className="text-[9px] uppercase tracking-[0.4em] text-luxury-gold font-bold block mb-1">
                Client Registration Required
              </span>
              <h3 className="font-serif text-xl text-luxury-black font-light tracking-wide">
                Nakshtara Maison
              </h3>
              <p className="text-[10px] text-luxury-gray mt-2 leading-relaxed">
                Please register an account or sign in to complete your secure purchase.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-luxury-gold/15 mb-6">
              <button
                type="button"
                onClick={() => setAuthTab("signup")}
                className={`flex-1 pb-2.5 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all ${
                  authTab === "signup"
                    ? "border-luxury-black text-luxury-black"
                    : "border-transparent text-luxury-gray hover:text-luxury-black"
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setAuthTab("signin")}
                className={`flex-1 pb-2.5 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all ${
                  authTab === "signin"
                    ? "border-luxury-black text-luxury-black"
                    : "border-transparent text-luxury-gray hover:text-luxury-black"
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authTab === "signup" && (
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-1 font-bold">
                    Full Name
                  </label>
                  <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1 items-center">
                    <User className="h-3.5 w-3.5 text-luxury-gold mr-2 opacity-80" />
                    <input
                      type="text"
                      required
                      value={authFormData.name}
                      onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                      placeholder="ENTER YOUR NAME"
                      className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-1 font-bold">
                  Email Address
                </label>
                <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1 items-center">
                  <Mail className="h-3.5 w-3.5 text-luxury-gold mr-2 opacity-80" />
                  <input
                    type="email"
                    required
                    value={authFormData.email}
                    onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                    placeholder="ENTER EMAIL ADDRESS"
                    className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-wider text-luxury-gray block mb-1 font-bold">
                  Password
                </label>
                <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1 items-center">
                  <Lock className="h-3.5 w-3.5 text-luxury-gold mr-2 opacity-80" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={authFormData.password}
                    onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                    placeholder="ENTER PASSWORD"
                    className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full tracking-wider focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-luxury-gray hover:text-luxury-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

               {authError && (
                 <div className="text-[10px] text-red-600 bg-red-50/50 border border-red-200/50 p-2 text-center uppercase tracking-wider font-semibold mt-2">
                   {authError}
                 </div>
               )}

              <button
                type="submit"
                className="w-full bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black py-3 text-xs font-bold uppercase tracking-widest transition-all mt-4"
              >
                {authTab === "signup" ? "Register & Secure Checkout" : "Sign In & Secure Checkout"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
