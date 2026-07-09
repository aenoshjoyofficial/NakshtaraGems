import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function FAQPage() {
  const faqs = [
    {
      q: "Are all Nakshtara diamonds certified?",
      a: "Yes. All our loose diamonds above 0.3 carats come with an official grading report from the GIA (Gemological Institute of America). Smaller accent diamonds are rigorously graded by our in-house certified gemologists."
    },
    {
      q: "Can I customize the metal setting of a ring?",
      a: "Absolutely. We offer complete bespoke design services. You can choose from Platinum, 18k White Gold, 18k Yellow Gold, and 18k Rose Gold. Reach out to our atelier consultants to initiate a request."
    },
    {
      q: "What is your shipping and return policy?",
      a: "We offer complimentary, fully insured FedEx shipping within India. If you're not completely satisfied, you can initiate a return or exchange within 14 days of delivery (excludes custom bespoke orders)."
    },
    {
      q: "How can I book a showroom viewing?",
      a: "Showroom viewings in Mumbai are scheduled via our Consultation page. We require booking at least 24 hours in advance to prepare specific selections for your arrival."
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Client Support
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-luxury-gold/15 p-6 bg-luxury-ivory/10">
                <h3 className="font-serif text-base text-luxury-black font-semibold mb-2">{faq.q}</h3>
                <p className="text-xs text-luxury-gray leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
