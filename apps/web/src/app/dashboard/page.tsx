import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { User, ShieldCheck, Clock, Award, CreditCard, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const previousOrders = [
    {
      id: "ORD-98402",
      date: "May 12, 2026",
      status: "Delivered",
      item: "The Royal Solitaire Engagement Ring",
      amount: 256000 // In INR
    }
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="border-b border-luxury-gold/15 pb-8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-luxury-ivory border border-luxury-gold/25 rounded-full flex items-center justify-center">
                <User className="h-7 w-7 text-luxury-gold" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">Maison Member</span>
                <h1 className="font-serif text-3xl font-light text-luxury-black">Welcome back, Client</h1>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-luxury-ivory/40 border border-luxury-gold/10 px-4 py-2.5 text-center">
                <span className="text-[8px] uppercase tracking-wider text-luxury-gray block mb-0.5">Tier Status</span>
                <span className="text-xs uppercase font-bold text-luxury-black tracking-widest">Gold Member</span>
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
                { label: "Profile Details", active: true },
                { label: "Orders History", active: false },
                { label: "Digital Certificates Vault", active: false },
                { label: "Consultation Bookings", active: false },
                { label: "Security & Settings", active: false },
              ].map((link) => (
                <button
                  key={link.label}
                  className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider font-bold border transition-colors ${
                    link.active
                      ? "border-luxury-black bg-luxury-black/5 text-luxury-black"
                      : "border-transparent text-luxury-gray hover:text-luxury-black hover:bg-luxury-ivory/30"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Side Main Details Area */}
            <div className="lg:col-span-9 space-y-12">
              {/* Order History */}
              <div className="border border-luxury-gold/10 p-6 bg-luxury-white">
                <h3 className="font-serif text-lg text-luxury-black font-semibold mb-6 flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                  <Clock className="h-4.5 w-4.5 text-luxury-gold" /> Order History
                </h3>
                <div className="space-y-4">
                  {previousOrders.map((ord) => (
                    <div key={ord.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-luxury-gold/5 bg-luxury-ivory/20 gap-4">
                      <div>
                        <span className="text-[9px] uppercase text-luxury-gold font-bold block mb-1">{ord.id} • {ord.date}</span>
                        <h4 className="text-xs font-semibold text-luxury-black">{ord.item}</h4>
                      </div>
                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2">
                        <span className="font-sans text-xs font-bold text-luxury-black">{formatPrice(ord.amount)}</span>
                        <span className="text-[9px] uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 font-bold">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate vault */}
              <div className="border border-luxury-gold/10 p-6 bg-luxury-white">
                <h3 className="font-serif text-lg text-luxury-black font-semibold mb-6 flex items-center gap-2 pb-3 border-b border-luxury-gold/10">
                  <ShieldCheck className="h-4.5 w-4.5 text-luxury-gold" /> Digital GIA Certificate Vault
                </h3>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-luxury-gold/5 bg-luxury-ivory/20 gap-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-9 w-9 text-luxury-gold shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-luxury-black">GIA Diamond Report #209384752</h4>
                      <p className="text-[10px] text-luxury-gray mt-0.5">1.52 Carat Round Cut Brilliant, IF, D Color</p>
                    </div>
                  </div>
                  <button className="text-[9px] uppercase tracking-widest bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black px-4 py-2 text-center font-bold transition-colors">
                    Download PDF
                  </button>
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
