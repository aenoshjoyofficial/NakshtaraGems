"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Calendar, Clock, User } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    consultationType: "virtual",
    date: "",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Private Concierge
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-luxury-black mb-6">
              Book a Consultation
            </h1>
            <p className="text-sm text-luxury-gray leading-relaxed">
              Schedule a virtual session or plan an in-showroom private viewing in Mumbai with one of our GIA-certified diamond consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-luxury-gold/10 p-8 bg-luxury-ivory/20">
              <div>
                <h3 className="font-serif text-xl text-luxury-black font-semibold mb-6">Direct Channels</h3>
                <p className="text-xs text-luxury-gray leading-relaxed mb-10">
                  Our private client advisory desk is open Monday through Saturday from 10:00 AM to 7:00 PM IST. Reach out to schedule immediate appraisals or verify certification.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-luxury-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase text-luxury-gray tracking-wider block mb-0.5">Phone Enquiry</span>
                      <a href="tel:+912212345678" className="text-xs font-semibold text-luxury-black hover:text-luxury-gold transition-colors font-sans">
                        +91 22 1234 5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-luxury-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase text-luxury-gray tracking-wider block mb-0.5">Email Support</span>
                      <a href="mailto:concierge@nakshtaragems.com" className="text-xs font-semibold text-luxury-black hover:text-luxury-gold transition-colors font-sans">
                        concierge@nakshtaragems.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-luxury-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase text-luxury-gray tracking-wider block mb-0.5">Showroom Address</span>
                      <p className="text-xs text-luxury-black leading-relaxed font-sans font-medium">
                        Nakshtara Maison, 3rd Floor, Bandra East, Mumbai, Maharashtra 400051
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-luxury-gold/10 pt-6 mt-10 text-[9px] uppercase tracking-widest text-luxury-gold font-bold">
                By Appointment Only • Secure Showroom Access
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7 border border-luxury-gold/10 p-8 bg-luxury-white">
              {formSubmitted ? (
                <div className="py-16 text-center">
                  <h3 className="font-serif text-2xl text-luxury-black font-light mb-4">Request Received</h3>
                  <p className="text-xs text-luxury-gray max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you. A certified Nakshtara advisor will review your request and get in touch within 24 hours to confirm your scheduled slot.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="border border-luxury-gold/30 hover:border-luxury-gold px-6 py-3 text-xs uppercase tracking-widest text-luxury-black hover:text-luxury-gold transition-colors font-bold"
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-serif text-xl text-luxury-black font-semibold mb-6 pb-2 border-b border-luxury-gold/10">
                    Schedule Appointment
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Your Name</label>
                      <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1 items-center">
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
                      <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Email Address</label>
                      <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1 items-center">
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
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-3 font-bold">Consultation Mode</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2.5 text-xs text-luxury-gray hover:text-luxury-black cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          checked={formData.consultationType === "virtual"}
                          onChange={() => setFormData({ ...formData, consultationType: "virtual" })}
                          className="h-4 w-4 text-luxury-gold focus:ring-luxury-gold"
                        />
                        Virtual Consultation
                      </label>
                      <label className="flex items-center gap-2.5 text-xs text-luxury-gray hover:text-luxury-black cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          checked={formData.consultationType === "showroom"}
                          onChange={() => setFormData({ ...formData, consultationType: "showroom" })}
                          className="h-4 w-4 text-luxury-gold focus:ring-luxury-gold"
                        />
                        Showroom Private Viewing
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Preferred Date</label>
                      <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1 items-center">
                        <Calendar className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="bg-transparent text-xs text-luxury-black w-full focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Time Window</label>
                      <div className="flex border-b border-luxury-gold/30 focus-within:border-luxury-gold py-1 items-center">
                        <Clock className="h-4 w-4 text-luxury-gold mr-2.5 opacity-80" />
                        <select className="bg-transparent text-xs text-luxury-black w-full focus:outline-none cursor-pointer">
                          <option>Morning (10:00 AM - 1:00 PM)</option>
                          <option>Afternoon (1:00 PM - 4:00 PM)</option>
                          <option>Evening (4:00 PM - 7:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-luxury-gray block mb-2 font-bold">Special Requests / Preferences</label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="DESCRIBE ANY SPECIFIC SHAPES OR SETTINGS YOU ARE INTERESTED IN..."
                      className="w-full bg-luxury-ivory/20 border border-luxury-gold/20 p-3 text-xs uppercase tracking-wider text-luxury-black placeholder-luxury-gray focus:border-luxury-gold focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-luxury-black hover:bg-luxury-gold text-luxury-white hover:text-luxury-black py-4 text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Submit Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
