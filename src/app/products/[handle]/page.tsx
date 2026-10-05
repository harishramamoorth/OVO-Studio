import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Sparkles, ShoppingBag } from "lucide-react";
import { getProductByHandle, getProducts } from "@/lib/shopify/client";
import ProductDetailActions from "@/components/shopify/ProductDetailActions";

interface PageProps {
  params: {
    handle: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return { title: "Product Not Found | OVO Signature" };

  return {
    title: `${product.title} | OVO Signature Shopify Store`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const mainImage = product.featuredImage?.url || product.images[0]?.url || "";

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#0C040E]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D6B65A] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Shopify Store</span>
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#150917] border border-[rgba(214,182,90,0.2)] shadow-2xl">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-[#C8BDB7]/50">
                  No Image
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden bg-[#150917] border border-[rgba(214,182,90,0.2)]"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || `${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest bg-[#D6B65A]/10 text-[#D6B65A] border border-[#D6B65A]/30 inline-block">
                {product.vendor || "OVO Signature Atelier"}
              </span>

              <h1 className="text-2xl lg:text-4xl font-extrabold uppercase tracking-wide text-[#F4EEE5]">
                {product.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-[#C8BDB7]/70 uppercase tracking-wider bg-[#1A0B1D] px-2.5 py-1 rounded-md border border-[rgba(244,238,229,0.1)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Add To Cart & Variant Selection */}
            <ProductDetailActions product={product} />

            {/* Luxury Service Highlights */}
            <div className="p-6 rounded-2xl bg-[#17091A] border border-[rgba(214,182,90,0.15)] space-y-4 text-xs text-[#C8BDB7]/90">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#D6B65A] shrink-0" />
                <span>Complimentary Express Delivery in Dubai & GCC</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#D6B65A] shrink-0" />
                <span>Handcrafted in Dubai Atelier with Authenticity Certificate</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D6B65A] shrink-0" />
                <span>Direct Shopify 256-bit SSL Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
