import React from "react";
import { Metadata } from "next";
import ProductsCatalogClient from "@/components/shopify/ProductsCatalogClient";
import StoreHeroBackground from "@/components/shopify/StoreHeroBackground";
import StoreHeroContent from "@/components/shopify/StoreHeroContent";
import { getProducts } from "@/lib/shopify/client";

export const metadata: Metadata = {
  title: "Shopify Store | OVO Signature Haute Couture & Fragrances",
  description:
    "Explore OVO Signature's Shopify-powered collection of luxury abayas, velvet kaftans, artisanal fragrances, footwear, and bespoke fashion advisory passes.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#0C040E] relative overflow-hidden">
      {/* Hero Banner with Animated Background & Staggered Content */}
      <section className="relative py-20 lg:py-28 border-b border-[rgba(214,182,90,0.15)] overflow-hidden">
        <StoreHeroBackground />
        <StoreHeroContent />
      </section>

      {/* Interactive Catalog Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 py-12">
        <ProductsCatalogClient initialProducts={products} />
      </section>
    </div>
  );
}
