"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { User, ShieldCheck, Clock, Award, CreditCard, Calendar, Eye, ShieldAlert, Sparkles, LogOut, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const { user, orders, logout, updateProfile } = useApp();
  const [activeTab, setActiveTab] = React.useState<"profile" | "orders" | "certificates" | "consultations" | "settings">("profile");

  const [profileForm, setProfileForm] = React.useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    dob: "",
    ringSize: "",
    preferredMetal: "Platinum"
  });

  const [settingsForm, setSettingsForm] = React.useState({
    newsletter: true,
    twoFactor: false,
    phoneAlerts: true
  });

  // Sync profile details state
  React.useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        pincode: user.pincode || "",
        dob: user.dob || "",
        ringSize: user.ringSize || "",
        preferredMetal: user.preferredMetal || "Platinum"
      });
    }
  }, [user]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="bg-luxury-white min-h-[65vh] flex flex-col items-center justify-center p-6 text-center font-sans">
          <ShieldAlert className="h-12 w-12 text-luxury-gold/60 mb-4 animate-pulse" />
          <h2 className="font-serif text-xl sm:text-2xl text-luxury-black mb-2 font-light">
            Vault Access Restricted
          </h2>
          <p className="text-xs text-luxury-gray max-w-sm mb-8 leading-relaxed">
            Please access the client portal to authenticate and view your private showroom dashboard details.
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

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="border-b border-luxury-gold/15 pb-8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-luxury-ivory border border-luxury-gold/25 rounded-full flex items-center justify-center overflow-hidden relative">
                <img src="/avatar.png" alt="Avatar" className="object-cover h-full w-full" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">Maison Member</span>
                <h1 className="font-serif text-3xl font-light text-luxury-black uppercase tracking-wide">
                  Welcome back, {user.name.split(" ")[0]}
                </h1>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-luxury-ivory/40 border border-luxury-gold/10 px-4 py-2.5 text-center">
                <span className="text-[8px] uppercase tracking-wider text-luxury-gray block mb-0.5">Tier Status</span>
                <span className="text-xs uppercase font-bold text-luxury-black tracking-widest">Imperial Member</span>
              </div>
              <div className="bg-luxury-ivory/40 border border-luxury-gold/10 px-4 py-2.5 text-center">
                <span className="text-[8px] uppercase tracking-wider text-luxury-gray block mb-0.5">Consultations</span>
                <span className="text-xs uppercase font-bold text-luxury-black tracking-widest">1 Scheduled</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Side Sidebar links */}
            <div className="lg:col-span-3 space-y-2">
              {[
                { id: "profile", label: "Profile Details" },
                { id: "orders", label: `Orders History (${orders.length})` },
                { id: "certificates", label: "Digital Certificates Vault" },
                { id: "consultations", label: "Consultation Bookings" },
                { id: "settings", label: "Security & Settings" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as any)}
                  className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold border transition-colors cursor-pointer ${
                    activeTab === link.id
                      ? "border-luxury-black bg-luxury-black/5 text-luxury-black"
                      : "border-transparent text-luxury-gray hover:text-luxury-black hover:bg-luxury-ivory/30"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold border border-transparent text-luxury-ruby hover:bg-luxury-ivory/30 flex items-center gap-2 cursor-pointer mt-4"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>

            {/* Right Side Main Details Area */}
            <div className="lg:col-span-9">
              {/* Profile details tab */}
              {activeTab === "profile" && (
                <div className="border border-luxury-gold/10 p-6 bg-luxury-white space-y-8">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <User className="h-4.5 w-4.5 text-luxury-gold" /> Personal Profile Info
                  </h3>
                  
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateProfile({
                        name: profileForm.name,
                        phone: profileForm.phone,
                        address: profileForm.address,
                        pincode: profileForm.pincode,
                        dob: profileForm.dob,
                        ringSize: profileForm.ringSize,
                        preferredMetal: profileForm.preferredMetal
                      });
                      alert("Maison profile updated successfully!");
                    }}
                    className="space-y-6 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Client Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-1.5 text-luxury-black focus:border-luxury-gold focus:outline-none uppercase tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Registered Email</label>
                        <input
                          type="email"
                          disabled
                          value={user.email}
                          className="w-full bg-transparent border-b border-luxury-gold/10 py-1.5 text-luxury-gray focus:outline-none cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Contact Phone</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="ENTER PHONE NUMBER"
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-1.5 text-luxury-black focus:border-luxury-gold focus:outline-none tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Date of Birth</label>
                        <input
                          type="date"
                          value={profileForm.dob}
                          onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-1.5 text-luxury-black focus:border-luxury-gold focus:outline-none"
                        />
                      </div>


                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Vault Delivery Address</label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                          placeholder="ENTER STREET ADDRESS"
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-1.5 text-luxury-black focus:border-luxury-gold focus:outline-none uppercase tracking-wider"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Pincode</label>
                        <input
                          type="text"
                          value={profileForm.pincode}
                          onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                          placeholder="ENTER 6 DIGIT PIN"
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-1.5 text-luxury-black focus:border-luxury-gold focus:outline-none tracking-wider"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border border-luxury-black hover:border-luxury-gold"
                    >
                      Save Atelier Profile
                    </button>
                  </form>
                </div>
              )}

              {/* Order History Tab */}
              {activeTab === "orders" && (
                <div className="border border-luxury-gold/10 p-6 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <Clock className="h-4.5 w-4.5 text-luxury-gold" /> Orders Vault
                  </h3>
                  
                  {orders.length === 0 ? (
                    <div className="py-12 text-center flex flex-col items-center">
                      <Clock className="h-8 w-8 text-luxury-gold/30 mb-2" />
                      <p className="text-xs uppercase tracking-widest text-luxury-gray">No order history recorded</p>
                      <Link href="/shop" className="text-[10px] uppercase text-luxury-gold hover:text-luxury-black font-bold tracking-widest mt-4">
                        Explore showroom
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div key={ord.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-luxury-gold/5 bg-luxury-ivory/20 gap-4">
                          <div>
                            <span className="text-[9px] uppercase text-luxury-gold font-bold block mb-1">Order Ref: {ord.id} • {ord.date}</span>
                            <h4 className="text-xs font-semibold text-luxury-black">
                              {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(", ")}
                            </h4>
                          </div>
                          <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2">
                            <span className="font-sans text-xs font-bold text-luxury-black">{formatPrice(ord.total)}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] uppercase tracking-widest text-luxury-gold bg-luxury-black px-2 py-0.5 font-bold">
                                {ord.shiprocketStatus}
                              </span>
                              <Link
                                href={`/track-order?id=${ord.id}`}
                                className="text-[9px] uppercase tracking-widest text-luxury-black hover:text-luxury-gold font-bold underline"
                              >
                                Track Route
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Digital GIA Certificates tab */}
              {activeTab === "certificates" && (
                <div className="border border-luxury-gold/10 p-6 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <ShieldCheck className="h-4.5 w-4.5 text-luxury-gold" /> Digital Certificate Vault
                  </h3>
                  <p className="text-xs text-luxury-gray leading-relaxed mb-4">
                    Access high-resolution digital twin certifications (GIA and IGI) associated with your gemstone purchases.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-luxury-gold/5 bg-luxury-ivory/20 gap-4">
                      <div className="flex items-start gap-3">
                        <Award className="h-9 w-9 text-luxury-gold shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-luxury-black">GIA Diamond Grading Report #209384752</h4>
                          <p className="text-[10px] text-luxury-gray mt-0.5">1.52 Carat Round Cut Brilliant, IF Clarity, D Color</p>
                        </div>
                      </div>
                      <button className="text-[9px] uppercase tracking-widest bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-4 py-2 text-center font-bold transition-colors cursor-pointer">
                        Download PDF
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-luxury-gold/5 bg-luxury-ivory/20 gap-4">
                      <div className="flex items-start gap-3">
                        <Award className="h-9 w-9 text-luxury-gold shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-luxury-black">IGI Fine Gemstone Certification #G849203</h4>
                          <p className="text-[10px] text-luxury-gray mt-0.5">Burmese Ruby, Oval shape, Pigeon Blood Red</p>
                        </div>
                      </div>
                      <button className="text-[9px] uppercase tracking-widest bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-4 py-2 text-center font-bold transition-colors cursor-pointer">
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Consultation Tab */}
              {activeTab === "consultations" && (
                <div className="border border-luxury-gold/10 p-6 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <Calendar className="h-4.5 w-4.5 text-luxury-gold" /> Consultation Bookings
                  </h3>
                  
                  <div className="p-5 border border-luxury-gold/10 bg-luxury-ivory/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest bg-luxury-gold text-luxury-black px-2 py-0.5 font-bold mb-2 inline-block">
                        Confirmed Booking
                      </span>
                      <h4 className="font-serif text-base text-luxury-black font-light mb-1">
                        Private Atelier Custom Diamond Consultation
                      </h4>
                      <p className="text-xs text-luxury-gray">
                        July 12, 2026 at 04:00 PM • With Chief Designer Swamy Swamy
                      </p>
                    </div>
                    <button className="text-[9px] border border-luxury-black py-2.5 px-4 font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-luxury-white transition-all cursor-pointer">
                      Reschedule
                    </button>
                  </div>
                </div>
              )}

              {/* Security & Settings tab */}
              {activeTab === "settings" && (
                <div className="border border-luxury-gold/10 p-6 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <ShieldCheck className="h-4.5 w-4.5 text-luxury-gold" /> Security & Notification Controls
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-luxury-gold/5">
                      <div>
                        <h4 className="text-xs font-semibold text-luxury-black">Secure Two-Factor Authentication</h4>
                        <p className="text-[10px] text-luxury-gray mt-0.5">Verify your checkout logons using biometric security tokens.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsForm.twoFactor}
                        onChange={() => setSettingsForm({ ...settingsForm, twoFactor: !settingsForm.twoFactor })}
                        className="h-4 w-4 accent-luxury-gold"
                      />
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-luxury-gold/5">
                      <div>
                        <h4 className="text-xs font-semibold text-luxury-black">Weekly Showcase Newsletter</h4>
                        <p className="text-[10px] text-luxury-gray mt-0.5">Receive updates on newly cataloged loose diamonds and gemstones.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsForm.newsletter}
                        onChange={() => setSettingsForm({ ...settingsForm, newsletter: !settingsForm.newsletter })}
                        className="h-4 w-4 accent-luxury-gold"
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="text-xs font-semibold text-luxury-black">SMS Shiprocket Delivery Notifications</h4>
                        <p className="text-[10px] text-luxury-gray mt-0.5">Get real-time tracking progress logs sent to your mobile.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsForm.phoneAlerts}
                        onChange={() => setSettingsForm({ ...settingsForm, phoneAlerts: !settingsForm.phoneAlerts })}
                        className="h-4 w-4 accent-luxury-gold"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
