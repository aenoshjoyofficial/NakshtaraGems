"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { Truck, MapPin, CheckCircle, Package, ArrowRight, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";

function TrackOrderContent() {
  const { orders, advanceShiprocketStatus } = useApp();
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [searchId, setSearchId] = React.useState(initialId);
  const [activeOrder, setActiveOrder] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchLiveOrder = React.useCallback((id: string) => {
    setLoading(true);
    fetch(`/api/orders?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((data) => {
        setActiveOrder(data);
      })
      .catch(() => {
        const localOrder = orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
        if (localOrder) {
          setActiveOrder(localOrder);
        } else {
          setActiveOrder(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orders]);

  React.useEffect(() => {
    if (initialId) {
      fetchLiveOrder(initialId);
    }
  }, [initialId, fetchLiveOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    fetchLiveOrder(searchId.trim());
  };

  // Helper to check step completion status
  const getStepStatus = (stepName: string, currentStatus: string) => {
    const statuses = ["Manifested", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];
    const currentIdx = statuses.indexOf(currentStatus);
    const targetIdx = statuses.indexOf(stepName);

    if (currentIdx > targetIdx) return "completed";
    if (currentIdx === targetIdx) return "active";
    return "pending";
  };

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans min-h-[70vh]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-2">
              Delivery Logistics Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Track Your Order
            </h1>
            <p className="text-xs text-luxury-gray max-w-xl mx-auto leading-relaxed">
              Monitor your bespoke diamond package status via our secure Shiprocket & FedEx partner delivery network.
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-16 relative">
            <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-2.5 items-center">
              <Truck className="h-5 w-5 text-luxury-gold mr-3 opacity-80" />
              <input
                type="text"
                placeholder="ENTER ORDER ID (e.g. NS-123456)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="bg-transparent text-xs text-luxury-black placeholder-luxury-gray w-full uppercase tracking-wider focus:outline-none"
              />
              <button
                type="submit"
                className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold hover:text-luxury-black transition-colors shrink-0"
              >
                Track Now
              </button>
            </div>
          </form>

          {activeOrder ? (
            <div className="space-y-12">
              {/* Order Info & Shiprocket Simulator */}
              <div className="border border-luxury-gold/15 bg-luxury-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md relative overflow-hidden">
                <Sparkles className="absolute top-4 right-4 h-5 w-5 text-luxury-gold/30 animate-pulse" />
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
                    Shiprocket Reference ID: {activeOrder.id}
                  </span>
                  <h3 className="font-serif text-lg text-luxury-black font-light">
                    Maison Courier: FedEx Armored
                  </h3>
                  <p className="text-[11px] text-luxury-gray mt-1">
                    Order Placed: {activeOrder.date} • Total: {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(activeOrder.total)}
                  </p>
                </div>

                {/* Simulator Trigger */}
                {activeOrder.shiprocketStatus !== "Delivered" && (
                  <button
                    onClick={() => advanceShiprocketStatus(activeOrder.id)}
                    className="flex items-center gap-2 bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-5 py-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all border border-luxury-black hover:border-luxury-gold"
                  >
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Advance Shiprocket Status
                  </button>
                )}
              </div>

              {/* Visual Shiprocket Timeline */}
              <div>
                <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-8 border-b border-luxury-gold/10 pb-2">
                  Shiprocket High-Security Transit Tracker
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
                  {[
                    { id: "Manifested", label: "Manifested", desc: "Order Registered" },
                    { id: "Picked Up", label: "Picked Up", desc: "Awaiting Carrier" },
                    { id: "In Transit", label: "In Transit", desc: "On Route" },
                    { id: "Out for Delivery", label: "Out for Delivery", desc: "Courier Assigned" },
                    { id: "Delivered", label: "Delivered", desc: "Secure Handover" }
                  ].map((step, idx) => {
                    const status = getStepStatus(step.id, activeOrder.shiprocketStatus);
                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        {/* Dot */}
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-500 mb-3 ${
                            status === "completed"
                              ? "bg-luxury-black text-luxury-white border-luxury-black"
                              : status === "active"
                              ? "bg-luxury-gold/20 text-luxury-gold border-luxury-gold animate-pulse"
                              : "bg-transparent text-luxury-gray/40 border-luxury-gold/10"
                          }`}
                        >
                          {status === "completed" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Package className="h-5 w-5" />
                          )}
                        </div>

                        {/* Text */}
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold block ${
                            status === "active" ? "text-luxury-gold" : "text-luxury-black/90"
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[9px] text-luxury-gray mt-1 block">
                          {step.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shiprocket Delivery History Logs */}
              <div className="border border-luxury-gold/5 bg-luxury-ivory/20 p-6 md:p-8">
                <h4 className="text-[11px] font-bold tracking-widest uppercase text-luxury-black mb-6">
                  Logistics Activity Logs
                </h4>
                
                <div className="space-y-6">
                  {activeOrder.shiprocketHistory.map((log: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-start border-l border-luxury-gold/20 pl-6 relative">
                      <div className="absolute -left-1.5 top-1.5 h-3.5 w-3.5 rounded-full bg-luxury-gold border border-luxury-white" />
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-black">
                            {log.status}
                          </span>
                          <span className="text-[9px] text-luxury-gray font-mono">
                            {log.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-luxury-gray font-medium flex items-center gap-1 mb-1.5">
                          <MapPin className="h-3 w-3 text-luxury-gold" /> {log.location}
                        </p>
                        <p className="text-xs text-luxury-gray/80 leading-relaxed font-sans">
                          {log.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-luxury-gold/15 bg-luxury-ivory/25 py-16 text-center max-w-lg mx-auto flex flex-col items-center">
              <ShieldAlert className="h-10 w-10 text-luxury-gold/50 mb-4" />
              <h3 className="font-serif text-lg text-luxury-black mb-2">No Active Order Selected</h3>
              <p className="text-xs text-luxury-gray max-w-sm leading-relaxed mb-6">
                Please enter your Shiprocket order number above or place a new checkout order to monitor tracking status updates.
              </p>
              <Link
                href="/shop"
                className="bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Go to showroom <ArrowRight className="h-3 w-3 inline ml-1" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function TrackOrderPage() {
  return (
    <React.Suspense fallback={
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-luxury-white font-sans">
          <p className="text-sm font-sans tracking-widest text-luxury-gold uppercase animate-pulse">Loading Tracking Portal...</p>
        </div>
        <Footer />
      </>
    }>
      <TrackOrderContent />
    </React.Suspense>
  );
}
