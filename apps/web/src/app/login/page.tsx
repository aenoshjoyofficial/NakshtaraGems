"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { user, login: contextLogin } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "signin") {
      contextLogin(formData.email.split("@")[0].toUpperCase(), formData.email);
      setSuccessMsg("Welcome back to Nakshtara Gems. Accessing client vault...");
    } else {
      contextLogin(formData.name, formData.email);
      setSuccessMsg("Account successfully registered to the Maison. Welcome!");
    }
    
    // Immediate redirect to homepage
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-md mx-auto">
          {/* Card Container */}
          <div className="border border-luxury-gold/20 p-8 bg-luxury-white shadow-xl relative">
            <Sparkles className="absolute top-6 right-6 h-5 w-5 text-luxury-gold/40 animate-pulse" />

            {/* Brand Title */}
            <div className="text-center mb-8">
              <span className="text-[9px] uppercase tracking-[0.4em] text-luxury-gold font-bold block mb-1">
                Client Access
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-luxury-black font-light tracking-wide">
                Nakshtara Maison
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-luxury-gold/15 mb-8">
              <button
                onClick={() => {
                  setActiveTab("signin");
                  setSuccessMsg("");
                }}
                className={`flex-1 pb-3 text-xs uppercase tracking-widest font-bold border-b-2 transition-all ${
                  activeTab === "signin"
                    ? "border-luxury-black text-luxury-black"
                    : "border-transparent text-luxury-gray hover:text-luxury-black"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab("signup");
                  setSuccessMsg("");
                }}
                className={`flex-1 pb-3 text-xs uppercase tracking-widest font-bold border-b-2 transition-all ${
                  activeTab === "signup"
                    ? "border-luxury-black text-luxury-black"
                    : "border-transparent text-luxury-gray hover:text-luxury-black"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form & Messages */}
            {successMsg ? (
              <div className="py-10 text-center space-y-4">
                <p className="text-xs text-luxury-black uppercase tracking-wider font-semibold">
                  {successMsg}
                </p>
                <Link
                  href="/shop"
                  className="inline-block bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Go to Showroom
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {activeTab === "signup" && (
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">
                      Full Name
                    </label>
                    <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1.5 items-center">
                      <User className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="ENTER YOUR NAME"
                        className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">
                    Email Address
                  </label>
                  <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1.5 items-center">
                    <Mail className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ENTER EMAIL ADDRESS"
                      className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">
                    Password
                  </label>
                  <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1.5 items-center">
                    <Lock className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="ENTER PASSWORD"
                      className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full tracking-wider focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-luxury-gray hover:text-luxury-black transition-colors"
                      aria-label="Toggle Password Visibility"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {activeTab === "signin" && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-[9px] uppercase tracking-widest text-luxury-gray hover:text-luxury-gold transition-colors font-bold"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black py-4 text-xs font-bold uppercase tracking-widest transition-all"
                >
                  {activeTab === "signin" ? "Sign In to Vault" : "Create Private Account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
