import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/common/CustomCursor";
import PageLoader from "@/components/common/PageLoader";

export const metadata: Metadata = {
  title: "OVO Signature | 360° Luxury Fashion Agency — Dubai",
  description:
    "OVO Signature is Dubai's premier luxury fashion agency. We provide fashion business consulting, brand development, digital presence, marketing, production, and content creation.",
  keywords: [
    "OVO Signature",
    "Luxury Fashion Agency Dubai",
    "Fashion Business Consulting",
    "Fashion Tech Pack Dubai",
    "Dubai Fashion Design",
    "E-commerce Fashion Studio",
  ],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    title: "OVO Signature | 360° Luxury Fashion Agency — Dubai",
    description:
      "OVO Signature is Dubai's premier luxury fashion agency — strategy, design, digital, and content creation for ambitious fashion brands.",
    url: "https://ovosignature.com",
    siteName: "OVO Signature",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "OVO Signature Dubai",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-plum-950 text-beige-100 font-sans antialiased selection:bg-burgundy-700 selection:text-champagne-300 custom-cursor-active overflow-x-hidden">
        <PageLoader />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

