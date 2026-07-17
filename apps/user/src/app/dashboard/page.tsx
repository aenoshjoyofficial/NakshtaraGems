"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import {
  User,
  ShieldCheck,
  Clock,
  Award,
  Calendar,
  ShieldAlert,
  LogOut,
  Camera,
  Trash2,
  MapPin,
  Heart,
  Settings,
  Loader2,
  CheckCircle,
  Package,
  Phone,
  Mail,
  Ruler,
  Gem,
} from "lucide-react";

type Tab = "profile" | "orders" | "certificates" | "consultations" | "wishlist" | "settings";

export default function DashboardPage() {
  const { user, status, orders, logout, updateProfile, refreshProfile, wishlist, toggleWishlist } = useApp();
  const [activeTab, setActiveTab] = React.useState<Tab>("profile");
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [saveMsg, setSaveMsg] = React.useState("");
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false);

  const [profileForm, setProfileForm] = React.useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    dob: "",
    ringSize: "",
    preferredMetal: "Platinum",
  });

  React.useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        pincode: user.pincode || "",
        dob: user.dob || "",
        ringSize: user.ringSize || "",
        preferredMetal: user.preferredMetal || "Platinum",
      });
    }
  }, [user]);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data?.bookings) setBookings(data.bookings);
      })
      .catch(() => {});
  }, []);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/users/me/avatar", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        await refreshProfile();
      } else {
        alert(data.error || "Failed to upload profile picture.");
      }
    } catch {
      alert("Failed to upload profile picture. Please try again.");
    }
    setUploadingAvatar(false);
  };

  const handleAvatarDelete = async () => {
    if (!confirm("Remove your profile picture?")) return;
    setUploadingAvatar(true);
    try {
      const res = await fetch("/api/users/me/avatar", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        await refreshProfile();
      }
    } catch {}
    setUploadingAvatar(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        await refreshProfile();
        setSaveMsg("Profile updated successfully.");
      } else {
        setSaveMsg(data.error ? `Failed: ${data.error}` : "Failed to update profile.");
      }
    } catch {
      setSaveMsg("Failed to update profile. Please try again.");
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  if (status === "loading") {
    return (
      <>
        <Header />
        <main className="bg-luxury-white min-h-[65vh] flex flex-col items-center justify-center p-6 text-center font-sans">
          <Loader2 className="h-8 w-8 text-luxury-gold animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest text-luxury-gray">Authenticating your session...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="bg-luxury-white min-h-[65vh] flex flex-col items-center justify-center p-6 text-center font-sans">
          <ShieldAlert className="h-12 w-12 text-luxury-gold/60 mb-4 animate-pulse" />
          <h2 className="font-serif text-xl sm:text-2xl text-luxury-black mb-2 font-light">Vault Access Restricted</h2>
          <p className="text-xs text-luxury-gray max-w-sm mb-8 leading-relaxed">
            Please access the client portal to authenticate and view your private showroom dashboard.
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

  const avatarSrc = user.image || "/avatar.png";

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "profile", label: "Profile Details", icon: <User className="h-4 w-4" /> },
    { id: "orders", label: "Order History", icon: <Package className="h-4 w-4" />, count: orders.length },
    { id: "certificates", label: "Certificates", icon: <Award className="h-4 w-4" /> },
    { id: "consultations", label: "Consultations", icon: <Calendar className="h-4 w-4" />, count: bookings.length },
    { id: "wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" />, count: wishlist.length },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="border-b border-luxury-gold/15 pb-8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="h-20 w-20 bg-luxury-ivory border border-luxury-gold/25 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={avatarSrc} alt="Avatar" className="object-cover h-full w-full" />
                </div>
                <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                  <Camera className="h-5 w-5 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                </label>
                {user.image && (
                  <button
                    onClick={handleAvatarDelete}
                    className="absolute -bottom-1 -right-1 bg-luxury-ruby text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    disabled={uploadingAvatar}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
                {uploadingAvatar && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">Maison Member</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-light text-luxury-black uppercase tracking-wide">
                  Welcome back, {user.name.split(" ")[0]}
                </h1>
                <p className="text-[10px] text-luxury-gray mt-1">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-luxury-ivory/40 border border-luxury-gold/10 px-4 py-2.5 text-center">
                <span className="text-[8px] uppercase tracking-wider text-luxury-gray block mb-0.5">Tier Status</span>
                <span className="text-xs uppercase font-bold text-luxury-black tracking-widest">
                  {orders.length >= 5 ? "Royal Member" : orders.length >= 1 ? "Imperial Member" : "New Member"}
                </span>
              </div>
              <div className="bg-luxury-ivory/40 border border-luxury-gold/10 px-4 py-2.5 text-center">
                <span className="text-[8px] uppercase tracking-wider text-luxury-gray block mb-0.5">Total Orders</span>
                <span className="text-xs uppercase font-bold text-luxury-black tracking-widest">{orders.length}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold border transition-colors flex items-center justify-between cursor-pointer ${
                    activeTab === tab.id
                      ? "border-luxury-black bg-luxury-black/5 text-luxury-black"
                      : "border-transparent text-luxury-gray hover:text-luxury-black hover:bg-luxury-ivory/30"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                  {tab.count !== undefined && (
                    <span className="text-[10px] bg-luxury-gold/10 text-luxury-gold px-1.5 py-0.5 rounded-full">{tab.count}</span>
                  )}
                </button>
              ))}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold border border-transparent text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer mt-4"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* ========== PROFILE TAB ========== */}
              {activeTab === "profile" && (
                <div className="border border-luxury-gold/10 p-6 sm:p-8 bg-luxury-white space-y-8">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <User className="h-5 w-5 text-luxury-gold" /> Personal Profile
                  </h3>

                  {/* Avatar Section */}
                  <div className="flex items-center gap-6 p-4 bg-luxury-ivory/30 border border-luxury-gold/10">
                    <div className="relative group shrink-0">
                      <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-luxury-gold/20">
                        <img src={avatarSrc} alt="Profile" className="object-cover h-full w-full" />
                      </div>
                      <label className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Camera className="h-5 w-5 text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                      </label>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-luxury-black uppercase tracking-wider">{user.name}</p>
                      <p className="text-[10px] text-luxury-gray mt-0.5">{user.email}</p>
                      <div className="flex gap-2 mt-3">
                        <label className="text-[9px] uppercase tracking-widest bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-3 py-1.5 font-bold cursor-pointer transition-colors inline-flex items-center gap-1">
                          <Camera className="h-3 w-3" /> Upload Photo
                          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                        </label>
                        {user.image && (
                          <button
                            onClick={handleAvatarDelete}
                            className="text-[9px] uppercase tracking-widest border border-red-300 text-red-600 hover:bg-red-50 px-3 py-1.5 font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                            disabled={uploadingAvatar}
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        )}
                      </div>
                      <p className="text-[9px] text-luxury-gray mt-2">JPG, PNG or WebP. Max 2MB.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-luxury-black focus:border-luxury-gold focus:outline-none uppercase tracking-wider"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Email (cannot be changed)</label>
                        <input
                          type="email"
                          disabled
                          value={user.email}
                          className="w-full bg-transparent border-b border-luxury-gold/10 py-2 text-luxury-gray focus:outline-none cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-luxury-black focus:border-luxury-gold focus:outline-none tracking-wider"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Date of Birth</label>
                        <input
                          type="date"
                          value={profileForm.dob}
                          onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-luxury-black focus:border-luxury-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold flex items-center gap-1"><MapPin className="h-3 w-3" /> Delivery Address</label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Street address, city, state"
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-luxury-black focus:border-luxury-gold focus:outline-none uppercase tracking-wider"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Pincode</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={profileForm.pincode}
                          onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                          placeholder="000000"
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-luxury-black focus:border-luxury-gold focus:outline-none tracking-wider"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold flex items-center gap-1"><Ruler className="h-3 w-3" /> Ring Size</label>
                        <select
                          value={profileForm.ringSize}
                          onChange={(e) => setProfileForm({ ...profileForm, ringSize: e.target.value })}
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-luxury-black focus:border-luxury-gold focus:outline-none"
                        >
                          <option value="">Select</option>
                          {["4", "5", "6", "7", "8", "9", "10", "11", "12", "13"].map((s) => (
                            <option key={s} value={s}>Size {s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold flex items-center gap-1"><Gem className="h-3 w-3" /> Preferred Metal</label>
                        <select
                          value={profileForm.preferredMetal}
                          onChange={(e) => setProfileForm({ ...profileForm, preferredMetal: e.target.value })}
                          className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-luxury-black focus:border-luxury-gold focus:outline-none"
                        >
                          {["Platinum", "18k White Gold", "18k Yellow Gold", "18k Rose Gold"].map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border border-luxury-black hover:border-luxury-gold disabled:opacity-50 inline-flex items-center gap-2"
                      >
                        {saving && <Loader2 className="h-3 w-3 animate-spin" />}
                        {saving ? "Saving..." : "Save Profile"}
                      </button>
                      {saveMsg && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${saveMsg.includes("Failed") ? "text-red-600" : "text-green-700"}`}>
                          {saveMsg}
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* ========== ORDERS TAB ========== */}
              {activeTab === "orders" && (
                <div className="border border-luxury-gold/10 p-6 sm:p-8 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <Package className="h-5 w-5 text-luxury-gold" /> Order History
                  </h3>
                  {orders.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center">
                      <Package className="h-10 w-10 text-luxury-gold/20 mb-3" />
                      <p className="text-xs uppercase tracking-widest text-luxury-gray mb-4">No orders yet</p>
                      <Link href="/shop" className="text-[10px] uppercase text-luxury-gold hover:text-luxury-black font-bold tracking-widest border border-luxury-gold px-6 py-2.5 hover:bg-luxury-gold hover:text-luxury-black transition-all">
                        Explore Showroom
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div key={ord.id} className="p-5 border border-luxury-gold/5 bg-luxury-ivory/20 space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <span className="text-[9px] uppercase text-luxury-gold font-bold">Order {ord.id}</span>
                              <span className="text-[9px] text-luxury-gray ml-2">{ord.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] uppercase tracking-widest text-luxury-gold bg-luxury-black px-2 py-0.5 font-bold">{ord.shiprocketStatus}</span>
                              <Link href={`/track-order?id=${ord.id}`} className="text-[9px] uppercase tracking-widest text-luxury-black hover:text-luxury-gold font-bold underline">
                                Track
                              </Link>
                            </div>
                          </div>
                          {ord.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 text-xs">
                              <div className="h-10 w-10 bg-luxury-ivory border border-luxury-gold/10 overflow-hidden shrink-0">
                                <img src={item.product?.image || "/avatar.png"} alt="" className="object-cover h-full w-full" />
                              </div>
                              <div className="flex-1">
                                <span className="font-semibold text-luxury-black">{item.product?.name || "Product"}</span>
                                <span className="text-luxury-gray ml-2">x{item.quantity}</span>
                              </div>
                              <span className="font-bold text-luxury-black">{formatPrice(item.product?.price * item.quantity || 0)}</span>
                            </div>
                          ))}
                          <div className="text-right border-t border-luxury-gold/5 pt-2">
                            <span className="text-xs font-bold text-luxury-black">Total: {formatPrice(ord.total)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ========== CERTIFICATES TAB ========== */}
              {activeTab === "certificates" && (
                <div className="border border-luxury-gold/10 p-6 sm:p-8 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <ShieldCheck className="h-5 w-5 text-luxury-gold" /> Digital Certificate Vault
                  </h3>
                  <p className="text-xs text-luxury-gray leading-relaxed">
                    Access digital twin certifications (GIA / IGI) associated with your gemstone and diamond purchases.
                  </p>
                  {orders.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center">
                      <Award className="h-10 w-10 text-luxury-gold/20 mb-3" />
                      <p className="text-xs uppercase tracking-widest text-luxury-gray">No certificates available</p>
                      <p className="text-[10px] text-luxury-gray mt-1">Certificates appear after your first gemstone or diamond purchase.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.flatMap((ord) =>
                        ord.items
                          .filter((i: any) => i.product?.category === "diamond" || i.product?.category === "gemstone")
                          .map((i: any, idx: number) => (
                            <div key={`${ord.id}-${idx}`} className="flex items-center justify-between p-4 border border-luxury-gold/5 bg-luxury-ivory/20">
                              <div className="flex items-center gap-3">
                                <Award className="h-8 w-8 text-luxury-gold shrink-0" />
                                <div>
                                  <h4 className="text-xs font-semibold text-luxury-black">{i.product?.name || "Gemstone"}</h4>
                                  <p className="text-[10px] text-luxury-gray">Order {ord.id} &middot; {i.product?.certificate || "GIA"} Certified</p>
                                </div>
                              </div>
                              <button className="text-[9px] uppercase tracking-widest bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-4 py-2 font-bold transition-colors cursor-pointer">
                                Download PDF
                              </button>
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ========== CONSULTATIONS TAB ========== */}
              {activeTab === "consultations" && (
                <div className="border border-luxury-gold/10 p-6 sm:p-8 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <Calendar className="h-5 w-5 text-luxury-gold" /> Consultation Bookings
                  </h3>
                  {bookings.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center">
                      <Calendar className="h-10 w-10 text-luxury-gold/20 mb-3" />
                      <p className="text-xs uppercase tracking-widest text-luxury-gray mb-4">No consultations booked</p>
                      <Link href="/contact" className="text-[10px] uppercase text-luxury-gold hover:text-luxury-black font-bold tracking-widest border border-luxury-gold px-6 py-2.5 hover:bg-luxury-gold hover:text-luxury-black transition-all">
                        Book a Consultation
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((b: any) => (
                        <div key={b.id} className="p-5 border border-luxury-gold/10 bg-luxury-ivory/20">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest bg-luxury-gold text-luxury-black px-2 py-0.5 font-bold mb-2 inline-block">
                                {b.type || "Consultation"}
                              </span>
                              <h4 className="font-serif text-base text-luxury-black font-light">{b.client || "Private Session"}</h4>
                              <p className="text-xs text-luxury-gray mt-1">{b.date} at {b.slot}</p>
                              {b.notes && <p className="text-[10px] text-luxury-gray mt-1">Note: {b.notes}</p>}
                            </div>
                            <Link href="/contact" className="text-[9px] border border-luxury-black py-2.5 px-4 font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-luxury-white transition-all">
                              Reschedule
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ========== WISHLIST TAB ========== */}
              {activeTab === "wishlist" && (
                <div className="border border-luxury-gold/10 p-6 sm:p-8 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <Heart className="h-5 w-5 text-luxury-gold" /> My Wishlist
                  </h3>
                  {wishlist.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center">
                      <Heart className="h-10 w-10 text-luxury-gold/20 mb-3" />
                      <p className="text-xs uppercase tracking-widest text-luxury-gray mb-4">Your wishlist is empty</p>
                      <Link href="/shop" className="text-[10px] uppercase text-luxury-gold hover:text-luxury-black font-bold tracking-widest border border-luxury-gold px-6 py-2.5 hover:bg-luxury-gold hover:text-luxury-black transition-all">
                        Browse Collection
                      </Link>
                    </div>
                  ) : (
                    <WishlistItems wishlist={wishlist} onRemove={toggleWishlist} />
                  )}
                </div>
              )}

              {/* ========== SETTINGS TAB ========== */}
              {activeTab === "settings" && (
                <div className="border border-luxury-gold/10 p-6 sm:p-8 bg-luxury-white space-y-6">
                  <h3 className="font-serif text-lg text-luxury-black font-semibold flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                    <Settings className="h-5 w-5 text-luxury-gold" /> Account Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 border border-luxury-gold/10 bg-luxury-ivory/20">
                      <h4 className="text-xs font-bold text-luxury-black uppercase tracking-wider mb-1">Account Email</h4>
                      <p className="text-xs text-luxury-gray flex items-center gap-1"><Mail className="h-3 w-3" /> {user.email}</p>
                    </div>
                    <div className="p-4 border border-luxury-gold/10 bg-luxury-ivory/20">
                      <h4 className="text-xs font-bold text-luxury-black uppercase tracking-wider mb-1">Password</h4>
                      <p className="text-[10px] text-luxury-gray">Contact support to change your password.</p>
                    </div>
                    <div className="p-4 border border-red-200 bg-red-50/50">
                      <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">Danger Zone</h4>
                      <p className="text-[10px] text-red-600 mb-3">Permanently delete your account and all associated data.</p>
                      <button className="text-[9px] uppercase tracking-widest border border-red-400 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 font-bold transition-colors cursor-pointer">
                        Delete Account
                      </button>
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

function WishlistItems({ wishlist, onRemove }: { wishlist: string[]; onRemove: (id: string) => any }) {
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data?.products) setProducts(data.products);
      })
      .catch(() => {});
  }, []);

  const wished = products.filter((p) => wishlist.includes(p.id));

  if (wished.length === 0) {
    return (
      <div className="py-16 text-center flex flex-col items-center">
        <Heart className="h-10 w-10 text-luxury-gold/20 mb-3" />
        <p className="text-xs uppercase tracking-widest text-luxury-gray mb-4">Your wishlist is empty</p>
        <Link href="/shop" className="text-[10px] uppercase text-luxury-gold hover:text-luxury-black font-bold tracking-widest border border-luxury-gold px-6 py-2.5 hover:bg-luxury-gold hover:text-luxury-black transition-all">
          Browse Collection
        </Link>
      </div>
    );
  }

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-3">
      {wished.map((p) => (
        <div key={p.id} className="flex items-center gap-4 p-4 border border-luxury-gold/5 bg-luxury-ivory/20">
          <Link href={`/shop/${p.id}`} className="h-16 w-16 bg-luxury-ivory border border-luxury-gold/10 overflow-hidden shrink-0">
            <img src={p.image} alt={p.name} className="object-cover h-full w-full" />
          </Link>
          <div className="flex-1">
            <Link href={`/shop/${p.id}`} className="text-xs font-semibold text-luxury-black hover:text-luxury-gold transition-colors">
              {p.name}
            </Link>
            <p className="text-[10px] text-luxury-gray capitalize">{p.category}</p>
          </div>
          <span className="text-xs font-bold text-luxury-black">{formatPrice(p.price)}</span>
          <button
            onClick={() => onRemove(p.id)}
            className="text-[9px] uppercase tracking-widest text-red-600 hover:text-red-800 font-bold cursor-pointer px-2 py-1"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
