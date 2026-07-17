"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.blog) {
          setPosts(data.blog);
        }
      })
      .catch((err) => console.error("Error loading blog posts:", err));
  }, []);

  return (
    <>
      <Header />
      <main className="bg-luxury-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold font-semibold block mb-3">
              Maison Editorial
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-luxury-black mb-4">
              The Diamond Journal
            </h1>
            <p className="text-sm text-luxury-gray max-w-lg mx-auto leading-relaxed">
              Read expert insights, diamond education guides, and updates directly from the Nakshtara atelier.
            </p>
          </div>

          <div className="space-y-12">
            {posts.map((post, i) => (
              <div key={i} className="border border-luxury-gold/15 p-8 bg-luxury-ivory/10 hover:border-luxury-gold transition-colors duration-500 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex items-center gap-4 mb-4 text-[9px] uppercase tracking-widest text-luxury-gold font-bold">
                    <span>{post.category}</span>
                    <span className="h-1 w-1 bg-luxury-gold rounded-full" />
                    <span className="flex items-center gap-1 font-sans text-luxury-gray">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-luxury-black font-medium mb-3">{post.title}</h3>
                  <p className="text-xs text-luxury-gray leading-relaxed mb-6">{post.excerpt}</p>
                </div>
                <button className="text-xs uppercase tracking-widest font-bold text-luxury-black hover:text-luxury-gold transition-colors inline-flex items-center gap-2 self-start">
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
