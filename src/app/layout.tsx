import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nakshatra Gems | Premium Luxury Diamonds & Fine Jewellery",
  description: "Experience the ultimate in diamond craftsmanship and custom fine jewellery. Nakshatra Gems offers exclusive GIA-certified conflict-free diamonds, engagement rings, and bespoke artisanal creations.",
  metadataBase: new URL("https://nakshatragems.example.com"),
  openGraph: {
    title: "Nakshatra Gems | Premium Luxury Diamonds & Fine Jewellery",
    description: "Exclusive GIA-certified conflict-free diamonds, engagement rings, and bespoke fine jewellery.",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-luxury-white text-luxury-black font-sans">
        {children}
      </body>
    </html>
  );
}
