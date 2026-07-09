import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
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
  title: "Nakshtara Gems | Premium Luxury Diamonds & Fine Jewellery",
  description: "Experience the ultimate in diamond craftsmanship and custom fine jewellery. Nakshtara Gems offers exclusive GIA-certified conflict-free diamonds, engagement rings, and bespoke artisanal creations.",
  metadataBase: new URL("https://nakshtaragems.example.com"),
  openGraph: {
    title: "Nakshtara Gems | Premium Luxury Diamonds & Fine Jewellery",
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-luxury-white text-luxury-black font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
