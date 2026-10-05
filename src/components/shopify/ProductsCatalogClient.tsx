"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles, ShieldCheck, Truck, Crown, Scissors } from "lucide-react";
import { ShopifyProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

interface ProductsCatalogClientProps {
  initialProducts: ShopifyProduct[];
}

export default function ProductsCatalogClient({
  initialProducts,
}: ProductsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);

  // Extract unique categories & compute counts
  const categoriesWithCounts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("All", initialProducts.length);

    initialProducts.forEach((p) => {
      if (p.category) {
        map.set(p.category, (map.get(p.category) || 0) + 1);
      }
    });

    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [initialProducts]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          !q ||
          product.title.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.vendor?.toLowerCase().includes(q) ||
          product.tags?.some((t) => t.toLowerCase().includes(q));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
          );
        }
        if (sortBy === "price-desc") {
          return (
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
          );
        }
        if (sortBy === "name") {
          return a.title.localeCompare(b.title);
        }
        return 0; // featured default
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-12">
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Search & Filters Bar */}
      <div className="p-6 rounded-2xl bg-[#17091A] border border-[rgba(214,182,90,0.18)] space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#D6B65A]" />
            <input
              type="text"
              placeholder="Search abayas, perfumes, jewelry, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0E040F] border border-[rgba(214,182,90,0.25)] rounded-full pl-11 pr-10 py-3 text-xs text-[#F4EEE5] placeholder-[#C8BDB7]/50 focus:outline-none focus:border-[#D6B65A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#D6B65A] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#D6B65A]" />
            <span className="text-xs text-[#C8BDB7] uppercase font-mono">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0E040F] border border-[rgba(214,182,90,0.25)] rounded-full px-4 py-2.5 text-xs text-[#F4EEE5] font-mono focus:outline-none focus:border-[#D6B65A]"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills with Counters */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar border-t border-[rgba(244,238,229,0.08)] pt-4">
          {categoriesWithCounts.map(({ name, count }) => {
            const isSelected = selectedCategory === name;
            return (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] shadow-lg shadow-[#D6B65A]/20"
                    : "bg-[#0E040F] text-[#C8BDB7] border border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A]"
                }`}
              >
                <span>{name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isSelected
                      ? "bg-[#10070F] text-[#D6B65A]"
                      : "bg-[#1A0B1E] text-[#D6B65A]/80"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(214,182,90,0.12)]">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-[#F4EEE5]">
            {selectedCategory === "All" ? "All Luxury Products" : selectedCategory}
          </h2>
          <p className="text-xs text-[#C8BDB7]/70 font-mono">
            Displaying {filteredProducts.length} of {initialProducts.length} Items
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#D6B65A]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Shopify Storefront API Synchronized</span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#17091A] rounded-2xl border border-[rgba(214,182,90,0.15)] space-y-4">
          <p className="text-sm text-[#C8BDB7]">
            No products found matching &quot;{searchQuery}&quot; in {selectedCategory}.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6B65A] text-[#10070F]"
          >
            Reset Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Luxury Atelier Highlights */}
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-[rgba(214,182,90,0.15)]">
        <div className="p-6 rounded-2xl bg-[#160818] border border-[rgba(214,182,90,0.15)] space-y-2">
          <Crown className="w-6 h-6 text-[#D6B65A]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4EEE5]">
            Dubai Atelier Craftsmanship
          </h4>
          <p className="text-xs text-[#C8BDB7]/70 leading-relaxed font-light">
            Handcrafted with 24k gold leaf micro-embroidery & premium Italian fabrics.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#160818] border border-[rgba(214,182,90,0.15)] space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#D6B65A]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4EEE5]">
            256-Bit SSL Shopify Checkout
          </h4>
          <p className="text-xs text-[#C8BDB7]/70 leading-relaxed font-light">
            Direct encrypted checkout powered by Shopify Storefront API.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#160818] border border-[rgba(214,182,90,0.15)] space-y-2">
          <Truck className="w-6 h-6 text-[#D6B65A]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4EEE5]">
            GCC & Global Express Shipping
          </h4>
          <p className="text-xs text-[#C8BDB7]/70 leading-relaxed font-light">
            Insured priority courier dispatch across UAE, KSA, GCC & Worldwide.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#160818] border border-[rgba(214,182,90,0.15)] space-y-2">
          <Scissors className="w-6 h-6 text-[#D6B65A]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4EEE5]">
            Bespoke Custom Tailoring
          </h4>
          <p className="text-xs text-[#C8BDB7]/70 leading-relaxed font-light">
            Personalized fitting and measurement support for haute couture garments.
          </p>
        </div>
      </div>
    </div>
  );
}
