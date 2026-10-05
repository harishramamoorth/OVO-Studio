"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowUpRight, Check, Eye } from "lucide-react";
import { ShopifyProduct } from "@/types/shopify";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: ShopifyProduct;
  onQuickView?: (product: ShopifyProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const price = product.priceRange.minVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const mainImage = product.featuredImage?.url || product.images[0]?.url || "";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group relative bg-[#170B17]/90 rounded-2xl border border-[rgba(214,182,90,0.15)] overflow-hidden hover:border-[rgba(214,182,90,0.4)] hover:shadow-2xl hover:shadow-[#D6B65A]/10 transition-all duration-500 flex flex-col">
      {/* Image Wrapper */}
      <Link href={`/products/${product.handle}`} className="relative aspect-[3/4] w-full overflow-hidden bg-[#0D040E]">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-[#C8BDB7]/50">
            No Image Available
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#170B17] via-transparent to-black/30 opacity-75 group-hover:opacity-60 transition-opacity" />

        {/* Tags / Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.category && (
            <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-mono font-bold bg-[#10070F]/80 backdrop-blur-md text-[#D6B65A] border border-[rgba(214,182,90,0.3)]">
              {product.category}
            </span>
          )}
          {product.tags && product.tags[0] && (
            <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-mono text-[#F4EEE5] bg-black/60 backdrop-blur-md border border-[#F4EEE5]/20">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Quick View Button on Image Hover */}
        {onQuickView && (
          <div className="absolute inset-x-0 bottom-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
            <button
              onClick={handleQuickViewClick}
              className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#10070F]/90 backdrop-blur-md text-[#F4EEE5] border border-[rgba(214,182,90,0.4)] hover:bg-[#D6B65A] hover:text-[#10070F] transition-all flex items-center gap-1.5 shadow-lg"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>QUICK VIEW</span>
            </button>
          </div>
        )}

        {/* Hover Action Arrow */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#10070F]/80 backdrop-blur-md border border-[rgba(214,182,90,0.3)] flex items-center justify-center text-[#F4EEE5] group-hover:bg-[#D6B65A] group-hover:text-[#10070F] transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D6B65A]/80 block">
            {product.vendor || "OVO Signature"}
          </span>
          <Link
            href={`/products/${product.handle}`}
            className="text-sm font-bold text-[#F4EEE5] hover:text-[#D6B65A] transition-colors line-clamp-1"
          >
            {product.title}
          </Link>
          <p className="text-xs text-[#C8BDB7]/70 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Quick Add */}
        <div className="pt-3 border-t border-[rgba(244,238,229,0.08)] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#C8BDB7]/60 block uppercase tracking-wider">
              Price
            </span>
            <span className="text-sm font-mono font-bold text-[#D6B65A]">
              {currency} {parseFloat(price).toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] hover:shadow-lg hover:shadow-[#D6B65A]/20 active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
